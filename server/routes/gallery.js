import { Router } from 'express';
import { GalleryImage } from '../models/GalleryImage.js';

const router = Router();

// GET /api/gallery — all gallery images
router.get('/', async (req, res, next) => {
  try {
    const images = await GalleryImage.find();
    res.json(images);
  } catch (err) {
    next(err);
  }
});

export default router;
