export const CART_TTL_MS = 30 * 24 * 60 * 60 * 1000

export function getCartExpiration(now = new Date()) {
  return new Date(now.getTime() + CART_TTL_MS)
}
