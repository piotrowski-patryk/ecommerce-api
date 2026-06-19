export const web = {
    protocol: process.env.WEB_PROTOCOL,
    hostname: process.env.WEB_HOSTNAME,
    port: process.env.WEB_PORT,

    url: `${process.env.WEB_PROTOCOL}://${process.env.WEB_HOSTNAME}${process.env.WEB_HOSTNAME === 'localhost' ? `:${process.env.WEB_PORT}` : ''}`,

    paths: {
        payments: {
            success: '/payment/success',
            error: '/payment/error'
        }
    },
}