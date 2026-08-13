import type { Request, Response } from 'express'
import { z } from 'zod'

import { parseInput } from '#/common/validation/parse-input.js'

import { createOrder } from '../services/create-order.service.js'

const createOrderSchema = z.object({
  client: z.object({
    name: z.string().trim().min(1).max(255),
    email: z.email(),
  }),
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
  })).min(1),
})

export async function initOrder(req: Request, res: Response) {
  const input = parseInput(createOrderSchema, req.body)
  const result = await createOrder(input)

  res.status(201).json({
    success: true,
    data: result,
  })
}
