import database from '#/database/index.js'

type SeededAttributeValue = {
  id: string
  slug: string
}

export async function seedProducts(attributeValues: SeededAttributeValue[]) {
  const getVal = (slug: string) => attributeValues.find(v => v.slug === slug);

  await database.product.create({
    data: {
      name: 'Zbiornik na wodę Swimer',
      status: 'PUBLISHED',
      attributes: {
        create: [
          { attributeValueId: getVal('swimer')!.id },
          { attributeValueId: getVal('polska')!.id }
        ]
      },
      variants: {
        create: [
          // Wariant 1: 2500L
          {
            sku: 'SW-2500-A01',
            slug: 'zbiornik-na-wode-swimer-2500l',
            name: '2500L',
            stock: 5,
            status: 'AVAILABLE',
            attributes: {
              create: [{ attributeValueId: getVal('pojemnosc-2500')!.id }]
            },
            prices: { 
              create: { currency: 'PLN', priceNet: 3500.00, vatRate: 0.23, type: 'REGULAR', status: 'ACTIVE' } 
            },
            images: {
              create: [
                { url: 'https://swimer.pl/upload/art/x3353_img1_woda_20000_black_bis_2.jpg.pagespeed.ic.CAwzay3It-.jpg', alt: 'Czarny zbiornik 2500L - przód', position: 0 },
                { url: 'https://i.imgur.com/bkggTBF.png', alt: 'Czarny zbiornik 2500L - góra', position: 1 },
                { url: 'https://i.imgur.com/8koTZNB.png', alt: 'Czarny zbiornik 2500L - zawór', position: 2 }
              ]
            }
          },
          // Wariant 2: 5000L
          {
            sku: 'SW-5000-B02',
            slug: 'zbiornik-na-wode-swimer-5000l',
            name: '5000L',
            stock: 8,
            status: 'AVAILABLE',
            attributes: {
              create: [{ attributeValueId: getVal('pojemnosc-5000')!.id }]
            },
            prices: { 
              create: [
                { currency: 'PLN', priceNet: 5200.00, vatRate: 0.23, type: 'REGULAR', status: 'ACTIVE' },
                { currency: 'PLN', priceNet: 4800.00, vatRate: 0.23, type: 'PROMOTION', status: 'ACTIVE' }
              ]
            },
            images: {
              create: [
                { url: 'https://swimer.pl/upload/art/x3353_img1_woda_20000_black_bis_2.jpg.pagespeed.ic.CAwzay3It-.jpg', alt: 'Czarny zbiornik 5000L - przód', position: 0 }
              ]
            }
          }
        ]
      }
    }
  });
}
