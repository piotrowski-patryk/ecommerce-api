import { newError } from '../utils/newError.util.js';
import { regex } from '../utils/regex.util.js';

// Middleware do walidacji pola email - musi być poprawnym adresem e-mail
export function email(req, res, next) {
    const value = req.body.email;

    if (!value) return next(newError('Email field is missing or empty', 'BAD_REQUEST'));
    if (!regex.email.test(value)) return next(newError('Email format is invalid', 'VALIDATION_ERROR'));

    next();
}

// Middleware do walidacji pola name - musi być stringiem, min 3 znaki, bez specjalnych znaków
export function name(req, res, next) {
    const value = req.body.name?.trim();

    if (!value) return next(newError('Name field is missing or empty', 'BAD_REQUEST'));
    if (value.length < 3) return next(newError('Name is too short (min 3)', 'VALIDATION_ERROR'));
    if (!regex.name.test(value)) return next(newError('Name contains forbidden characters', 'VALIDATION_ERROR'));

    next();
}

// Middleware do walidacji pola items - musi być tablicą z co najmniej jedną pozycją
export function itemsArray(req, res, next) {
    const value = req.body.items;

    if (!value) return next(newError('Items field is missing', 'BAD_REQUEST'));
    if (!Array.isArray(value)) return next(newError('Items must be an array', 'VALIDATION_ERROR'));
    if (value.length === 0) return next(newError('Items array cannot be empty', 'VALIDATION_ERROR'));

    next();
}