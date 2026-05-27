import database from '#/database/index.js';

export async function create(data: any) {
    return await database.payment.create({
        data
    });
}

export async function findById(id: string) {
    return await database.payment.findUnique({
        where: { id }
    });
}

export async function update(paymentId: string, data: any) {
    try {
        return await database.payment.update({
            where: { id: paymentId },
            data
        });

    } catch (error: any) {
        if (error.code === 'P2025') return null;

        throw error;
    }
}