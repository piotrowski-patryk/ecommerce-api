import repositories from '../repositories/index.js';
import tpay from '../providers/tpay/index.js';
import config from '#/config/index.js';
import { AppError } from '#/common/errors/index.js';

export type In = {
    orderId: string;
    orderPublicId: number;
    currency: string;
    amount: number;
    name: string;
    email: string;
};

export type Out = {
    paymentUrl: string;
};

export async function initPayment({ orderId, orderPublicId, currency, amount, name, email }: In): Promise<Out> {    

    let gateway = tpay;

    if (!config[gateway.name].currencies.includes(currency)) {
        throw new AppError('CURRENCY_NOT_SUPPORTED');
    }

    try {
        // Tworzenie rekordu płatności (lokalna baza)
        const payment = await repositories.payments.create({
            orderId,
            provider: 'tpay',
            currency,
            amount,
            status: 'PENDING'
        });

        // Inicjalizacja płatności u zewnętrznego dostawcy
        const gatewayData = await gateway.create({
            amount,
            currency,
            orderPublicId,
            paymentId: payment.id,
            name,
            email
        });

        // Aktualizacja rekordu o ID transakcji od dostawcy
        await repositories.payments.update(payment.id, {
            providerId: gatewayData.transactionId
        })

        return { 
            paymentUrl: gatewayData.transactionPaymentUrl 
        };

    } catch (error) {

        throw error;
    }
}