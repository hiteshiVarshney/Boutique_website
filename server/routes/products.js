import { Router } from 'express';
import { Product } from '../models/Product.js';

const router = Router();

// GET /api/products — all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().sort({ id: 1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:category — products filtered by category
router.get('/:category', async (req, res, next) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category }).sort({ id: 1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

export default router;
