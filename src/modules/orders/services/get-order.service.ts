import { AppError } from '#/common/errors/index.js'

import { findById } from '../repositories/orders.repository.js'

export async function getOrder(orderId: string) {
    const order = await findById(orderId)

    if (!order) {
        throw new AppError('NOT_FOUND')
    }

    return order
}
