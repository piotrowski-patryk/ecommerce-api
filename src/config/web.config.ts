export const web = {
    protocol: process.env.WEBT_PROTOCOL,
    hostname: process.env.WEBT_HOSTNAME,
    port: process.env.WEBT_PORT,

    url: `${process.env.WEBT_PROTOCOL}://${process.env.WEBT_HOSTNAME}${process.env.WEBT_HOSTNAME === 'localhost' ? `:${process.env.WEBT_PORT}` : ''}`,

    paths: {
        payments: {
            success: '/payment/success',
            error: '/payment/error'
        }
    },
}