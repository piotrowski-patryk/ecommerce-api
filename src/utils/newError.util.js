// Funkcja pomocnicza do tworzenia nowych błędów z wiadomością techniczną i kodem błędu
export function newError(message, code = 'DEFAULT') {
    const error = new Error(message);

    Error.captureStackTrace(error, newError);

    error.code = code;

    return error;
}