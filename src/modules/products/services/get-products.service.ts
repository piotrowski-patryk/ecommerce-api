import { findProducts } from '../repositories/product.repository.js'
import type { GetProductsInput } from '../types/product.types.js'

export async function getProducts({
  where = {},
  include = {},
}: GetProductsInput = {}) {
  return findProducts(where, include)
}