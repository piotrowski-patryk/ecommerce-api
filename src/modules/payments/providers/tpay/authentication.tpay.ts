import config from '#/config/index.js'
import { AppError } from '#/common/errors/index.js'
import crypto from 'node:crypto';

export type In = {
    merchantId: string;
    providerId: string;
    amount: number;
    paymentId: string;
    signature: string;
};

export function authentication({merchantId, providerId, amount, paymentId, signature}: In): void {

    const security = config.tpay.security;

    if (!security) {
        throw new AppError('INTERNAL_SERVER_ERROR');
    }

    const payload = `${merchantId}${providerId}${Number(amount).toFixed(2)}${paymentId}${security}`;
    const hash = crypto.createHash('md5').update(payload).digest('hex');

    const hashBuffer = Buffer.from(hash, 'utf-8');
    const signatureBuffer = Buffer.from(signature, 'utf-8');

    if (hashBuffer.length !== signatureBuffer.length || !crypto.timingSafeEqual(hashBuffer, signatureBuffer)) {
        throw new AppError('UNAUTHORIZED');
    }
}
