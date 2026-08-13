import { Router } from 'express'

import { get } from './controllers/cart.controller.js'
import { add, update, remove } from './controllers/cart-item.controller.js'

const router = Router()

router.get('/', get)

router.post('/items', add)
router.patch('/items/:itemId', update)
router.delete('/items/:itemId', remove)

export default router