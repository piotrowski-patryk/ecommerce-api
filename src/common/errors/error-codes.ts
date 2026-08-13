export const ERROR_CODES = {
  BAD_REQUEST: {
    status: 400,
    message: 'The request is invalid.',
  },

  UNAUTHORIZED: {
    status: 401,
    message: 'Authentication is required.',
  },

  FORBIDDEN: {
    status: 403,
    message: 'You do not have permission to perform this action.',
  },

  NOT_FOUND: {
    status: 404,
    message: 'The requested resource was not found.',
  },

  CONFLICT: {
    status: 409,
    message: 'The request conflicts with the current state of the resource.',
  },

  UNPROCESSABLE_ENTITY: {
    status: 422,
    message: 'The request data is invalid.',
  },

  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: 'An unexpected error occurred.',
  },

  BAD_GATEWAY: {
    status: 502,
    message: 'The server received an invalid response from an upstream server.',
  },
} as const

export type ErrorCode = keyof typeof ERROR_CODES