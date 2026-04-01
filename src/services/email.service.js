import nodemailer from 'nodemailer';
import { newError } from '../utils/newError.js';

// Konfiguracja transportera nodemailer do wysyłania e-maili
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    pool: true,
    maxConnections: 1,
    maxMessages: 3
});

// Funkcja do wysyłania e-maili
export async function sendEmail(to, subject, html) {
    if (!to || !subject || !html) {
        throw newError('Missing email parameters: to, subject or html', 'INTERNAL_SERVER_ERROR');
    }

    try {
        // Wysyłanie e-maila za pomocą nodemailer
        await transporter.sendMail({
            from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
            to,
            subject,
            html,
            text: html.replace(/<[^>]*>?/gm, '')
        });

    } catch (error) {
        throw error;
    }
}