import { Router } from 'express';

import { router as ordersRouter } from './modules/orders/index.js';
import { router as paymentsRouter } from './modules/payments/index.js';
import { router as productsRouter } from '#/modules/products/index.js'
import { router as cartRouter} from './modules/cart/index.js';

const router = Router();

router.use('/orders', ordersRouter);
router.use('/payments', paymentsRouter);
router.use('/products', productsRouter);
router.use('/cart', cartRouter);

export default router;