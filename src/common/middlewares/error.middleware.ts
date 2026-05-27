import { Request, Response } from 'express';

export function errorHandler (err: any, req: Request, res: Response) {
    
    const status = err.status || 500;
    const code = err.trusted ? err.code : 'INTERNAL_SERVER_ERROR';
    const message = err.trusted ? err.message : 'An unexpected error occurred. Please try again later.';

    const isDev = process.env.NODE_ENV === 'development';

    res.status(status).json({
        success: false,
        error: {
            status,
            code,
            message,
            timestamp: new Date().toISOString(),
            ...(isDev && { 
                details: err.details || null,
                stack: err.stack || null,
            })
        }
    });
}