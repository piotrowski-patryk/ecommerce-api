import repositories from '../repositories/index.js';

export async function getOrder(orderId: string) {
    try {
        return await repositories.orders.findById(orderId);

    } catch (error) {
        throw error;
    }
}