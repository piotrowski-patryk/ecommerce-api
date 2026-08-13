import event from '#/common/events/index.js'

import { updateStatus } from '../services/update-status.service.js'

event.on('PAYMENT_UPDATED', async ({ payload }) => {
    const { orderId, status, summary } = payload as {
      orderId: string
      status: string
      summary: { paid: number }
    }

    await updateStatus({
        orderId,
        paid: summary.paid,
        status,
    })
})
