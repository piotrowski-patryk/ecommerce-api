import { AppError } from '#/common/errors/index.js'
import { Prisma } from '#/database/generated/client.js'
import { getProducts } from '#/modules/products/index.js'
import { initPayment } from '#/modules/payments/index.js'

import { create as createOrderRecord } from '../repositories/orders.repository.js'

type OrderClientInput = {
  name: string
  email: string
}

type OrderItemInput = {
  // Kept for API compatibility; the value identifies a product variant.
  productId: string
  quantity: number
}

type CreateOrderInput = {
  client: OrderClientInput
  items: OrderItemInput[]
}

export async function createOrder({ client, items }: CreateOrderInput) {
  const variantIds = items.map(item => item.productId)
  const products = await getProducts({
    where: { variantIds },
  })

  const variants = new Map(
    products.flatMap(product => product.variants).map(variant => [variant.id, variant]),
  )

  let totalNet = new Prisma.Decimal(0)
  let totalGross = new Prisma.Decimal(0)
  let currency: string | undefined
  const orderItems = items.map(item => {
    const variant = variants.get(item.productId)

    if (!variant || variant.status !== 'AVAILABLE') {
      throw new AppError('NOT_FOUND')
    }

    if (item.quantity > variant.stock) {
      throw new AppError('CONFLICT')
    }

    const { price } = variant

    if (currency && currency !== price.currency) {
      throw new AppError('UNPROCESSABLE_ENTITY')
    }

    currency = price.currency
    const priceNet = price.net
    const priceGross = price.amount
    const vatRate = price.vatRate.mul(100).toDecimalPlaces(0).toNumber()

    totalNet = totalNet.add(priceNet.mul(item.quantity))
    totalGross = totalGross.add(priceGross.mul(item.quantity))

    return {
      productVariantId: variant.id,
      name: variant.name,
      quantity: item.quantity,
      currency: price.currency,
      priceNet,
      priceGross,
      vatRate,
    }
  })

  const order = await createOrderRecord({
    client,
    items: orderItems,
    currency: currency ?? 'PLN',
    totalNet,
    totalGross,
    totalTax: totalGross.sub(totalNet),
  })

  return initPayment({
    orderId: order.id,
    orderPublicId: order.publicId,
    currency: order.currency,
    amount: Number(order.totalGross),
    name: client.name,
    email: client.email,
  })
}
