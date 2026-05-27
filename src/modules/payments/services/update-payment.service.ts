import { AppError } from '#/common/errors/index.js';
import repositories from '../repositories/index.js';
import event from '#/common/events/index.js';

export type In = {
    id: string;
    paid: number;
    cancelled: boolean;
};

export async function updatePayment({id, paid, cancelled}: In): Promise<void> {

    // Pobieranie rekordu z bazy danych
    const payment = await repositories.payments.findById(id);

    if (!payment) {
        throw new AppError('NOT_FOUND');
    }

    const amount = payment.amount.toNumber();

    // Ustawienie statusu
    let status = 'FAILED';

    if (!cancelled) {
        if (paid < amount) status = 'PARTIAL';
        if (paid === amount) status = 'PAID';
        if (paid > amount) status = 'OVERPAID';

    } else {
        status = 'CANCELLED';
    }

    // Aktualizacja rekordu w bazie danych
    const updatePayment = await repositories.payments.update(id, {
        paid, status
    });

    if (!updatePayment) {
        throw new AppError('NOT_FOUND');
    }

    // Informowanie 'orders' o aktualizacji statusu płatności
    event.emit('PAYMENT_UPDATED', { 
        orderId: payment.orderId,
        status,
        summary: {
            currency: payment.currency,
            amount: payment.amount,
            paid: paid
        }
    });
}