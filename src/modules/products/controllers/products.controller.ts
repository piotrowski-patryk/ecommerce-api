import type { Request, Response } from 'express'

import { AppError } from '#/common/errors/index.js'

import { getProduct as getProductService } from '../services/get-product.service.js'
import { getProducts as getProductsService } from '../services/get-products.service.js'

export async function getProduct(
  req: Request,
  res: Response,
) {
  const { slug } = req.params

  if (typeof slug !== 'string') {
    throw new AppError('BAD_REQUEST')
  }

  const product = await getProductService({
    where: {
      variantSlug: slug,
    },
    include: {
      prices: req.query.prices === 'true',
      images: req.query.images === 'true',
      attributes: req.query.attributes === 'true',
    },
  })

  if (!product) {
    throw new AppError('NOT_FOUND')
  }

  return res.status(200).json({
    success: true,
    data: product,
  })
}

export async function getProducts(
  req: Request,
  res: Response,
) {
  const products = await getProductsService({
    include: {
      prices: req.query.prices === 'true',
      images: req.query.images === 'true',
      attributes: req.query.attributes === 'true',
    },
  })

  return res.status(200).json({
    success: true,
    data: products,
  })
}
