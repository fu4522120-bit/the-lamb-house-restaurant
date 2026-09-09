import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db';

const app = express();
const PORT = 3000;
const ADMIN_TOKEN = 'lamb-house-secret-token-786';

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Admin auth middleware
function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
    return;
  }
  const token = authHeader.split(' ')[1];
  if (token !== ADMIN_TOKEN) {
    res.status(403).json({ error: 'Forbidden: Invalid token' });
    return;
  }
  next();
}

// ==========================================
// API ROUTES
// ==========================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    restaurant: 'The Lamb House',
    location: 'Johar Town, Lahore',
    timestamp: new Date().toISOString(),
  });
});

// Admin Auth
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  // Default credentials for manager/admin:
  if ((username === 'admin' || username === 'manager') && (password === 'lambhouse2026' || password === 'admin123' || password === 'thehouse786')) {
    res.json({
      success: true,
      token: ADMIN_TOKEN,
      user: { username, role: 'administrator', name: 'Restaurant Manager' },
    });
  } else {
    res.status(401).json({ error: 'Invalid username or password. (Hint: username "admin", password "lambhouse2026")' });
  }
});

app.get('/api/admin/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.split(' ')[1] === ADMIN_TOKEN) {
    res.json({ valid: true, user: { username: 'admin', role: 'administrator' } });
  } else {
    res.status(401).json({ valid: false });
  }
});

// Menu
app.get('/api/menu', (req, res) => {
  try {
    const categories = db.getCategories();
    const items = db.getItems();
    res.json({ categories, items });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

app.get('/api/menu/categories', (req, res) => {
  try {
    res.json(db.getCategories());
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/menu/items', (req, res) => {
  try {
    res.json(db.getItems());
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

app.post('/api/menu/items', requireAdmin, (req, res) => {
  try {
    const { categoryId, name, description, price, imageUrl, isFeatured, isAvailable, tags } = req.body;
    if (!name || !categoryId || !description) {
      res.status(400).json({ error: 'Name, Category, and Description are required' });
      return;
    }
    const item = db.addItem({
      categoryId,
      name: name.trim(),
      description: description.trim(),
      price: price ? price.trim() : null,
      imageUrl: imageUrl || '/images/hero_afghani_pulao.jpg',
      isFeatured: Boolean(isFeatured),
      isAvailable: isAvailable !== false,
      tags: Array.isArray(tags) ? tags : [],
    });
    res.status(201).json(item);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create menu item' });
  }
});

app.put('/api/menu/items/:id', requireAdmin, (req, res) => {
  try {
    const updated = db.updateItem(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

app.delete('/api/menu/items/:id', requireAdmin, (req, res) => {
  try {
    const success = db.deleteItem(req.params.id);
    if (!success) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

app.patch('/api/menu/items/:id/toggle-available', requireAdmin, (req, res) => {
  try {
    const items = db.getItems();
    const item = items.find(i => i.id === req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    const updated = db.updateItem(item.id, { isAvailable: !item.isAvailable });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to toggle availability' });
  }
});

app.patch('/api/menu/items/:id/toggle-featured', requireAdmin, (req, res) => {
  try {
    const items = db.getItems();
    const item = items.find(i => i.id === req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    const updated = db.updateItem(item.id, { isFeatured: !item.isFeatured });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to toggle featured status' });
  }
});

app.post('/api/menu/categories', requireAdmin, (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: 'Category name is required' });
      return;
    }
    const cat = db.addCategory(name.trim());
    res.status(201).json(cat);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

app.delete('/api/menu/categories/:id', requireAdmin, (req, res) => {
  try {
    const success = db.deleteCategory(req.params.id);
    if (!success) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// Reservations
app.get('/api/reservations', requireAdmin, (req, res) => {
  try {
    const list = db.getReservations();
    res.json(list);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});

app.post('/api/reservations', (req, res) => {
  try {
    const { name, phone, date, time, guests, message } = req.body;

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      res.status(400).json({ error: 'Please provide a valid full name (minimum 2 characters).' });
      return;
    }
    if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
      res.status(400).json({ error: 'Please provide a valid contact phone number (e.g. 0321 8440321).' });
      return;
    }
    if (!date) {
      res.status(400).json({ error: 'Please select a date for your visit.' });
      return;
    }
    if (!time) {
      res.status(400).json({ error: 'Please specify your expected arrival time.' });
      return;
    }
    const numGuests = Number(guests);
    if (isNaN(numGuests) || numGuests < 1 || numGuests > 50) {
      res.status(400).json({ error: 'Please specify number of guests between 1 and 50.' });
      return;
    }

    const reservation = db.addReservation({
      name: name.trim(),
      phone: phone.trim(),
      date,
      time,
      guests: numGuests,
      message: message ? message.trim() : undefined,
    });

    res.status(201).json({
      success: true,
      reservation,
      notice: 'Your reservation request has been received. The restaurant will contact you to confirm availability.',
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Server error while submitting reservation.' });
  }
});

app.patch('/api/reservations/:id/status', requireAdmin, (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: 'Invalid reservation status' });
      return;
    }
    const updated = db.updateReservationStatus(req.params.id, status);
    if (!updated) {
      res.status(404).json({ error: 'Reservation not found' });
      return;
    }
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update reservation status' });
  }
});

// Contact Messages
app.get('/api/contact', requireAdmin, (req, res) => {
  try {
    const messages = db.getContactMessages();
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch contact messages' });
  }
});

app.post('/api/contact', (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || name.trim().length < 2) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }
    if (!phone || phone.trim().length < 7) {
      res.status(400).json({ error: 'Valid phone number is required' });
      return;
    }
    if (!message || message.trim().length < 5) {
      res.status(400).json({ error: 'Message must be at least 5 characters' });
      return;
    }

    const saved = db.addContactMessage({
      name: name.trim(),
      email: email ? email.trim() : '',
      phone: phone.trim(),
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting The Lamb House. Our team in Johar Town will get in touch shortly.',
      id: saved.id,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Gallery
app.get('/api/gallery', (req, res) => {
  try {
    const gallery = db.getGallery();
    res.json(gallery);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

app.post('/api/gallery', requireAdmin, (req, res) => {
  try {
    const { imageUrl, caption, category, aspectRatio } = req.body;
    if (!imageUrl || !caption) {
      res.status(400).json({ error: 'Image URL and caption are required' });
      return;
    }
    const item = db.addGalleryItem({
      imageUrl,
      caption: caption.trim(),
      category: category || 'Food & Dining',
      aspectRatio: aspectRatio || 'landscape',
    });
    res.status(201).json(item);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to add gallery item' });
  }
});

app.delete('/api/gallery/:id', requireAdmin, (req, res) => {
  try {
    const success = db.deleteGalleryItem(req.params.id);
    if (!success) {
      res.status(404).json({ error: 'Gallery item not found' });
      return;
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to delete gallery item' });
  }
});

// Serve public static images explicitly if requested
app.use('/images', express.static(path.resolve(process.cwd(), 'public/images')));

// ==========================================
// VITE OR STATIC SERVING
// ==========================================
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[The Lamb House Server] Running on http://0.0.0.0:${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
});
