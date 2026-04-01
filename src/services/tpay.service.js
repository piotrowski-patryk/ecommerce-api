import { newError } from '../utils/newError.util.js';

// Funkcja do pobierania tokena dostępu z API tpay
export async function getAccessToken() {
    try {
        // Pobieranie tokena dostępu z API tpay
        const response = await fetch(`https://openapi.sandbox.tpay.com/oauth/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: process.env.TPAY_CLIENT_ID,
                client_secret: process.env.TPAY_SECRET,
                scope: 'read write'
            })
        });

        // Parsowanie odpowiedzi z API tpay
        const data = await response.json();

        if (!response.ok || !data.access_token) {
            throw newError(`Tpay Auth Failed: ${data.error_description || 'Invalid credentials'}`, 'INTERNAL_SERVER_ERROR');
        }

        // Zwrócenie tokena dostępu
        return { accessToken: data.access_token };
    } catch (error) {
        throw error;
    }
}

// Funkcja do generowania linku do płatności tpay dla danego zamówienia
export async function generatePaymentLink(amount, orderId, email, name) {
    if (!amount || amount <= 0) {
        throw newError('Invalid payment amount', 'BAD_REQUEST');
    }

    try {
        // Pobieranie tokena dostępu do API tpay
        const { accessToken } = await getAccessToken();

        // Tworzenie transakcji płatności w API tpay
        const response = await fetch(`https://openapi.sandbox.tpay.com/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                amount: parseFloat(amount).toFixed(2),
                description: `zamówienie nr: ${orderId}`,
                hiddenDescription: orderId.toString(),
                crc: orderId.toString(), 
                payer: { 
                    email: email, 
                    name: name 
                },
                callbacks: {
                    payerUrls: {
                        success: `${process.env.FRONTEND_URL}${process.env.TPAY_SUCCESS_URL}`,
                        error: `${process.env.FRONTEND_URL}${process.env.TPAY_ERROR_URL}`
                    },
                    notification: {
                        url: `${process.env.BACKEND_URL}/api/orders/tpay-webhook`
                    }
                }
            })
        });

        // Parsowanie odpowiedzi z API tpay
        const data = await response.json();

        if (!response.ok) {
            throw newError(data.message || 'Tpay API Error', 'INTERNAL_SERVER_ERROR');
        }

        // Zwrócenie linku do płatności tpay
        return { paymentLink: data.transactionPaymentUrl };

    } catch (error) {
        throw error;
    }
}