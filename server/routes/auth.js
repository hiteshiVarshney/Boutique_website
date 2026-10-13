import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
};

// POST /api/auth/login — authenticate admin, set HttpOnly cookie
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const adminUser = process.env.ADMIN_USERNAME;
    const adminHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminUser || !adminHash) {
      return res.status(500).json({ error: 'Admin account is not configured on the server' });
    }

    if (username !== adminUser) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const matched = await bcrypt.compare(password, adminHash);
    if (!matched) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { username: adminUser, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
    );

    res.cookie('admin_token', token, cookieOptions);
    res.json({ authenticated: true, username: adminUser });
  } catch (err) {
    next(err);
  }
});

// GET /api/auth/session — check if current cookie is valid
router.get('/session', (req, res) => {
  const token = req.cookies?.admin_token;

  if (!token) {
    return res.json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ authenticated: true, username: decoded.username });
  } catch {
    res.clearCookie('admin_token', cookieOptions);
    res.json({ authenticated: false });
  }
});

// POST /api/auth/logout — clear the auth cookie
router.post('/logout', (req, res) => {
  res.clearCookie('admin_token', cookieOptions);
  res.json({ success: true });
});

export default router;
