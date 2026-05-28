import 'dotenv/config';
import { app } from './app.config.js'
import { web } from './web.config.js';
import { database } from './database.config.js'
import { store } from './store.config.js';
import { tpay } from './tpay.config.js'
import { smtp } from './smtp.config.js'

export default {
    app: app,
    web: web,
    database: database,
    smtp: smtp,
    store: store,
    tpay: tpay
}