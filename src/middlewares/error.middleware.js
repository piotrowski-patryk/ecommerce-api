import { ERROR_MESSAGES } from '../utils/errors.js';
import { ansi } from '../utils/ansi.util.js';

// Middleware do obsługi błędów - loguje szczegóły błędu i zwraca odpowiedź JSON
export function errorRes(error, req, res, next) {
    const isDev = process.env.NODE_ENV !== 'production';
    
    const errorCode = error.code || 'INTERNAL_SERVER_ERROR';
    const cfg = ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.DEFAULT;
    const status = cfg.status || 500;
    const { R, S, _ } = ansi;

    // Logowanie błędu w konsoli - tylko dla błędów serwera (500+) lub w trybie deweloperskim
    if (status >= 500 || isDev) {
        const stackLine = error.stack?.split('\n')[1] || '';
        const location = stackLine.trim().replace('at ', '') || 'unknown location';

        console.error(`${R}[error]${_} ${S}${errorCode}: ${error.message}`);
        console.error(`        at ${location}${_}\n`);
    }

    // Odpowiedź JSON dla klienta
    res.status(status).json({
        success: false,
        status: status,
        code: errorCode,
        message: cfg.message,
        // Szczegóły techniczne tylko w trybie deweloperskim
        ...(isDev && { details: error.message })
    });
}