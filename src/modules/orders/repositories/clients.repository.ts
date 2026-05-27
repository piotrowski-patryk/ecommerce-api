import database from '#/database/index.js';

export async function create(data) {
    return await database.orderCLient.create({
        data
    });
}