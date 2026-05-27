import { Request, Response, NextFunction } from 'express';
import { AppError } from '#/common/errors/index.js';
import { createOrder } from '../services/create-order.service.js';

type InClient = {
    name: string;
    email: string;
};

type InItem = {
    productId: string;
    quantity: number;
};

type In = {
    client: InClient;
    items: InItem[];
};

type Out = {
    success: boolean;
    data: {
        paymentUrl: string;
    };
}

export async function initOrder(req: Request, res: Response, next: NextFunction) {

    const { client, items } = req.body as In;
    
    if (!client?.name || !client?.email ||!Array.isArray(items) || items.length === 0) {
        throw new AppError('INVALID_LOGIC_PARAMETERS', {
            expected: {
                client: { name: 'string', email: 'string' },
                items: 'non-empty array'
            },
            received: { client, items }
        });
    }

    try {
        const result = await createOrder({ client, items });

        res.status(201).json({
            success: true,
            data: result
        } as Out);

    } catch (error: any) {
        next(error);
    }
}