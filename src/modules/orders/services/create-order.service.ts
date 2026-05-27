import repositories from '../repositories/index.js';
import products from '#/modules/products/index.js';
import payments from '#/modules/payments/index.js';
import { AppError } from '#/common/errors/index.js';

type InClient = {
    name: string;
    email: string;
};

type InItem = {
    productId: string;
    quantity: number;

    name?: string;
    currency?: string;
    priceNet?: number;
    priceGross?: number;
    vatRate?: number;
};

type In = {
    client: InClient;
    items: InItem[];
};

export async function createOrder({ client, items }: In) {

    try {
        const subset = await products.get(items.map(item => item.productId));

        let totalNet = 0;
        let totalGross = 0;

        for (const item of items) {
            const product = subset.find(p => p.id === item.productId)!;

            if (product.status !== 'AVAILABLE') {
                throw new AppError('PRODUCT_NOT_AVAILABLE');
            }

            item.name = product.name;
            item.currency = product.currency;
            item.priceNet = Number(product.priceNet);
            item.priceGross = Number(product.priceGross);
            item.vatRate = Number(product.vatRate);

            totalNet += item.priceNet * item.quantity;
            totalGross += item.priceGross * item.quantity;
        }

        const orderPayload = {
            totalNet: totalNet,
            totalGross: totalGross,
            totalTax: totalGross - totalNet,
            status: 'PENDING'
        }

        // Tworznie zamówienia w bazie danych (razme z klientem i pozycjami)
        const order = await repositories.orders.create(orderPayload, client, items);

        // Wywołanie płatności
        const payment = await payments.init({
            orderId: order.id,
            orderPublicId: order.publicId,
            currency: subset[0].currency,
            amount: Number(order.totalGross),
            name: client.name,
            email: client.email
        });

        return {
            paymentUrl: payment.paymentUrl
        }

    } catch (error: any) {
        throw error;
    }
}