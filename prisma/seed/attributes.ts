import database from '#/database/index.js'

export async function seedAttributes() {

  const attrBrand = await database.attribute.create({
    data: { slug: 'marka', name: 'Marka' }
  });
  const attrCountry = await database.attribute.create({
    data: { slug: 'kraj-pochodzenia', name: 'Kraj pochodzenia' }
  });
  const attrCapacity = await database.attribute.create({
    data: { slug: 'pojemnosc', name: 'Pojemność' }
  });

  await database.attributeValue.createMany({
    data: [
      { attributeId: attrBrand.id, slug: 'swimer', value: 'Swimer' },
      { attributeId: attrCountry.id, slug: 'polska', value: 'Polska' },
      { attributeId: attrCapacity.id, slug: 'pojemnosc-2500', value: '2500L' },
      { attributeId: attrCapacity.id, slug: 'pojemnosc-5000', value: '5000L' }
    ]
  });

  return await database.attributeValue.findMany({
    include: { attribute: true }
  });
}
