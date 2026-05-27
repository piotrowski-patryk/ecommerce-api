import { AppError } from '../../../common/errors/index.js';
import repositories from '../repositories/index.js';
import event from '#/common/events/index.js';

type In = {
    orderId: string;
    paid: number;
    status: 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED';
}

export async function updateStatus({ orderId, paid, status }: In): Promise<void> {

    if (!orderId || paid === undefined || !status) {
        throw new AppError('INVALID_LOGIC_PARAMETERS');
    }

    try {
        await repositories.orders.update(orderId, {
            totalPaid: paid,
            status
        });

        event.emit('ORDER_UPDATED', {
            orderId,
            status
        });
        
    } catch (error) {
        throw error;
    }
}