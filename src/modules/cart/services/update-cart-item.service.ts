import { AppError } from '#/common/errors/index.js'
import { getProduct } from '#/modules/products/index.js'

import { findItemById, updateItem } from '../repositories/cart-item.repository.js'

interface UpdateCartItemInput {
  id: string
  quantity: number
  sessionId: string
}

export async function updateCartItem({
  id,
  quantity,
  sessionId,
}: UpdateCartItemInput) {
  const item = await findItemById(id, sessionId)

  if (!item) {
    throw new AppError('NOT_FOUND')
  }

  const product = await getProduct({
    where: {
      variantId: item.variantId,
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

  await updateItem({
    id: item.id,
    quantity,
  })

  return {
    itemId: item.id,
    quantity,
  }
}
