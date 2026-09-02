import { AppError } from '#/common/errors/index.js'
import { getProducts, toProductDto } from '#/modules/products/index.js'

import { toCartProductDto } from '../mappers/cart-product.mapper.js'
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
      expiresAt: cart.expiresAt,
      items: [],
    }
  }

  // Products
  const products = await getProducts({
    where: {
      variantIds: cart.items.map(item => item.variantId),
    },
    include: {
      media: {
        limit: 1,
      },
    },
  })

  // Items
  const items = cart.items.map(item => {
    const product = products.find(product =>
      product.variants.some(variant => variant.id === item.variantId),
    )

    return {
      id: item.id,
      quantity: item.quantity,
      product: product
        ? toCartProductDto(toProductDto(product), item.variantId)
        : undefined,
    }
  })

  // Response
  return {
    id: cart.id,
    status: cart.status,
    expiresAt: cart.expiresAt,
    items,
  }
}
