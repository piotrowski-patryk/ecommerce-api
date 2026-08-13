import database from '#/database/index.js'

import type {
  ProductInclude,
  ProductWhere,
} from '../types/product.types.js'

export async function findProduct(
  where: ProductWhere = {},
  include: ProductInclude = {},
) {
  const now = new Date()

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

          ...(include.prices && {
            prices: {
              where: {
                status: 'ACTIVE',
                startsAt: {
                  lte: now,
                },
                OR: [
                  {
                    endsAt: null,
                  },
                  {
                    endsAt: {
                      gte: now,
                    },
                  },
                ],
              },

              select: {
                priceNet: true,
                vatRate: true,
                currency: true,
                type: true,
                status: true,
                startsAt: true,
                endsAt: true,
              },
            },
          }),

          ...(include.images && {
            images: {
              select: {
                url: true,
                alt: true,
              },
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
  const now = new Date()

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

          ...(include.prices && {
            prices: {
              where: {
                status: 'ACTIVE',
                startsAt: {
                  lte: now,
                },
                OR: [
                  {
                    endsAt: null,
                  },
                  {
                    endsAt: {
                      gte: now,
                    },
                  },
                ],
              },

              select: {
                priceNet: true,
                vatRate: true,
                currency: true,
                type: true,
                status: true,
                startsAt: true,
                endsAt: true,
              },
            },
          }),

          ...(include.images && {
            images: {
              select: {
                url: true,
                alt: true,
              },
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
