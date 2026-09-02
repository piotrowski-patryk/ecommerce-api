import { randomUUID } from 'node:crypto'

import { AppError } from '#/common/errors/index.js'
import { getProduct } from '#/modules/products/index.js'

import { createCartWithItem, findCartBySessionId } from '../repositories/cart.repository.js'
import { upsertItem } from '../repositories/cart-item.repository.js'
import { getCartExpiration } from '../utils/cart-expiration.js'

interface AddCartItemInput {
  sessionId?: string
  variantId: string
  quantity: number
}

export async function addCartItem({
  sessionId,
  variantId,
  quantity,
}: AddCartItemInput) {
  const now = new Date()
  const expiresAt = getCartExpiration(now)

  const product = await getProduct({
    where: {
      variantId,
    },
  })

  if (!product) {
    throw new AppError('NOT_FOUND')
  }

  const variant = product.variants[0]

  if (!variant || variant.status !== 'AVAILABLE') {
    throw new AppError('NOT_FOUND')
  }

  if (quantity > variant.stock) {
    throw new AppError('CONFLICT')
  }

  let cart = null

  if (sessionId) {
    cart = await findCartBySessionId(sessionId, now)
  }

  if (!sessionId || !cart) {
    const newSessionId = randomUUID()

    await createCartWithItem({
      sessionId: newSessionId,
      variantId,
      quantity,
      expiresAt,
    })

    return { sessionId: newSessionId }
  }

  const existingItem = cart.items.find((item) => item.variantId === variantId)
  const finalQuantity = (existingItem?.quantity ?? 0) + quantity

  if (finalQuantity > variant.stock) {
    throw new AppError('CONFLICT')
  }

  await upsertItem({
    cartId: cart.id,
    variantId,
    quantity: finalQuantity,
    expiresAt,
    activeAfter: now,
  })

  return { sessionId }
}
