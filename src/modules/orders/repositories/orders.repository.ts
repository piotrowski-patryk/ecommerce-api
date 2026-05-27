import database from '#/database/index.js';

export async function findById(orderId: string) {
    return await database.order.findUnique({
        where: { 
            id: orderId 
        },
        include: {
            clients: true,
            items: true
        }
    });
}

export async function create(orderData: any, clientData: any, itemData: any) {
    return await database.order.create({
        data: {
            ...orderData,
            clients: {
                create: clientData
            },
            items: {
                create: itemData
            }
        },
        include: {
            clients: true,
            items: true
        }
    });
}

export async function update(orderId: string, data: any) {
    return await database.order.update({
        where: { id: orderId },
        data
    });
}