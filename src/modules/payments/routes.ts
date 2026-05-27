import { Router } from 'express';

import { webhookTpay } from './controllers/webhook-tpay.controller.js';
import { tpayAuth } from './middlewares/tpay-auth.middleware.js';

const router = Router();

router.post('/webhook-tpay', tpayAuth, webhookTpay);

export default router;