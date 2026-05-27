export const tpay = {
    clientId: process.env.TPAY_CLIENT_ID,
    secret: process.env.TPAY_SECRET,
    security: process.env.TPAY_SECURITY,
    tpayUrl: 'https://openapi.sandbox.tpay.com',
    successUrl: '',
    errorUrl: '',
    currencies: ['PLN']
}