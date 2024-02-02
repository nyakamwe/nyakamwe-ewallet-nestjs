/** Time Seconds */
export const CACHE_1_MINUTE = 60

/** Bad Request Client error constants */
export const _400 = {
    TOKEN_NOT_PROVIDED: {
        code: 'TOKEN_REQUIRED',
        message: 'Token required for authentication'
    },
};

/** Unauthorized Client error constants */
export const _401 = {
    INVALID_CREDENTIALS: {
      code: 'INVALID_CREDENTIALS',
      message: 'The credentials provided are not valid',
    },
};

/** NotFound Client error constants */
export const _404 = {
    WALLET_NOT_FOUND: {
        code: 'WALLET_NOT_FOUND',
        message: 'Wallet you are looking for not found'
    }
}
