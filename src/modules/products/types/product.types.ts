export type ProductWhere = {
  id?: string
  ids?: string[]
  variantId?: string
  variantIds?: string[]
  variantSlug?: string
}

export interface ProductInclude {
  prices?: boolean
  images?: boolean
  attributes?: boolean
}

export interface GetProductInput {
  where: ProductWhere
  include?: ProductInclude
}

export interface GetProductsInput {
  where?: ProductWhere
  include?: ProductInclude
}
