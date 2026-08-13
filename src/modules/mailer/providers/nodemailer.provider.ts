import nodemailer from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport/index.js'

import config from '#/config/index.js'

export const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port ? Number(config.smtp.port) : 587,
    auth: {
        user: config.smtp.user,
        pass: config.smtp.pass
    }
} satisfies SMTPTransport.Options)
