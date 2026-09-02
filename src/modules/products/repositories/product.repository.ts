import database from '#/database/index.js'
import type { Prisma } from '#/database/generated/client.js'

import type {
  ProductInclude,
  ProductWhere,
} from '../types/product.types.js'

const priceSelect = {
  id: true,
  productVariantId: true,
  currency: true,
  priceNet: true,
  vatRate: true,
  type: true,
  status: true,
  startsAt: true,
  endsAt: true,
} as const

const prices = {
  where: {
    currency: 'PLN',
    type: { in: ['REGULAR', 'PROMOTION'] },
    status: { in: ['ACTIVE', 'ARCHIVED'] },
  },
  select: priceSelect,
  orderBy: { startsAt: 'asc' },
} satisfies Prisma.ProductVariant$pricesArgs

export async function findProduct(
  where: ProductWhere = {},
  include: ProductInclude = {},
) {
  const variantWhere =
    where.variantId
      ? { id: where.variantId }
      : where.variantSlug
        ? { slug: where.variantSlug }
        : undefined

  return database.product.findFirst({
    where: {
      status: 'PUBLISHED',
      ...(where.id && {
        id: where.id,
      }),

      ...(where.variantId && {
        variants: {
          some: {
            id: where.variantId,
          },
        },
      }),

      ...(where.variantSlug && {
        variants: {
          some: {
            slug: where.variantSlug,
          },
        },
      }),
    },

    select: {
      id: true,
      publicId: true,
      name: true,
      status: true,

      variants: {
        ...(variantWhere && {
          where: variantWhere,
        }),

        select: {
          id: true,
          publicId: true,
          sku: true,
          slug: true,
          name: true,
          stock: true,
          status: true,

          prices,

          ...(include.media && {
            media: {
              select: {
                url: true,
                alt: true,
              },
              orderBy: [
                { position: 'asc' },
                { id: 'asc' },
              ],
              ...(typeof include.media === 'object'
                && include.media.limit !== undefined
                && { take: include.media.limit }),
            },
          }),

          ...(include.attributes && {
            attributes: {
              select: {
                attributeValue: {
                  select: {
                    value: true,
                    attribute: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          }),
        },
      },
    },
  })
}

export async function findProducts(
  where: ProductWhere = {},
  include: ProductInclude = {},
) {
  const variantWhere =
    where.variantIds
      ? {
          id: {
            in: where.variantIds,
          },
        }
      : where.variantId
        ? {
            id: where.variantId,
          }
        : where.variantSlug
          ? {
              slug: where.variantSlug,
            }
          : undefined

  return database.product.findMany({
    where: {
      status: 'PUBLISHED',
      ...(where.id && {
        id: where.id,
      }),

      ...(where.ids && {
        id: {
          in: where.ids,
        },
      }),

      ...(where.variantIds && {
        variants: {
          some: {
            id: {
              in: where.variantIds,
            },
          },
        },
      }),

      ...(where.variantId && {
        variants: {
          some: {
            id: where.variantId,
          },
        },
      }),

      ...(where.variantSlug && {
        variants: {
          some: {
            slug: where.variantSlug,
          },
        },
      }),
    },

    select: {
      id: true,
      publicId: true,
      name: true,
      status: true,

      variants: {
        ...(variantWhere && {
          where: variantWhere,
        }),

        select: {
          id: true,
          publicId: true,
          sku: true,
          slug: true,
          name: true,
          stock: true,
          status: true,

          prices,

          ...(include.media && {
            media: {
              select: {
                url: true,
                alt: true,
              },
              orderBy: [
                { position: 'asc' },
                { id: 'asc' },
              ],
              ...(typeof include.media === 'object'
                && include.media.limit !== undefined
                && { take: include.media.limit }),
            },
          }),

          ...(include.attributes && {
            attributes: {
              select: {
                attributeValue: {
                  select: {
                    value: true,
                    attribute: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          }),
        },
      },
    },
  })
}
