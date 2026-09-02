UPDATE "carts"
SET "expires_at" = "updated_at" + INTERVAL '30 days'
WHERE "expires_at" IS NULL;

DELETE FROM "carts"
WHERE "expires_at" <= CURRENT_TIMESTAMP;

ALTER TABLE "carts"
  ALTER COLUMN "expires_at" SET DEFAULT (CURRENT_TIMESTAMP + INTERVAL '30 days'),
  ALTER COLUMN "expires_at" SET NOT NULL;

CREATE INDEX "carts_expires_at_idx" ON "carts"("expires_at");

CREATE OR REPLACE FUNCTION public.delete_expired_carts()
RETURNS BIGINT
LANGUAGE plpgsql
AS $$
DECLARE
  deleted_count BIGINT;
BEGIN
  DELETE FROM public.carts
  WHERE expires_at <= CURRENT_TIMESTAMP;

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.schedule_cart_cleanup()
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  job_exists BOOLEAN;
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_available_extensions
    WHERE name = 'pg_cron'
  ) THEN
    RAISE EXCEPTION 'pg_cron is not available on this PostgreSQL server';
  END IF;

  IF POSITION('pg_cron' IN current_setting('shared_preload_libraries')) = 0 THEN
    RAISE EXCEPTION 'pg_cron must be added to shared_preload_libraries';
  END IF;

  EXECUTE 'CREATE EXTENSION IF NOT EXISTS pg_cron';
  EXECUTE 'SELECT EXISTS (
    SELECT 1 FROM cron.job WHERE jobname = $1
  )'
  INTO job_exists
  USING 'delete-expired-carts';

  IF NOT job_exists THEN
    EXECUTE 'SELECT cron.schedule($1, $2, $3)'
    USING
      'delete-expired-carts',
      '0 * * * *',
      'SELECT public.delete_expired_carts()';
  END IF;
END;
$$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_available_extensions
    WHERE name = 'pg_cron'
  ) AND POSITION('pg_cron' IN current_setting('shared_preload_libraries')) > 0 THEN
    PERFORM public.schedule_cart_cleanup();
  ELSE
    RAISE NOTICE 'Cart cleanup function created, but pg_cron is unavailable or not preloaded';
  END IF;
END;
$$;
