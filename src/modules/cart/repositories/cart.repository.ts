import database from '#/database/index.js'

export async function createCartWithItem({
  sessionId,
  variantId,
  quantity,
}: {
  sessionId: string
  variantId: string
  quantity: number
}) {
  return database.cart.create({
    data: {
      sessionId,
      status: 'ACTIVE',

      items: {
        create: {
          variantId,
          quantity,
        },
      },
    },
  })
}

export async function findCartBySessionId(sessionId: string) {
  return database.cart.findUnique({
    where: {
      sessionId,
    },

    select: {
      id: true,
      status: true,

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