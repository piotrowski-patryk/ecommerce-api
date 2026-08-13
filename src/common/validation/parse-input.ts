import type { ZodType } from 'zod'

import { AppError } from '../errors/index.js'

export function parseInput<T>(schema: ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input)

  if (!result.success) {
    throw new AppError('UNPROCESSABLE_ENTITY')
  }

  return result.data
}
