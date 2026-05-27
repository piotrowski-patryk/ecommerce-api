import { AppError } from "#/common/errors/index.js";
import { transporter } from "../providers/nodemailer.provider.js";
import config from "#/config/index.js";
import { render } from '@react-email/render';
import templates from "../templates/index.js";
import { EMAIL_CODES } from "../email-codes.constant.js";

export async function send(to: string, options: any) {

    if (!to) throw new AppError('INVALID_ARGUMENT');

    let subject: string = 'Wiadomość systemowa';
    let html: string = '';

    // Automatyczna wiadomość na podstawie kodu
    if (options.code) {
        subject = EMAIL_CODES[options.code].subject;
        html = await render(templates[EMAIL_CODES[options.code].template](options.data));
    }

    // Wysyłanie wiadomości za pomocą providera nodemailer
    try {
        await transporter.sendMail({
            from: config.smtp.fromEmail,
            to,
            subject,
            html
        });

    } catch (error) {
        throw error;
    }
}