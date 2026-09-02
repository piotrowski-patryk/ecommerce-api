import { AppError } from '#/common/errors/index.js'

import { findItemById, removeItemById } from '../repositories/cart-item.repository.js'
import { getCartExpiration } from '../utils/cart-expiration.js'

interface RemoveCartItemInput {
  id: string
  sessionId: string
}

export async function removeCartItem({ id, sessionId }: RemoveCartItemInput) {
  const now = new Date()
  const item = await findItemById(id, sessionId, now)

  if (!item) {
    throw new AppError('NOT_FOUND')
  }

  await removeItemById({
    id,
    cartId: item.cartId,
    expiresAt: getCartExpiration(now),
    activeAfter: now,
  })
}
