import { mapProduct } from '../mappers/product.mapper.js'
import { findProducts } from '../repositories/product.repository.js'
import type { GetProductsInput } from '../types/product.types.js'

export async function getProducts({
  where = {},
  include = {},
}: GetProductsInput = {}) {
  const products = await findProducts(where, include)

  return products.map(product => mapProduct(product))
}
