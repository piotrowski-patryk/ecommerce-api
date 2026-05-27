import event from '#/common/events/index.js';
import { updateStatus } from '../services/update-status.service.js';

event.on('PAYMENT_UPDATED', (data: any) => {
    const { orderId, status, summary } = data.payload;

    updateStatus({
        orderId,
        paid: summary.paid,
        status
    });
});