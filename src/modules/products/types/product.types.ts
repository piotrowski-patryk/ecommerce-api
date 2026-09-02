import type { Prisma } from '#/database/generated/client.js'
import type { PriceStatus, PriceType } from '#/database/generated/enums.js'

export type ProductWhere = {
  id?: string
  ids?: string[]
  variantId?: string
  variantIds?: string[]
  variantSlug?: string
}

export interface ProductInclude {
  media?: boolean | {
    limit?: number
  }
  attributes?: boolean
}

export interface ProductPriceRecord {
  id: string
  productVariantId: string
  currency: string
  priceNet: Prisma.Decimal
  vatRate: Prisma.Decimal
  type: PriceType
  status: PriceStatus
  startsAt: Date
  endsAt: Date | null
}

export interface ResolvedProductPrice {
  amount: Prisma.Decimal
  net: Prisma.Decimal
  vatRate: Prisma.Decimal
  currency: string
  promo?: {
    regular: Prisma.Decimal
    lowest30: Prisma.Decimal
    endsAt: Date | null
  }
}

export interface GetProductInput {
  where: ProductWhere
  include?: ProductInclude
}

export interface GetProductsInput {
  where?: ProductWhere
  include?: ProductInclude
}
