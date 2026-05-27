const protocol = process.env.API_PROTOCOL || 'http';
const hostname = process.env.API_HOSTNAME || 'localhost';
const port = process.env.API_PORT || 3000;

export const app = {
    env: process.env.NODE_ENV || 'development',
    protocol,
    hostname,
    port,

    url: `${protocol}://${hostname}${hostname === 'localhost' ? `:${port}` : ''}`
}