import type { Prisma } from '#/database/generated/client.js'
import database from '#/database/index.js'

export async function create(data: Prisma.PaymentUncheckedCreateInput) {
    return database.payment.create({
        data
    });
}

export async function findById(id: string) {
    return database.payment.findUnique({
        where: { id }
    });
}

export async function update(paymentId: string, data: Prisma.PaymentUpdateInput) {
    try {
        return await database.payment.update({
            where: { id: paymentId },
            data
        });

    } catch (error: unknown) {
        if (isPrismaNotFoundError(error)) return null

        throw error
    }
}

function isPrismaNotFoundError(error: unknown): error is { code: string } {
  return typeof error === 'object'
    && error !== null
    && 'code' in error
    && error.code === 'P2025'
}
