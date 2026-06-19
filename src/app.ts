import express from 'express';
import cors from 'cors';
import router from './routes.js';
import config from './config/index.js';

import './modules/orders/index.js';
import './modules/mailer/index.js';

const app = express();

// Middlewares
app.use(cors({
  origin: config.web.url,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

console.log(config.web.url);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', router);

export default app;