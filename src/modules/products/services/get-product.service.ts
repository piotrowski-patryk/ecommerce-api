import { AppError } from '#/common/errors/index.js';
import repositories from '../repositories/index.js';

export async function getById(id: String) {
  return await repositories.products.findById(id);
}