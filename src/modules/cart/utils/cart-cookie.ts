import type { Response } from 'express'

import { CART_TTL_MS } from './cart-expiration.js'

export const CART_COOKIE_NAME = 'cart_session_id'

const cartCookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
} as const

export function setCartCookie(res: Response, sessionId: string) {
  res.cookie(CART_COOKIE_NAME, sessionId, {
    ...cartCookieOptions,
    maxAge: CART_TTL_MS,
  })
}

export function clearCartCookie(res: Response) {
  res.clearCookie(CART_COOKIE_NAME, cartCookieOptions)
}
