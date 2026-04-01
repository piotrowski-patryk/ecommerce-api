export const ERROR_MESSAGES = {
    // 400: Błędy danych wejściowych
    BAD_REQUEST: {
        status: 400,
        message: 'The request is invalid or missing required data.'
    },
    VALIDATION_ERROR: {
        status: 400,
        message: 'One or more fields failed validation.'
    },

    // 401 & 403: Dostęp
    UNAUTHORIZED: {
        status: 401,
        message: 'Authentication required. Please log in.'
    },
    FORBIDDEN: {
        status: 403,
        message: 'Access denied. You do not have permission for this action.'
    },

    // 404 & 409: Zasoby
    NOT_FOUND: {
        status: 404,
        message: 'The requested resource could not be found.'
    },
    CONFLICT: {
        status: 409,
        message: 'This record already exists in our system.'
    },

    // 500: Błędy serwera
    INTERNAL_SERVER_ERROR: {
        status: 500,
        message: 'Something went wrong on our end.'
    },

    DEFAULT: {
        status: 500,
        message: 'An unexpected error occurred. Please try again later.'
    }
};