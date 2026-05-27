export const ERROR_CODES = {
    // 400: Uniwersalny błąd niepoprawnego argumentu / zmiennej
    INVALID_ARGUMENT: {
        status: 400,
        message: 'The provided argument or parameter is invalid, unrecognized, or out of range.'
    },

    // 400: Błędy zapytania (Client Error)
    INVALID_PAYMENT_GATEWAY: {
        status: 400,
        message: 'The selected payment gateway is invalid or not supported.'
    },

    // 401: Błąd uwierzytelnienia
    AUTHENTICATION_FAILED: {
        status: 401,
        message: 'The request could not be authenticated. Please check your credentials.'
    },

    // 404: Nie znaleziono
    NOT_FOUND: {
        status: 404,
        message: 'The requested resource was not found.'
    },

    // 409: Konflikt (Brak dostępności towaru w bazie)
    PRODUCT_NOT_AVAILABLE: {
        status: 409,
        message: 'The requested product is currently inactive or unavailable for purchase.'
    },

    // 422: Niepoprawne parametry logiki
    INVALID_LOGIC_PARAMETERS: {
        status: 422,
        message: 'The provided parameters are invalid for this operation.'
    },

    // 422: Nieobsługiwana waluta dla operacji
    CURRENCY_NOT_SUPPORTED: {
        status: 422,
        message: 'The specified currency is not supported for this operation.'
    },

    // 500: Błędy serwera
    INTERNAL_SERVER_ERROR: {
        status: 500,
        message: 'An unexpected error occurred. Please try again later.'
    },

    // 500: Błąd konfiguracji
    CONFIGURATION_ERROR: {
        status: 500,
        message: 'The server configuration is invalid or missing required keys.'
    },

    // 502: Payment
    PAYMENT_GATEWAY_ERROR: {
        status: 502,
        message: 'Payment gateway connection error. Please try again later.'
    }
};