
import type { NextFunction, Request, Response } from 'express'

import { AppError } from '#/common/errors/index.js'

import tpay from '../providers/tpay/index.js'

type In = {
    id: string;
    tr_id: string;
    tr_amount: string;
    tr_crc: string;
    md5sum: string;
}

export function tpayAuth(req: Request, res: Response, next: NextFunction) {

    const { id, tr_id, tr_amount, tr_crc, md5sum } = req.body as In;

    if (!id || !tr_id || !tr_amount || !tr_crc || !md5sum || !Number.isFinite(Number(tr_amount))) {
        return res.status(200).send('TRUE')
    }

    try {
        tpay.auth({
            merchantId: id,
            providerId: tr_id,
            amount: Number(tr_amount),
            paymentId: tr_crc,
            signature: md5sum
        });

        next()

    } catch (error: unknown) {
        if (error instanceof AppError && error.status < 500) {
            return res.status(200).send('TRUE')
        }

        next(error)
    }
}
