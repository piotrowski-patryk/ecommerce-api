import database from '#/database/index.js'

interface UpsertItemInput {
  cartId: string
  variantId: string
  quantity: number
  expiresAt: Date
  activeAfter: Date
}

interface UpdateItemInput {
  id: string
  cartId: string
  quantity: number
  expiresAt: Date
  activeAfter: Date
}

export async function findItemById(
  id: string,
  sessionId: string,
  now = new Date(),
) {
  return database.cartItem.findFirst({
    where: {
      id,
      cart: {
        sessionId,
        expiresAt: {
          gt: now,
        },
      },
    },
    select: {
      id: true,
      cartId: true,
      variantId: true,
      quantity: true,
    },
  })
}

export async function upsertItem({
  cartId,
  variantId,
  quantity,
  expiresAt,
  activeAfter,
}: UpsertItemInput) {
  return database.cart.update({
    where: {
      id: cartId,
      expiresAt: {
        gt: activeAfter,
      },
    },
    data: {
      expiresAt,
      items: {
        upsert: {
          where: {
            cartId_variantId: {
              cartId,
              variantId,
            },
          },
          update: {
            quantity,
          },
          create: {
            variantId,
            quantity,
          },
        },
      },
    },
    select: {
      id: true,
      expiresAt: true,
    },
  })
}

export async function updateItem({
  id,
  cartId,
  quantity,
  expiresAt,
  activeAfter,
}: UpdateItemInput) {
  return database.cart.update({
    where: {
      id: cartId,
      expiresAt: {
        gt: activeAfter,
      },
    },
    data: {
      expiresAt,
      items: {
        update: {
          where: {
            id,
          },
          data: {
            quantity,
          },
        },
      },
    },
    select: {
      id: true,
      expiresAt: true,
    },
  })
}

export async function removeItemById({
  id,
  cartId,
  expiresAt,
  activeAfter,
}: {
  id: string
  cartId: string
  expiresAt: Date
  activeAfter: Date
}) {
  return database.cart.update({
    where: {
      id: cartId,
      expiresAt: {
        gt: activeAfter,
      },
    },
    data: {
      expiresAt,
      items: {
        delete: {
          id,
        },
      },
    },
    select: {
      id: true,
      expiresAt: true,
    },
  })
}
