import assert from 'node:assert/strict'
import test from 'node:test'

import { Prisma } from '#/database/generated/client.js'

import { mapProduct, toProductDto } from './product.mapper.js'

import type { ProductPriceRecord } from '../types/product.types.js'

const now = new Date('2026-08-10T00:00:00.000Z')

test('maps a regular product price to the public response', () => {
  const product = mapProduct(makeProduct([
    makePrice({ priceNet: '81.30' }),
  ]), now)
  const dto = toProductDto(product)

  assert.deepEqual(dto.variants[0]?.price, {
    amount: '100.00',
    currency: 'PLN',
  })
})

test('uses an earlier promotion when calculating lowest30', () => {
  const product = mapProduct(makeProduct([
    makePrice({ priceNet: '81.30' }),
    makePrice({
      id: 'old-promo',
      type: 'PROMOTION',
      status: 'ARCHIVED',
      priceNet: '73.17',
      startsAt: '2026-07-20T00:00:00.000Z',
      endsAt: '2026-07-25T00:00:00.000Z',
    }),
    makePrice({
      id: 'current-promo',
      type: 'PROMOTION',
      priceNet: '65.04',
      startsAt: '2026-08-01T00:00:00.000Z',
      endsAt: '2026-08-31T00:00:00.000Z',
    }),
  ]), now)
  const dto = toProductDto(product)

  assert.deepEqual(dto.variants[0]?.price, {
    amount: '80.00',
    currency: 'PLN',
    promo: {
      regular: '100.00',
      lowest30: '90.00',
      endsAt: '2026-08-31T00:00:00.000Z',
    },
  })
})

test('does not use the current promotion in its own lowest30', () => {
  const product = mapProduct(makeProduct([
    makePrice({ priceNet: '81.30' }),
    makePrice({
      id: 'current-promo',
      type: 'PROMOTION',
      priceNet: '65.04',
      startsAt: '2026-08-01T00:00:00.000Z',
      endsAt: '2026-08-31T00:00:00.000Z',
    }),
  ]), now)

  assert.equal(product.variants[0]?.price.promo?.lowest30.toFixed(2), '100.00')
})

test('ignores a price that ended before the 30-day window', () => {
  const product = mapProduct(makeProduct([
    makePrice({
      id: 'old-price',
      status: 'ARCHIVED',
      priceNet: '40.65',
      startsAt: '2026-05-01T00:00:00.000Z',
      endsAt: '2026-06-30T00:00:00.000Z',
    }),
    makePrice({
      id: 'regular',
      priceNet: '81.30',
      startsAt: '2026-07-02T00:00:00.000Z',
    }),
    makePrice({
      id: 'current-promo',
      type: 'PROMOTION',
      priceNet: '65.04',
      startsAt: '2026-08-01T00:00:00.000Z',
      endsAt: '2026-08-31T00:00:00.000Z',
    }),
  ]), now)

  assert.equal(product.variants[0]?.price.promo?.lowest30.toFixed(2), '100.00')
})

function makeProduct(prices: ProductPriceRecord[]) {
  return {
    id: 'product-1',
    variants: [{
      id: 'variant-1',
      prices,
    }],
  }
}

function makePrice({
  id = 'regular',
  type = 'REGULAR',
  status = 'ACTIVE',
  priceNet = '81.30',
  vatRate = '0.23',
  startsAt = '2026-07-02T00:00:00.000Z',
  endsAt = null,
}: {
  id?: string
  type?: 'REGULAR' | 'PROMOTION'
  status?: 'ACTIVE' | 'ARCHIVED'
  priceNet?: string
  vatRate?: string
  startsAt?: string
  endsAt?: string | null
} = {}): ProductPriceRecord {
  return {
    id,
    productVariantId: 'variant-1',
    currency: 'PLN',
    priceNet: new Prisma.Decimal(priceNet),
    vatRate: new Prisma.Decimal(vatRate),
    type,
    status,
    startsAt: new Date(startsAt),
    endsAt: endsAt ? new Date(endsAt) : null,
  }
}
