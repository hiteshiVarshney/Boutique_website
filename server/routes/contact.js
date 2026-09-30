import { Router } from 'express';
import { ContactMessage } from '../models/ContactMessage.js';

const router = Router();

// POST /api/contact — save a contact form submission
router.post('/', async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are all required.' });
    }

    const entry = await ContactMessage.create({ name, email, message });
    res.status(201).json({ success: true, id: entry._id });
  } catch (err) {
    next(err);
  }
});

export default router;
