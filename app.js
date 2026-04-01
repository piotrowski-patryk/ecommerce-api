// Copyright (c) 2026 Patryk Piotrowski. All rights reserved.

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import routes from './src/routes/api.routes.js';
import pool from './src/config/database.config.js';
import { errorRes } from './src/middlewares/error.middleware.js';
import { ansi } from './src/utils/ansi.util.js';

const app = express();
const ENV = (process.env.NODE_ENV || 'development').toLowerCase();
const PORT = process.env.PORT || 3000;
const URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;

const { G, B, R, S, _ } = ansi;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);
app.use(errorRes);

// Server Startup & DB Check
app.listen(PORT, async () => {
    console.log(`\n${G}[server] ${S}running in ${B}${ENV}${S} mode${_}`);
    console.log(`${G}[server] ${S}listening at ${B}${URL}${_}`);

    try {
        await pool.query('SELECT 1');
        console.log(`${G}[database] ${S}connection established${_}\n`);
    } catch (err) {
        console.log(`${R}[database] connection failed (${err.message})${_}\n`);
    }
});

// Graceful Shutdown
process.on('SIGINT', async () => {
    try {
        await pool.end();
        console.log(`\r${R}[shutdown] ${S}database connections closed${_}`);
        console.log(`${R}[shutdown] ${S}process terminated${_}\n`);
    } finally {
        process.exit(0);
    }
});