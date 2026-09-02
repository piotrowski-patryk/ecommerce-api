import { Prisma } from '#/database/generated/client.js'
import { AppError } from '#/common/errors/index.js'

import type {
  ProductPriceRecord,
  ResolvedProductPrice,
} from '../types/product.types.js'

const LOWEST_PRICE_WINDOW_MS = 30 * 24 * 60 * 60 * 1000

type ProductWithPrice<
  T extends { variants: Array<{ id: string; prices: ProductPriceRecord[] }> },
> = Omit<T, 'variants'> & {
  variants: Array<
    Omit<T['variants'][number], 'prices'> & { price: ResolvedProductPrice }
  >
}

type ProductDto<
  T extends { variants: Array<{ price: ResolvedProductPrice }> },
> = Omit<T, 'variants'> & {
  variants: Array<
    Omit<T['variants'][number], 'price'> & {
      price: {
        amount: string
        currency: string
        promo?: {
          regular: string
          lowest30: string
          endsAt: string | null
        }
      }
    }
  >
}

export function mapProduct<
  T extends { variants: Array<{ id: string; prices: ProductPriceRecord[] }> },
>(product: T, now = new Date()): ProductWithPrice<T> {
  const { variants, ...data } = product

  return {
    ...data,
    variants: variants.map(({ prices, ...variant }) => ({
      ...variant,
      price: mapPrice(prices, variant.id, now),
    })),
  } as ProductWithPrice<T>
}

export function toProductDto<
  T extends { variants: Array<{ price: ResolvedProductPrice }> },
>(product: T): ProductDto<T> {
  const { variants, ...data } = product

  return {
    ...data,
    variants: variants.map(({ price, ...variant }) => ({
      ...variant,
      price: {
        amount: price.amount.toFixed(2),
        currency: price.currency,
        ...(price.promo && {
          promo: {
            regular: price.promo.regular.toFixed(2),
            lowest30: price.promo.lowest30.toFixed(2),
            endsAt: price.promo.endsAt?.toISOString() ?? null,
          },
        }),
      },
    })),
  } as ProductDto<T>
}

function mapPrice(
  prices: ProductPriceRecord[],
  variantId: string,
  now: Date,
): ResolvedProductPrice {
  const active = prices.filter(price =>
    price.status === 'ACTIVE'
    && price.startsAt <= now
    && (price.endsAt === null || price.endsAt > now),
  )
  const regular = getSinglePrice(active, variantId, 'REGULAR')
  const promo = getSinglePrice(active, variantId, 'PROMOTION', false)

  if (!regular) {
    throw new AppError('CONFLICT', {
      reason: 'REGULAR_PRICE_NOT_FOUND',
      variantId,
    })
  }

  const regularGross = getGross(regular)

  if (!promo) {
    return {
      amount: regularGross,
      net: regular.priceNet,
      vatRate: regular.vatRate,
      currency: regular.currency,
    }
  }

  const lowest30 = getLowest30(prices, promo.startsAt)

  if (!lowest30) {
    throw new AppError('CONFLICT', {
      reason: 'PRICE_HISTORY_NOT_FOUND',
      variantId,
      promoId: promo.id,
    })
  }

  const promoGross = getGross(promo)

  if (!promoGross.lessThan(lowest30) || !promoGross.lessThan(regularGross)) {
    throw new AppError('CONFLICT', {
      reason: 'INVALID_PROMO_PRICE',
      variantId,
      promoId: promo.id,
    })
  }

  return {
    amount: promoGross,
    net: promo.priceNet,
    vatRate: promo.vatRate,
    currency: promo.currency,
    promo: {
      regular: regularGross,
      lowest30,
      endsAt: promo.endsAt,
    },
  }
}

function getSinglePrice(
  prices: ProductPriceRecord[],
  variantId: string,
  type: 'REGULAR' | 'PROMOTION',
  required = true,
) {
  const matching = prices.filter(price => price.type === type)

  if (matching.length > 1) {
    throw new AppError('CONFLICT', {
      reason: 'OVERLAPPING_PRICES',
      variantId,
      type,
    })
  }

  if (required && matching.length === 0) {
    return undefined
  }

  return matching[0]
}

function getLowest30(
  prices: ProductPriceRecord[],
  promoStartsAt: Date,
) {
  const windowStartsAt = new Date(
    promoStartsAt.getTime() - LOWEST_PRICE_WINDOW_MS,
  )

  return prices.reduce<Prisma.Decimal | null>((lowest, price) => {
    const wasApplied = (
      price.startsAt < promoStartsAt
      && (price.endsAt === null || price.endsAt > windowStartsAt)
    )

    if (!wasApplied) {
      return lowest
    }

    const gross = getGross(price)

    return !lowest || gross.lessThan(lowest) ? gross : lowest
  }, null)
}

function getGross(price: ProductPriceRecord) {
  return price.priceNet
    .mul(price.vatRate.add(1))
    .toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP)
}
