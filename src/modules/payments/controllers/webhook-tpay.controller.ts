import type { NextFunction, Request, Response } from 'express'

import { AppError } from '#/common/errors/index.js'

import { updatePayment } from '../services/update-payment.service.js'

type In = {
    tr_crc: string;
    tr_paid: string;
    tr_status: string | boolean;
}

export async function webhookTpay(req: Request, res: Response, next: NextFunction) {

    const { tr_crc, tr_paid, tr_status } = req.body as In;

    if (!tr_crc || !tr_paid || tr_status === undefined || !Number.isFinite(Number(tr_paid))) {
        return res.status(200).send('TRUE')
    }

    try {
        await updatePayment({
            id: tr_crc,
            paid: Number(tr_paid),
            cancelled: tr_status !== true && tr_status !== 'TRUE',
        })

        return res.status(200).send('TRUE')

    } catch (error: unknown) {
        if (error instanceof AppError && error.status < 500) {
            return res.status(200).send('TRUE')
        }

        next(error)
    }
}
