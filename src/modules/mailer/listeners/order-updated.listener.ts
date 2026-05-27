import event from '#/common/events/index.js';
import { send } from '../services/send-email.service.js';
import orders from '#/modules/orders/index.js';

event.on('ORDER_UPDATED', async (data: any) => {
    const { orderId, status } = data.payload;

    if (status === 'PAID') {
        const order = await orders.get(orderId);

        send('patryk.piotrows@gmail.com', {
            code: 'ORDER_CONFIRM',
            data: {
                number: order.publicId,
                currency: order.currency,
                amount: order.totalGross,
                items: order.items
            }
        })
    }
});