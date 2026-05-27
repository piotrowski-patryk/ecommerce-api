import nodemailer from 'nodemailer';
import config from '#/config/index.js';

export const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    auth: {
        user: config.smtp.user,
        pass: config.smtp.pass
    }
});