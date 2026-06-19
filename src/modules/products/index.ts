import router from './routes.js';
import { getProducts } from "./services/get-products.service.js";

export default {
    router,
    get: getProducts,
}