import database from '#/database/index.js'
import { seedAttributes } from './attributes.js'
import { seedProducts } from './products.js'

async function main() {
  console.log('🔄 Czyszczenie bazy...');
  await database.productAttribute.deleteMany();
  await database.productVariant.deleteMany();
  await database.product.deleteMany();
  await database.attributeValue.deleteMany();
  await database.attribute.deleteMany();

  console.log('📚 Seedowanie słowników...');
  const attributeValues = await seedAttributes();

  console.log('📦 Seedowanie produktów...');
  await seedProducts(attributeValues);

  console.log('✅ Seedowanie zakończone sukcesem!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await database.$disconnect();
  });
