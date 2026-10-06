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

// POST /api/products — create a new product
router.post('/', async (req, res, next) => {
  try {
    const { name, category, price, image, tag } = req.body;

    if (!name || !category || price === undefined || !image) {
      return res.status(400).json({ error: 'name, category, price, and image are required' });
    }

    const lastProduct = await Product.findOne().sort({ id: -1 });
    const nextId = lastProduct ? lastProduct.id + 1 : 1;

    const product = await Product.create({
      id: nextId,
      name,
      category,
      price: Number(price),
      image,
      tag: tag || '',
    });

    res.status(201).json(product);
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
