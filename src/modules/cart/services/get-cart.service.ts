import { AppError } from '#/common/errors/index.js'
import { getProducts } from '#/modules/products/index.js'

import { findCartBySessionId } from '../repositories/cart.repository.js'

interface GetCartInput {
  sessionId: string
}

export async function getCart({ sessionId }: GetCartInput) {
  // Cart
  const cart = await findCartBySessionId(sessionId)

  if (!cart) {
    throw new AppError('NOT_FOUND')
  }

  // Empty cart
  if (cart.items.length === 0) {
    return {
      id: cart.id,
      status: cart.status,
      items: [],
    }
  }

  // Products
  const products = await getProducts({
    where: {
      variantIds: cart.items.map(item => item.variantId),
    },
    include: {
      prices: true,
      images: true,
    },
  })

  // Items
  const items = cart.items.map(item => ({
    id: item.id,
    quantity: item.quantity,
    product: products.find(product =>
      product.variants.find(
        variant => variant.id === item.variantId,
      ),
    ),
  }))

  // Response
  return {
    id: cart.id,
    status: cart.status,
    items,
  }
}
