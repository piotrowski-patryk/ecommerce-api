import express from 'express';
import cors from 'cors';
import router from './routes.js';

import './modules/orders/index.js';
import './modules/mailer/index.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', router);

export default app;