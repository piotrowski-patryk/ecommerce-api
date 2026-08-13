import { render } from '@react-email/render'

import { AppError } from '#/common/errors/index.js'
import config from '#/config/index.js'

import { transporter } from '../providers/nodemailer.provider.js'
import OrderConfirm from '../templates/views/order-confirm.view.js'

export interface OrderConfirmationEmail {
  number: number
  currency: string
  amount: number
  items: Array<{ id: string; name: string; quantity: number; priceGross: number }>
}

export async function sendOrderConfirmation(
  to: string,
  data: OrderConfirmationEmail,
) {
  if (!to) {
    throw new AppError('BAD_REQUEST')
  }

  const html = await render(OrderConfirm(data))

  await transporter.sendMail({
    from: config.smtp.fromEmail,
    to,
    subject: 'Potwierdzenie zamówienia',
    html,
  })
}
