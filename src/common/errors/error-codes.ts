export const ERROR_CODES = {
  BAD_REQUEST: {
    status: 400,
    message: 'Bad Request',
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized',
  },

  FORBIDDEN: {
    status: 403,
    message: 'Forbidden',
  },

  NOT_FOUND: {
    status: 404,
    message: 'Not Found',
  },

  CONFLICT: {
    status: 409,
    message: 'Conflict',
  },

  UNPROCESSABLE_ENTITY: {
    status: 422,
    message: 'Unprocessable Entity',
  },

  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: 'Internal Server Error',
  },

  BAD_GATEWAY: {
    status: 502,
    message: 'Bad Gateway',
  },
} as const

export type ErrorCode = keyof typeof ERROR_CODES
