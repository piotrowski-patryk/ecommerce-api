import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import router from './routes.js'
import config from './config/index.js'
import { errorHandler } from './common/middlewares/error.middleware.js'

import './modules/orders/index.js'
import './modules/mailer/index.js'

const app = express()

// CORS
app.use(
  cors({
    origin: config.web.url,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

// Body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookies
app.use(cookieParser())

// Routes
app.use('/api', router)

app.use(errorHandler)

export default app
