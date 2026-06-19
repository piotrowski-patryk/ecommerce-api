import database from '#/database/index.js';

export async function findById(id: string) {
    return await database.product.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            currency: true,
            priceNet: true,
            priceGross: true,
            vatRate: true,
            status: true
        }
    });
}

export async function findByIds(ids: string[]) {
    return await database.product.findMany({
        where: {
            id: { in: ids }
        },
        select: {
            id: true,
            name: true,
            currency: true,
            priceNet: true,
            priceGross: true,
            vatRate: true,
            status: true
        }
    })
}