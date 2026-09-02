import { mapProduct } from '../mappers/product.mapper.js'
import { findProduct } from '../repositories/product.repository.js'

import type { GetProductInput } from '../types/product.types.js'

export async function getProduct({
  where,
  include,
}: GetProductInput) {
  const product = await findProduct(where, include)

  return product ? mapProduct(product) : null
}
