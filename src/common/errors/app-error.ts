import { ERROR_CODES } from "./error-codes.js";

export class AppError extends Error {
    
    code: string;
    status: number;
    details: any;
    trusted: boolean;

    constructor(code: string, details: any = null) {
        const errorConfig = ERROR_CODES[code] || ERROR_CODES.INTERNAL_SERVER_ERROR;

        super(errorConfig.message);

        this.code = code || 'INTERNAL_SERVER_ERROR';
        this.status = errorConfig.status;
        this.details = details;
        this.trusted = true;

        Error.captureStackTrace(this, this.constructor);
    }
}