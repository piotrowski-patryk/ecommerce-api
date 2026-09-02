import assert from 'node:assert/strict'
import test from 'node:test'

import { toCartProductDto } from './cart-product.mapper.js'

test('maps the matching cart variant to a singular field', () => {
  const product = {
    id: 'product-1',
    name: 'Product',
    variants: [
      {
        id: 'variant-1',
        name: 'First variant',
        media: [{ url: 'first.jpg', alt: 'First' }],
      },
      {
        id: 'variant-2',
        name: 'Second variant',
        media: [
          { url: 'second-primary.jpg', alt: 'Second primary' },
          { url: 'second-secondary.jpg', alt: 'Second secondary' },
        ],
      },
    ],
  }

  const dto = toCartProductDto(product, 'variant-2')

  assert.deepEqual(dto, {
    id: 'product-1',
    name: 'Product',
    variant: {
      id: 'variant-2',
      name: 'Second variant',
      media: {
        url: 'second-primary.jpg',
        alt: 'Second primary',
      },
    },
  })
  assert.equal('variants' in (dto ?? {}), false)
  assert.equal('images' in (dto?.variant ?? {}), false)
})

test('returns undefined when the product does not contain the cart variant', () => {
  const dto = toCartProductDto({
    id: 'product-1',
    variants: [{ id: 'variant-1', media: [] }],
  }, 'variant-2')

  assert.equal(dto, undefined)
})

test('maps an empty media collection to null', () => {
  const dto = toCartProductDto({
    id: 'product-1',
    variants: [{ id: 'variant-1', media: [] }],
  }, 'variant-1')

  assert.deepEqual(dto?.variant.media, null)
})
