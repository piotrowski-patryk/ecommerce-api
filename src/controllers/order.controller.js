import * as orderService from '../services/order.service.js';

// Kontroler do tworzenia nowego zamówienia i generowanie linku do płatności tpay
export async function create (req, res, next) {
    try {
        const { name, email, items } = req.body;

        const result = await orderService.create(name, email, items);


        // Zwrócenie linku do płatności tpay w odpowiedzi
        res.status(201).json({ 
            status: 'Success',
            data: result
        });
        
    } catch (error) {
        next(error);
    }
}

// Kontroler (webhook tpay) do zmiany statusu płatności w bazie danych
export async function tpayWebhook (req, res, next) {
    try {
        const { tr_status, tr_crc } = req.body; // tr_crc jako odpowiednik orderId

        const status = tr_status === 'TRUE' ? 'paid' : 'failed';

        // Zmiana statusu płatności zamówienia w bazie danych
        await orderService.updateStatus(tr_crc, status);

        res.send('TRUE'); // Tpay oczekuje odpowiedzi 'TRUE'

    } catch (error) {
        next(error);
    }
}