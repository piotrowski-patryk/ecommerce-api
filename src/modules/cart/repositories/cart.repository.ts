import database from '#/database/index.js'

export async function createCartWithItem({
  sessionId,
  variantId,
  quantity,
  expiresAt,
}: {
  sessionId: string
  variantId: string
  quantity: number
  expiresAt: Date
}) {
  return database.cart.create({
    data: {
      sessionId,
      status: 'ACTIVE',
      expiresAt,

      items: {
        create: {
          variantId,
          quantity,
        },
      },
    },
  })
}

export async function findCartBySessionId(
  sessionId: string,
  now = new Date(),
) {
  return database.cart.findFirst({
    where: {
      sessionId,
      expiresAt: {
        gt: now,
      },
    },

    select: {
      id: true,
      status: true,
      expiresAt: true,

      items: {
        select: {
          id: true,
          variantId: true,
          quantity: true,
        },
      },
    },
  })
}
