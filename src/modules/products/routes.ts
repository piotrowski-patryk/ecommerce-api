import { Router } from 'express';
import { getProduct } from './controllers/get-product.controller.js';

const router = Router();

router.get('/:id', getProduct);

export default router;