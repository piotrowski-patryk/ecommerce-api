import event from '#/common/events/index.js'
import { getOrder } from '#/modules/orders/index.js'

import { sendOrderConfirmation } from '../services/send-email.service.js'

event.on('ORDER_UPDATED', async ({ payload }) => {
    const { orderId, status } = payload as { orderId: string; status: string }

    if (status === 'PAID') {
        const order = await getOrder(orderId)
        const recipient = order.clients[0]?.email

        if (!recipient) {
            return
        }

        await sendOrderConfirmation(recipient, {
            number: order.publicId,
            currency: order.currency,
            amount: Number(order.totalGross),
            items: order.items.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              priceGross: Number(item.priceGross),
            })),
        })
    }
})
