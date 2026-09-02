ALTER TABLE "product_images" RENAME TO "product_media";

ALTER TABLE "product_media"
  RENAME CONSTRAINT "product_images_pkey" TO "product_media_pkey";

ALTER TABLE "product_media"
  RENAME CONSTRAINT "product_images_product_id_fkey" TO "product_media_product_id_fkey";

ALTER TABLE "product_media"
  RENAME CONSTRAINT "product_images_product_variant_id_fkey" TO "product_media_product_variant_id_fkey";
