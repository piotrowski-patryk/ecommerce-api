import { Router } from 'express';

import orders from './modules/orders/index.js';
import payments from './modules/payments/index.js';

const router = Router();

router.use('/orders', orders.router);
router.use('/payments', payments.router);

export default router;