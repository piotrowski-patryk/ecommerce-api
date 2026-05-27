import { EventEmitter } from 'events';
import crypto from 'crypto';
import { AppError } from '../errors/app-error.js';
import { PAYMENT_EVENTS } from './payment.events.js';
import { ORDER_EVENTS } from './order.events.js';

const EVENTS = { ...PAYMENT_EVENTS, ...ORDER_EVENTS };
const bus = new EventEmitter();

export default {
    emit(type, payload) {
        if (!EVENTS[type]) {
            throw new AppError('INVALID_ARGUMENT');
        }

        const eventEnvelope = {
            id: crypto.randomUUID(),
            type: EVENTS[type],
            timestamp: new Date().toISOString(),
            payload: payload
        };

        bus.emit(EVENTS[type], eventEnvelope);
    },

    on(type, listener) {
        if (!EVENTS[type]) {
            throw new AppError('INVALID_ARGUMENT');
        }

        bus.on(EVENTS[type], listener);
    }
};