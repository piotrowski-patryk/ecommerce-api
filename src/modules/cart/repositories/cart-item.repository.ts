import database from '#/database/index.js'

interface UpsertItemInput {
  cartId: string
  variantId: string
  quantity: number
}

interface UpdateItemInput {
  id: string
  quantity: number
}

export async function findItemById(id: string, sessionId: string) {
  return database.cartItem.findFirst({
    where: {
      id,
      cart: {
        sessionId,
      },
    },
    select: {
      id: true,
      variantId: true,
      quantity: true,
    },
  })
}

export async function upsertItem({
  cartId,
  variantId,
  quantity,
}: UpsertItemInput) {
  return database.cartItem.upsert({
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
      cartId,
      variantId,
      quantity,
    },
    select: {
      id: true,
      variantId: true,
      quantity: true,
    },
  })
}

export async function updateItem({
  id,
  quantity,
}: UpdateItemInput) {
  return database.cartItem.update({
    where: {
      id,
    },
    data: {
      quantity,
    },
    select: {
      id: true,
      variantId: true,
      quantity: true,
    },
  })
}

export async function removeItemById(id: string) {
  return database.cartItem.delete({
    where: {
      id,
    },
  })
}
