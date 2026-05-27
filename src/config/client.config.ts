export const client = {
    protocol: process.env.CLIENT_PROTOCOL,
    hostname: process.env.CLIENT_HOSTNAME,
    port: process.env.CLIENT_PORT,

    url: `${process.env.CLIENT_PROTOCOL}://${process.env.CLIENT_HOSTNAME}${process.env.CLIENT_HOSTNAME === 'localhost' ? `:${process.env.CLIENT_PORT}` : ''}`,

    paths: {
        payments: {
            success: '/payment/success',
            error: '/payment/error'
        }
    },
}