import { Router } from 'express';
import { Testimonial } from '../models/Testimonial.js';

const router = Router();

// GET /api/testimonials — all testimonials
router.get('/', async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    next(err);
  }
});

export default router;
