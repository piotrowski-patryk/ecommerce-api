import type { ErrorRequestHandler } from 'express'
import { AppError, ERROR_CODES } from '../errors/index.js'

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    const code = err instanceof AppError ? err.code : 'INTERNAL_SERVER_ERROR'
    const errorConfig = ERROR_CODES[code]
    const isDevelopment = process.env.NODE_ENV === 'development'

    res.status(errorConfig.status).json({
        success: false,
        error: {
            status: errorConfig.status,
            code,
            message: errorConfig.message,
            timestamp: new Date().toISOString(),
            ...(isDevelopment && {
                details: err instanceof AppError ? err.details : null,
                stack: err instanceof Error ? err.stack : null,
            }),
        },
    })
}
