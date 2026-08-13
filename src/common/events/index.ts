import { EventEmitter } from 'node:events'
import crypto from 'node:crypto'
import { AppError } from '../errors/index.js'
import { PAYMENT_EVENTS } from './payment.events.js'
import { ORDER_EVENTS } from './order.events.js'

const EVENTS = { ...PAYMENT_EVENTS, ...ORDER_EVENTS } as const
type EventType = keyof typeof EVENTS
type EventPayload = Record<string, unknown>
type EventListener = (event: { id: string; type: EventType; timestamp: string; payload: EventPayload }) => void | Promise<void>

const bus = new EventEmitter()

bus.on('error', error => {
  console.error('Event listener failed:', error)
})

export default {
    emit(type: EventType, payload: EventPayload) {
        if (!(type in EVENTS)) {
            throw new AppError('BAD_REQUEST')
        }

        const eventEnvelope = {
            id: crypto.randomUUID(),
            type,
            timestamp: new Date().toISOString(),
            payload,
        }

        bus.emit(EVENTS[type], eventEnvelope)
    },

    on(type: EventType, listener: EventListener) {
        if (!(type in EVENTS)) {
            throw new AppError('BAD_REQUEST')
        }

        bus.on(EVENTS[type], event => {
          void Promise.resolve(listener(event)).catch(error => bus.emit('error', error))
        })
    },
}
