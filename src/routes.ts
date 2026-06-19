import { Router } from 'express';

import orders from './modules/orders/index.js';
import payments from './modules/payments/index.js';
import products from './modules/products/index.js';

const router = Router();

router.use('/orders', orders.router);
router.use('/payments', payments.router);
router.use('/products', products.router);

export default router;