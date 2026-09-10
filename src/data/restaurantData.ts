import { MenuCategory, MenuItem, GalleryItem, Reservation } from '../types';

/**
 * Resolves asset and image URLs relative to the current deployment base (e.g. GitHub Pages repo subpath)
 */
export function getImageUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  // Strip leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL || './';

  if (baseUrl.endsWith('/')) {
    return `${baseUrl}${cleanPath}`;
  }
  return `${baseUrl}/${cleanPath}`;
}

export const INITIAL_CATEGORIES: MenuCategory[] = [
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

export const INITIAL_ITEMS: MenuItem[] = [
  {
    id: 'item-pulao',
    categoryId: 'cat-pulao',
    name: 'Mutton Afghani Pulao',
    description: 'Fragrant long-grain aged basmati rice steamed with slow-cooked tender mutton shank, garnished with caramelized julienned carrots and plump Afghan raisins.',
    imageUrl: '/images/hero_afghani_pulao.jpg',
    isFeatured: true,
    isAvailable: true,
    tags: ['Must Try', 'Signature', 'Group Favorite'],
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z',
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
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z',
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
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z',
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
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z',
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
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z',
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
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z',
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
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z',
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
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z',
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
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z',
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
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z',
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
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z',
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    imageUrl: '/images/hero_afghani_pulao.jpg',
    caption: 'Mutton Afghani Pulao served in traditional platter',
    category: 'Pulao & Rice',
    aspectRatio: 'landscape',
    createdAt: '2026-09-01T00:00:00.000Z',
  },
  {
    id: 'gal-2',
    imageUrl: '/images/lamb_karahi.jpg',
    caption: 'Simmering Lamb Karahi with fresh ginger & chillies',
    category: 'Karahi',
    aspectRatio: 'landscape',
    createdAt: '2026-09-01T00:00:00.000Z',
  },
  {
    id: 'gal-3',
    imageUrl: '/images/chapli_kabab.jpg',
    caption: 'Crisp Peshawar-style Chapli Kababs on rustic board',
    category: 'Kababs',
    aspectRatio: 'square',
    createdAt: '2026-09-01T00:00:00.000Z',
  },
  {
    id: 'gal-4',
    imageUrl: '/images/grilled_ribs.jpg',
    caption: 'Charcoal Grilled Lamb Ribs with aromatic spiced rice',
    category: 'BBQ / Grills',
    aspectRatio: 'square',
    createdAt: '2026-09-01T00:00:00.000Z',
  },
  {
    id: 'gal-5',
    imageUrl: '/images/shinwari_dish.jpg',
    caption: 'Shinwari Lamb cooked in natural tallow & tomatoes',
    category: 'Shinwari',
    aspectRatio: 'landscape',
    createdAt: '2026-09-01T00:00:00.000Z',
  },
  {
    id: 'gal-6',
    imageUrl: '/images/restaurant_interior.jpg',
    caption: 'Warm ambient dining room in Johar Town, Lahore',
    category: 'Atmosphere',
    aspectRatio: 'landscape',
    createdAt: '2026-09-01T00:00:00.000Z',
  },
  {
    id: 'gal-7',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85',
    caption: 'Vibrant evening atmosphere and outdoor seating',
    category: 'Atmosphere',
    aspectRatio: 'landscape',
    createdAt: '2026-09-01T00:00:00.000Z',
  },
  {
    id: 'gal-8',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
    caption: 'Generous table setting designed for family and group feasts',
    category: 'Atmosphere',
    aspectRatio: 'square',
    createdAt: '2026-09-01T00:00:00.000Z',
  },
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-101',
    name: 'Hamza Malik',
    phone: '0300 9876543',
    date: '2026-09-12',
    time: '20:30',
    guests: 6,
    message: 'Family gathering for Shinwari and Afghani Pulao. Prefer outdoor seating if available.',
    status: 'Confirmed',
    createdAt: '2026-09-09T18:00:00.000Z',
  },
  {
    id: 'res-102',
    name: 'Dr. Ayesha Khan',
    phone: '0321 4455667',
    date: '2026-09-13',
    time: '21:00',
    guests: 4,
    message: 'Dinner with colleagues.',
    status: 'Pending',
    createdAt: '2026-09-09T19:00:00.000Z',
  },
];
