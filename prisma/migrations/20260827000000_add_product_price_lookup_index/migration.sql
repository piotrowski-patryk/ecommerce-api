CREATE INDEX "product_prices_lookup_idx"
ON "product_prices"("product_variant_id", "currency", "type", "status", "startsAt", "endsAt");
