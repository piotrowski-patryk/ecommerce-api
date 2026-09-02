import type { Request, Response } from 'express'
import { z } from 'zod'

import { AppError } from '#/common/errors/index.js'
import { parseInput } from '#/common/validation/parse-input.js'

import { addCartItem } from '../services/add-cart-item.service.js'
import { updateCartItem } from '../services/update-cart-item.service.js'
import { removeCartItem } from '../services/remove-cart-item.service.js'
import {
  CART_COOKIE_NAME,
  setCartCookie,
} from '../utils/cart-cookie.js'

export async function add(
  req: Request,
  res: Response,
) {
  const { variantId, quantity } = parseInput(
    z.object({
      variantId: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
    req.body,
  )

  const result = await addCartItem({
    sessionId: req.cookies[CART_COOKIE_NAME] as string | undefined,
    variantId,
    quantity,
  })

  if (result) {
    setCartCookie(res, result.sessionId)
  }

  res.status(200).json({
    success: true,
  })
}

export async function update(
  req: Request,
  res: Response,
) {
  const { itemId } = parseInput(z.object({ itemId: z.string().uuid() }), req.params)
  const { quantity } = parseInput(
    z.object({ quantity: z.number().int().positive() }),
    req.body,
  )
  const sessionId = req.cookies[CART_COOKIE_NAME] as string | undefined

  if (!sessionId) {
    throw new AppError('NOT_FOUND')
  }

  const item = await updateCartItem({
    id: itemId,
    quantity,
    sessionId,
  })

  setCartCookie(res, sessionId)

  res.status(200).json({
    success: true,
    data: item,
  })
}

export async function remove(
  req: Request,
  res: Response,
) {
  const { itemId } = parseInput(z.object({ itemId: z.string().uuid() }), req.params)
  const sessionId = req.cookies[CART_COOKIE_NAME] as string | undefined

  if (!sessionId) {
    throw new AppError('NOT_FOUND')
  }

  await removeCartItem({
    id: itemId,
    sessionId,
  })

  setCartCookie(res, sessionId)

  res.status(204).json({
    success: true,
  })
}
