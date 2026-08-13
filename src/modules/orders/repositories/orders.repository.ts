import database from '#/database/index.js'

type CreateOrderInput = {
  client: { name: string; email: string }
  items: Array<{
    productVariantId: string
    name: string
    quantity: number
    currency: string
    priceNet: number
    priceGross: number
    vatRate: number
  }>
  currency: string
  totalNet: number
  totalGross: number
  totalTax: number
}

export async function findById(orderId: string) {
    return database.order.findUnique({
        where: { 
            id: orderId 
        },
        include: {
            clients: true,
            items: true
        }
    });
}

export async function create({ client, items, ...order }: CreateOrderInput) {
    return database.order.create({
        data: {
            ...order,
            clients: {
                create: client,
            },
            items: {
                create: items,
            },
        },
        include: {
            clients: true,
            items: true
        }
    });
}

export async function update(orderId: string, data: { totalPaid: number; status: string }) {
    return database.order.update({
        where: { id: orderId },
        data
    });
}
