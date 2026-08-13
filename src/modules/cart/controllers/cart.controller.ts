import { AppError } from '#/common/errors/index.js'
import type { Request, Response } from 'express'

import { getCart } from '../services/get-cart.service.js'

export async function get(
  req: Request,
  res: Response,
) {
  const sessionId = req.cookies.cart_session_id

  if (!sessionId) {
    throw new AppError('NOT_FOUND')
  }

  const cart = await getCart({
    sessionId,
  })

  res.status(200).json({
    success: true,
    data: cart,
  })
}
