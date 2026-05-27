import { Router } from 'express';
import { initOrder } from './controllers/init-order.controller.js'

const router = Router();

router.post('/', initOrder);

export default router;