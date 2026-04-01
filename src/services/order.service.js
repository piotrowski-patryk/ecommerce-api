import pool from '../config/database.config.js';
import * as tpayService from './tpay.service.js';
import * as emailService from './email.service.js';
import { newError } from '../utils/newError.util.js';

// Funkcja do tworzenia nowego zamówienia w bazie danych i generowania linku do płatności tpay
export async function create(name, email, items) {
    if (!name || !email || !Array.isArray(items) || items.length === 0) {
        throw newError('Missing or invalid arguments: name, email or items', 'INTERNAL_SERVER_ERROR');
    }

    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        // Tworzenie pustego zamówienia w bazie danych
        const [{ insertId: id }] = await conn.execute(
            'INSERT INTO `order` (email, name) VALUES (?, ?)', 
            [email, name]
        );

        // Dodawanie pozycji zamówienia do bazy danych
        await conn.query(
            'INSERT INTO `order_item` (order_id, product_id, quantity) VALUES ?',
            [items.map(i => [id, i.id, i.quantity])]
        );

        // Pobieranie całkowitej kwoty zamówienia z bazy danych
        const [[{ total_amount }]] = await conn.execute(
            'SELECT total_amount FROM `order` WHERE id = ?', 
            [id]
        );
        
        // Generowanie linku do płatności tpay
        const { paymentLink } = await tpayService.generatePaymentLink(total_amount, id, email, name);

        await conn.commit();
        return { paymentLink };

    } catch (error) {
        await conn.rollback();
        throw error;

    } finally {
        conn.release();
    }
};

// Funkcja do aktualizacji statusu zamówienia w bazie danych
export async function updateStatus(orderId, status) {
    if (!orderId || !status) {
        throw newError(`Missing params: id=${orderId || null}, status=${status || null}`, 'MISSING_DATA');
    }

    if (isNaN(orderId) || !['pending', 'paid', 'failed'].includes(status)) {
        throw newError(`Invalid input: id=${orderId || null}, status=${status || null}`, 'INVALID_DATA');
    }

    try {
        // Pobieranie danych zamówienia z bazy danych na podstawie orderId
        const [rows] = await pool.execute(
            'SELECT name, email, status FROM `order` WHERE id = ?',
            [orderId]
        );

        if (rows.length === 0) {
            throw newError(`Order ${orderId} not found`, 'NOT_FOUND');
        }

        const order = rows[0];

        // Aktualizacja statusu zamówienia w bazie danych
        await pool.execute(
            'UPDATE `order` SET status = ? WHERE id = ?',
            [status, orderId]
        );

        // Jeśli status zmienił się na "paid", wysyłamy e-mail z potwierdzeniem płatności do klienta
        if (status === 'paid' && order.status !== 'paid') {
            await emailService.sendEmail(
                order.email, 
                'Potwierdzenie płatności', 
                `<p>Zamówienie nr: ${orderId} zostało opłacone.</p>`
            );
        }

    } catch (error) {
        throw error;
    }
}