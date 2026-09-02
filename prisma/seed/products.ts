import database from '#/database/index.js'

type SeededAttributeValue = {
  id: string
  slug: string
}

export async function seedProducts(attributeValues: SeededAttributeValue[]) {
  const attributeValueIds = new Map(
    attributeValues.map(value => [value.slug, value.id]),
  )
  const getAttributeValueId = (slug: string) => {
    const id = attributeValueIds.get(slug)

    if (!id) {
      throw new Error(`Missing seeded attribute value: ${slug}`)
    }

    return id
  }
  const now = new Date()
  const regularStartsAt = new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000)
  const promoEndsAt = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)

  await database.product.create({
    data: {
      name: 'Zbiornik na wodę Swimer',
      status: 'PUBLISHED',
      attributes: {
        create: [
          { attributeValueId: getAttributeValueId('swimer') },
          { attributeValueId: getAttributeValueId('polska') },
        ],
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
              create: [{
                attributeValueId: getAttributeValueId('pojemnosc-2500'),
              }],
            },
            prices: {
              create: {
                currency: 'PLN',
                priceNet: 3500,
                vatRate: 0.23,
                type: 'REGULAR',
                status: 'ACTIVE',
                startsAt: regularStartsAt,
              },
            },
            media: {
              create: [
                { url: 'https://swimer.pl/upload/art/x3353_img1_woda_20000_black_bis_2.jpg.pagespeed.ic.CAwzay3It-.jpg', alt: 'Czarny zbiornik 2500L - przód', position: 0 },
                { url: 'https://i.imgur.com/bkggTBF.png', alt: 'Czarny zbiornik 2500L - góra', position: 1 },
                { url: 'https://i.imgur.com/8koTZNB.png', alt: 'Czarny zbiornik 2500L - zawór', position: 2 },
              ],
            },
          },
          // Wariant 2: 5000L
          {
            sku: 'SW-5000-B02',
            slug: 'zbiornik-na-wode-swimer-5000l',
            name: '5000L',
            stock: 8,
            status: 'AVAILABLE',
            attributes: {
              create: [{
                attributeValueId: getAttributeValueId('pojemnosc-5000'),
              }],
            },
            prices: {
              create: [
                {
                  currency: 'PLN',
                  priceNet: 5200,
                  vatRate: 0.23,
                  type: 'REGULAR',
                  status: 'ACTIVE',
                  startsAt: regularStartsAt,
                },
                {
                  currency: 'PLN',
                  priceNet: 4800,
                  vatRate: 0.23,
                  type: 'PROMOTION',
                  status: 'ACTIVE',
                  startsAt: now,
                  endsAt: promoEndsAt,
                },
              ],
            },
            media: {
              create: [
                { url: 'https://swimer.pl/upload/art/x3353_img1_woda_20000_black_bis_2.jpg.pagespeed.ic.CAwzay3It-.jpg', alt: 'Czarny zbiornik 5000L - przód', position: 0 },
              ],
            },
          },
        ],
      },
    },
  })
}
