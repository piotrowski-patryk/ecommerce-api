import { AppError } from '#/common/errors/index.js'
import event from '#/common/events/index.js'

import { update } from '../repositories/orders.repository.js'

type UpdateOrderStatusInput = {
    orderId: string;
    paid: number;
    status: string
}

export async function updateStatus({ orderId, paid, status }: UpdateOrderStatusInput): Promise<void> {

    if (!orderId || paid === undefined || !status) {
        throw new AppError('UNPROCESSABLE_ENTITY')
    }

    try {
        await update(orderId, {
            totalPaid: paid,
            status
        })

        event.emit('ORDER_UPDATED', {
            orderId,
            status
        })
    } catch (error: unknown) {
        if (isPrismaNotFoundError(error)) {
            throw new AppError('NOT_FOUND')
        }

        throw error
    }
}

function isPrismaNotFoundError(error: unknown): error is { code: string } {
  return typeof error === 'object'
    && error !== null
    && 'code' in error
    && error.code === 'P2025'
}
