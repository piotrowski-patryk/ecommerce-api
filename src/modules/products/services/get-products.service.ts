import { AppError } from '#/common/errors/index.js';
import repositories from '../repositories/index.js';

export async function getProducts(ids: string[]) {
    
    if (!Array.isArray(ids) || ids.length === 0) {
        throw new AppError("INVALID_PAYLOAD");
    }

    return await repositories.products.findByIds(ids);
}