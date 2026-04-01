import express from 'express';
import * as valid from '../middlewares/valid.middleware.js';
import * as order from '../controllers/order.controller.js';

const router = express.Router();

// POST /api/orders/create
router.post('/create', valid.email, valid.name, valid.itemsArray, order.create);
router.post('/tpay-webhook', order.tpayWebhook);

export default router;
