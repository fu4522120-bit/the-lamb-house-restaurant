export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price?: string | null;
  imageUrl: string;
  isFeatured: boolean;
  isAvailable: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export type ReservationStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  message?: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  category: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  createdAt: string;
}

export interface RestaurantReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  snippet?: string;
  source: string;
}
