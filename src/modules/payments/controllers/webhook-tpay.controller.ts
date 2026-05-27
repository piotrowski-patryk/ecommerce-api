import { Request, Response, NextFunction } from 'express';
import { updatePayment } from '../services/update-payment.service.js';

type In = {
    tr_crc: string;
    tr_paid: string;
    tr_status: boolean;
}

export async function webhookTpay(req: Request, res: Response, next: NextFunction) {

    const { tr_crc, tr_paid, tr_status } = req.body as In;

    if ( !tr_crc || !tr_paid || !tr_status ) {
        return res.status(200).send('TRUE');
    }

    try {
        await updatePayment({
            id: tr_crc,
            paid: Number(tr_paid),
            cancelled: !tr_status
        });

        return res.status(200).send('TRUE');

    } catch (error: any) {
        if (error.status < 500) {
            res.status(200).send('TRUE');
        }

        next(error);
    }
}