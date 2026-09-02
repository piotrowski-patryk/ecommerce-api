import database from '#/database/index.js'
import type { Prisma } from '#/database/generated/client.js'

type CreateOrderInput = {
  client: { name: string; email: string }
  items: Array<{
    productVariantId: string
    name: string
    quantity: number
    currency: string
    priceNet: Prisma.Decimal
    priceGross: Prisma.Decimal
    vatRate: number
  }>
  currency: string
  totalNet: Prisma.Decimal
  totalGross: Prisma.Decimal
  totalTax: Prisma.Decimal
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
