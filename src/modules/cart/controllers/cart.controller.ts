import type { Request, Response } from 'express'

import { AppError } from '#/common/errors/index.js'

import { getCart } from '../services/get-cart.service.js'
import {
  CART_COOKIE_NAME,
  clearCartCookie,
} from '../utils/cart-cookie.js'

export async function get(
  req: Request,
  res: Response,
) {
  const sessionId = req.cookies[CART_COOKIE_NAME] as string | undefined

  if (!sessionId) {
    clearCartCookie(res)
    throw new AppError('NOT_FOUND')
  }

  let cart: Awaited<ReturnType<typeof getCart>>

  try {
    cart = await getCart({
      sessionId,
    })
  }
  catch (error) {
    if (error instanceof AppError && error.code === 'NOT_FOUND') {
      clearCartCookie(res)
    }

    throw error
  }

  res.status(200).json({
    success: true,
    data: cart,
  })
}
