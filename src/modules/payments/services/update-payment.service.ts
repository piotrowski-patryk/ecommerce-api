import { AppError } from '#/common/errors/index.js'
import event from '#/common/events/index.js'

import { findById, update } from '../repositories/payments.repository.js'

export type UpdatePaymentInput = {
    id: string;
    paid: number;
    cancelled: boolean;
};

export async function updatePayment({ id, paid, cancelled }: UpdatePaymentInput): Promise<void> {
    const payment = await findById(id)

    if (!payment) {
        throw new AppError('NOT_FOUND')
    }

    const amount = payment.amount.toNumber();

    const status = cancelled
      ? 'CANCELLED'
      : paid < amount
        ? 'PARTIAL'
        : paid === amount
          ? 'PAID'
          : 'OVERPAID'

    const updatedPayment = await update(id, {
        paid, status
    });

    if (!updatedPayment) {
        throw new AppError('NOT_FOUND')
    }

    event.emit('PAYMENT_UPDATED', { 
        orderId: payment.orderId,
        status,
        summary: {
            currency: payment.currency,
            amount: payment.amount,
            paid,
        },
    })
}
