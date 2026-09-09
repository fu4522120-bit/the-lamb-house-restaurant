import fs from 'fs';
import path from 'path';
import { MenuCategory, MenuItem, Reservation, ContactMessage, GalleryItem } from '../src/types';

interface DatabaseSchema {
  categories: MenuCategory[];
  items: MenuItem[];
  reservations: Reservation[];
  contactMessages: ContactMessage[];
  gallery: GalleryItem[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const INITIAL_CATEGORIES: MenuCategory[] = [
  { id: 'cat-signature', name: 'Signature Meat', slug: 'signature-meat', order: 1 },
  { id: 'cat-karahi', name: 'Karahi', slug: 'karahi', order: 2 },
  { id: 'cat-pulao', name: 'Pulao / Rice', slug: 'pulao-rice', order: 3 },
  { id: 'cat-bbq', name: 'BBQ / Grills', slug: 'bbq-grills', order: 4 },
  { id: 'cat-kababs', name: 'Kababs', slug: 'kababs', order: 5 },
  { id: 'cat-shinwari', name: 'Shinwari', slug: 'shinwari', order: 6 },
  { id: 'cat-starters', name: 'Starters', slug: 'starters', order: 7 },
  { id: 'cat-sides', name: 'Sides', slug: 'sides', order: 8 },
  { id: 'cat-drinks', name: 'Drinks', slug: 'drinks', order: 9 },
];

const INITIAL_ITEMS: MenuItem[] = [
  {
    id: 'item-pulao',
    categoryId: 'cat-pulao',
    name: 'Mutton Afghani Pulao',
    description: 'Fragrant long-grain aged basmati rice steamed with slow-cooked tender mutton shank, garnished with caramelized julienned carrots and plump Afghan raisins.',
    imageUrl: '/images/hero_afghani_pulao.jpg',
    isFeatured: true,
    isAvailable: true,
    tags: ['Must Try', 'Signature', 'Group Favorite'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-karahi',
    categoryId: 'cat-karahi',
    name: 'Lamb Karahi',
    description: 'Fresh cuts of succulent mutton cooked to order in an iron karahi with ripe juicy tomatoes, ginger juliennes, fresh coriander, and crisp green chillies.',
    imageUrl: '/images/lamb_karahi.jpg',
    isFeatured: true,
    isAvailable: true,
    tags: ['Signature', 'Cooked in Desi Ghee', 'Family Sharing'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-chapli',
    categoryId: 'cat-kababs',
    name: 'Chapli Kabab',
    description: 'Peshawari-style handmade minced lamb patties infused with pomegranate seeds, roasted coriander, crushed chillies, and fresh tomato rounds, pan-crisped to juicy perfection.',
    imageUrl: '/images/chapli_kabab.jpg',
    isFeatured: true,
    isAvailable: true,
    tags: ['Signature', 'Charred Edges', 'Juicy'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-ribs',
    categoryId: 'cat-bbq',
    name: 'Grilled Ribs with Rice',
    description: 'Prime lamb ribs seasoned with mountain rock salt and slow-grilled over charcoal embers, served over fragrant herb-spiced rice with grilled vegetables.',
    imageUrl: '/images/grilled_ribs.jpg',
    isFeatured: true,
    isAvailable: true,
    tags: ['Signature', 'Charcoal Grilled', 'Hearty'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-shinwari',
    categoryId: 'cat-shinwari',
    name: 'Shinwari Lamb',
    description: 'Authentic Khyber-pass style lamb simmered exclusively in its natural fats with salt, fresh tomatoes, and fiery green chillies. Minimal spices, maximum meat flavour.',
    imageUrl: '/images/shinwari_dish.jpg',
    isFeatured: true,
    isAvailable: true,
    tags: ['Signature', 'Pure Flavours', 'Traditional'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-tikka',
    categoryId: 'cat-bbq',
    name: 'Mutton Tikka Boti',
    description: 'Tender boneless mutton cubes marinated with crushed spices and grilled on skewers over fiery charcoal.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    isFeatured: false,
    isAvailable: true,
    tags: ['Charcoal Smoked', 'Mutton'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-namkeen',
    categoryId: 'cat-shinwari',
    name: 'Namkeen Dum Pukht Gosht',
    description: 'Slow-steamed sealed clay pot lamb with whole black peppercorns and pink Himalayan salt until it melts at the touch.',
    imageUrl: '/images/shinwari_dish.jpg',
    isFeatured: false,
    isAvailable: true,
    tags: ['Clay Pot', 'Tender'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-starters',
    categoryId: 'cat-starters',
    name: 'Crispy Meat Appetizer Basket',
    description: 'Spiced minced lamb crispies and savoury bites served with fresh mint yogurt and tangy tamarind dip.',
    imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=1200&q=85',
    isFeatured: false,
    isAvailable: true,
    tags: ['Starter', 'Sharing'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-naan',
    categoryId: 'cat-sides',
    name: 'Tandoori Roghani & Garlic Naan',
    description: 'Freshly slapped clay-oven leavened bread brushed with warm clarified butter, sesame seeds, or roasted garlic.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
    isFeatured: false,
    isAvailable: true,
    tags: ['Tandoor Fresh', 'Hot'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-kahwa',
    categoryId: 'cat-drinks',
    name: 'Traditional Peshawari Kahwa',
    description: 'Aromatic green tea brewed with crushed green cardamom pods, saffron threads, and slivered almonds.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    isFeatured: false,
    isAvailable: true,
    tags: ['Hot Drink', 'Digestive'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-lassi',
    categoryId: 'cat-drinks',
    name: 'Fresh Mint Cooler & Creamy Lassi',
    description: 'Refreshing hand-whipped yogurt drink and zesty crushed mint lemonades to complement grilled meats.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85',
    isFeatured: false,
    isAvailable: true,
    tags: ['Cold Beverage', 'Refreshing'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    imageUrl: '/images/hero_afghani_pulao.jpg',
    caption: 'Mutton Afghani Pulao served in traditional platter',
    category: 'Pulao & Rice',
    aspectRatio: 'landscape',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'gal-2',
    imageUrl: '/images/lamb_karahi.jpg',
    caption: 'Simmering Lamb Karahi with fresh ginger & chillies',
    category: 'Karahi',
    aspectRatio: 'landscape',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'gal-3',
    imageUrl: '/images/chapli_kabab.jpg',
    caption: 'Crisp Peshawar-style Chapli Kababs on rustic board',
    category: 'Kababs',
    aspectRatio: 'square',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'gal-4',
    imageUrl: '/images/grilled_ribs.jpg',
    caption: 'Charcoal Grilled Lamb Ribs with aromatic spiced rice',
    category: 'BBQ / Grills',
    aspectRatio: 'square',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'gal-5',
    imageUrl: '/images/shinwari_dish.jpg',
    caption: 'Shinwari Lamb cooked in natural tallow & tomatoes',
    category: 'Shinwari',
    aspectRatio: 'landscape',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'gal-6',
    imageUrl: '/images/restaurant_interior.jpg',
    caption: 'Warm ambient dining room in Johar Town, Lahore',
    category: 'Atmosphere',
    aspectRatio: 'landscape',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'gal-7',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85',
    caption: 'Vibrant evening atmosphere and outdoor seating',
    category: 'Atmosphere',
    aspectRatio: 'landscape',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'gal-8',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
    caption: 'Generous table setting designed for family and group feasts',
    category: 'Atmosphere',
    aspectRatio: 'square',
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-101',
    name: 'Hamza Malik',
    phone: '0300 9876543',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '20:30',
    guests: 6,
    message: 'Family gathering for Shinwari and Afghani Pulao. Prefer outdoor seating if available.',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'res-102',
    name: 'Dr. Ayesha Khan',
    phone: '0321 4455667',
    date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    time: '21:00',
    guests: 4,
    message: 'Dinner with colleagues.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

const INITIAL_CONTACTS: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Bilal Tariq',
    email: 'bilal.t@gmail.com',
    phone: '0333 1234567',
    message: 'Do you offer whole lamb dumba roasts for private family catering in Johar Town?',
    createdAt: new Date(Date.now() - 18000000).toISOString(),
  },
];

class Database {
  private data: DatabaseSchema;

  constructor() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
      } catch (err) {
        console.error('Error reading db.json, reinitializing...', err);
        this.data = this.getDefaults();
        this.save();
      }
    } else {
      this.data = this.getDefaults();
      this.save();
    }
  }

  private getDefaults(): DatabaseSchema {
    return {
      categories: INITIAL_CATEGORIES,
      items: INITIAL_ITEMS,
      reservations: INITIAL_RESERVATIONS,
      contactMessages: INITIAL_CONTACTS,
      gallery: INITIAL_GALLERY,
    };
  }

  private save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write db.json:', err);
    }
  }

  // Categories
  getCategories(): MenuCategory[] {
    return [...this.data.categories].sort((a, b) => a.order - b.order);
  }

  addCategory(name: string): MenuCategory {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newCat: MenuCategory = {
      id: `cat-${Date.now()}`,
      name,
      slug,
      order: this.data.categories.length + 1,
    };
    this.data.categories.push(newCat);
    this.save();
    return newCat;
  }

  deleteCategory(id: string): boolean {
    const idx = this.data.categories.findIndex(c => c.id === id);
    if (idx !== -1) {
      this.data.categories.splice(idx, 1);
      this.save();
      return true;
    }
    return false;
  }

  // Items
  getItems(): MenuItem[] {
    return this.data.items;
  }

  addItem(item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>): MenuItem {
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.items.push(newItem);
    this.save();
    return newItem;
  }

  updateItem(id: string, updates: Partial<MenuItem>): MenuItem | null {
    const item = this.data.items.find(i => i.id === id);
    if (!item) return null;
    Object.assign(item, updates, { updatedAt: new Date().toISOString() });
    this.save();
    return item;
  }

  deleteItem(id: string): boolean {
    const idx = this.data.items.findIndex(i => i.id === id);
    if (idx !== -1) {
      this.data.items.splice(idx, 1);
      this.save();
      return true;
    }
    return false;
  }

  // Reservations
  getReservations(): Reservation[] {
    return [...this.data.reservations].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  addReservation(res: Omit<Reservation, 'id' | 'status' | 'createdAt'>): Reservation {
    const newRes: Reservation = {
      ...res,
      id: `res-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    this.data.reservations.unshift(newRes);
    this.save();
    return newRes;
  }

  updateReservationStatus(id: string, status: Reservation['status']): Reservation | null {
    const res = this.data.reservations.find(r => r.id === id);
    if (!res) return null;
    res.status = status;
    this.save();
    return res;
  }

  // Contact
  getContactMessages(): ContactMessage[] {
    return [...this.data.contactMessages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  addContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt'>): ContactMessage {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.data.contactMessages.unshift(newMsg);
    this.save();
    return newMsg;
  }

  // Gallery
  getGallery(): GalleryItem[] {
    return this.data.gallery;
  }

  addGalleryItem(item: Omit<GalleryItem, 'id' | 'createdAt'>): GalleryItem {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.data.gallery.push(newItem);
    this.save();
    return newItem;
  }

  deleteGalleryItem(id: string): boolean {
    const idx = this.data.gallery.findIndex(g => g.id === id);
    if (idx !== -1) {
      this.data.gallery.splice(idx, 1);
      this.save();
      return true;
    }
    return false;
  }
}

export const db = new Database();
