import { ERROR_CODES, type ErrorCode } from './error-codes.js'

export class AppError extends Error {
  code: ErrorCode
  status: number
  details: unknown

  constructor(
    code: ErrorCode,
    details: unknown = null,
  ) {
    const errorConfig = ERROR_CODES[code]

    super(errorConfig.message)

    this.name = 'AppError'
    this.code = code
    this.status = errorConfig.status
    this.details = details
    Error.captureStackTrace(this, this.constructor)
  }
}
