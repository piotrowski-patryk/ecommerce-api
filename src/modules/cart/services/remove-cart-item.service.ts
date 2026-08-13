import { AppError } from '#/common/errors/index.js'

import { findItemById, removeItemById } from '../repositories/cart-item.repository.js'

interface RemoveCartItemInput {
  id: string
  sessionId: string
}

export async function removeCartItem({ id, sessionId }: RemoveCartItemInput) {
  const item = await findItemById(id, sessionId)

  if (!item) {
    throw new AppError('NOT_FOUND')
  }

  await removeItemById(id)
}
