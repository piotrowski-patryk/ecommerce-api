import assert from 'node:assert/strict'
import test from 'node:test'

import { CART_TTL_MS, getCartExpiration } from './cart-expiration.js'

test('sets cart expiration to 30 days after the last mutation', () => {
  const now = new Date('2026-08-28T10:00:00.000Z')

  assert.equal(
    getCartExpiration(now).getTime(),
    now.getTime() + CART_TTL_MS,
  )
})
