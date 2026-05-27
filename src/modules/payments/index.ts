import router from './routes.js';
import { initPayment } from './services/init-payment.service.js';

export default {
    router,
    init: initPayment
}