import config from '#/config/index.js'
import { AppError } from '#/common/errors/index.js'

export type In = {
    amount: number;
    currency: string;
    orderPublicId: number;
    paymentId: string;
    name: string;
    email: string;
};

export type Out = {
    result: string;
    transactionId: string;
    transactionPaymentUrl: string;
};

export async function createTransaction({ amount, currency, orderPublicId, paymentId, name, email }: In): Promise<Out> {
    if (!config.tpay.clientId || !config.tpay.secret) {
        throw new AppError('INTERNAL_SERVER_ERROR')
    }

    try {
        const auth = Buffer.from(`${config.tpay.clientId}:${config.tpay.secret}`).toString('base64')
        const response = await fetch(`${config.tpay.tpayUrl}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
             },
            body: JSON.stringify({
                amount: amount,
                currency,
                description: `zamówienie nr: ${orderPublicId}`,
                hiddenDescription: paymentId,
                payer: {
                    email: email,
                    name: name
                },
                callbacks: {
                    payerUrls: {
                        success: config.web.paths.payments.success,
                        error: config.web.paths.payments.error
                    },
                    notification: {
                        url: `${config.app.url}/api/payments/webhook-tpay`
                    }
                }
            })
        });

        const responseData: unknown = await response.json()

        if (!response.ok) {
            throw new AppError('BAD_GATEWAY', responseData)
        }

        return responseData as Out

    } catch (error: unknown) {
        if (error instanceof AppError) {
            throw error
        }

        throw new AppError('BAD_GATEWAY')
    }
}
