import { Router } from 'express';
import { Category } from '../models/Category.js';

const router = Router();

// GET /api/categories — all categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

export default router;
