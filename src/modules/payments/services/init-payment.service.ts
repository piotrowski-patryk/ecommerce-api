import { AppError } from '#/common/errors/index.js'
import config from '#/config/index.js'

import tpay from '../providers/tpay/index.js'
import { create, update } from '../repositories/payments.repository.js'

export type InitializePaymentInput = {
    orderId: string;
    orderPublicId: number;
    currency: string;
    amount: number;
    name: string;
    email: string;
};

export type InitializePaymentResult = {
    paymentUrl: string;
};

export async function initPayment({
  orderId,
  orderPublicId,
  currency,
  amount,
  name,
  email,
}: InitializePaymentInput): Promise<InitializePaymentResult> {
  if (!config.tpay.currencies.includes(currency)) {
    throw new AppError('UNPROCESSABLE_ENTITY')
  }

  const payment = await create({
    orderId,
    provider: tpay.name,
    currency,
    amount,
    status: 'PENDING',
  })

  const gatewayData = await tpay.create({
    amount,
    currency,
    orderPublicId,
    paymentId: payment.id,
    name,
    email,
  })

  const updatedPayment = await update(payment.id, {
    providerId: gatewayData.transactionId,
  })

  if (!updatedPayment) {
    throw new AppError('NOT_FOUND')
  }

  return { paymentUrl: gatewayData.transactionPaymentUrl }
}
