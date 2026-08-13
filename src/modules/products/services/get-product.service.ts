import { findProduct } from '../repositories/product.repository.js'

import type { GetProductInput } from '../types/product.types.js'

export async function getProduct({
  where,
  include,
}: GetProductInput) {
  return findProduct(where, include)
}
