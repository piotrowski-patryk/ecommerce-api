import database from '#/database/index.js';

export async function create(data) {
    return await database.orderItem.create({
        data
    });
}