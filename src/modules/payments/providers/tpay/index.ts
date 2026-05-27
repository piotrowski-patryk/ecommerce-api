import { createTransaction } from './create-transaction.tpay.js';
import { authentication } from './authentication.tpay.js';

export default {
    name: 'tpay',
    create: createTransaction,
    auth: authentication
}