import router from './routes.js';
import './listeners/index.js';
import { getOrder } from './services/get-order.service.js';

export default {
    router,
    get: getOrder
}