// controllers/productController.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '#/common/errors/index.js';
import * as service from '../services/get-product.service.js';

export async function getProduct(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  if (!id) {
    return next(new AppError('INVALID_LOGIC_PARAMETERS', {
      expected: { id: 'string' },
        received: { id }
      }));
    }

  try {
    const product = await service.getById(id);

    res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {
     next(error);
  }
}