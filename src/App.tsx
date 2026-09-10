/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { MenuCategory, MenuItem, GalleryItem } from './types';
import { INITIAL_CATEGORIES, INITIAL_ITEMS, INITIAL_GALLERY } from './data/restaurantData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { WhyUsSection } from './components/WhyUsSection';
import { MenuSection } from './components/MenuSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { AtmosphereSection } from './components/AtmosphereSection';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { ReservationSection } from './components/ReservationSection';
import { ContactLocationSection } from './components/ContactLocationSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [categories, setCategories] = useState<MenuCategory[]>(() => {
    const saved = localStorage.getItem('lamb_house_categories');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_CATEGORIES;
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('lamb_house_items');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_ITEMS;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('lamb_house_gallery');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_GALLERY;
  });

  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return sessionStorage.getItem('lamb_admin_token') || null;
  });

  const fetchData = async () => {
    try {
      const [catsRes, itemsRes, galRes] = await Promise.all([
        fetch('/api/menu/categories').catch(() => null),
        fetch('/api/menu/items').catch(() => null),
        fetch('/api/gallery').catch(() => null),
      ]);

      if (catsRes && catsRes.ok) {
        const catsData = await catsRes.json();
        if (Array.isArray(catsData) && catsData.length > 0) {
          setCategories(catsData);
          localStorage.setItem('lamb_house_categories', JSON.stringify(catsData));
        }
      }
      if (itemsRes && itemsRes.ok) {
        const itemsData = await itemsRes.json();
        if (Array.isArray(itemsData) && itemsData.length > 0) {
          setMenuItems(itemsData);
          localStorage.setItem('lamb_house_items', JSON.stringify(itemsData));
        }
      } else {
        const saved = localStorage.getItem('lamb_house_items');
        if (saved) {
          try {
            setMenuItems(JSON.parse(saved));
          } catch {}
        }
      }
      if (galRes && galRes.ok) {
        const galData = await galRes.json();
        if (Array.isArray(galData) && galData.length > 0) {
          setGalleryItems(galData);
          localStorage.setItem('lamb_house_gallery', JSON.stringify(galData));
        }
      }
    } catch {
      // In static deployment mode (e.g. GitHub Pages), default data and localStorage are used seamlessly
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddItem = (newItem: MenuItem) => {
    setMenuItems((prev) => {
      const updated = [newItem, ...prev.filter((i) => i.id !== newItem.id)];
      localStorage.setItem('lamb_house_items', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      localStorage.setItem('lamb_house_items', JSON.stringify(updated));
      return updated;
    });
  };

  const handleToggleAvailable = (item: MenuItem) => {
    setMenuItems((prev) => {
      const updated = prev.map((i) =>
        i.id === item.id ? { ...i, isAvailable: !i.isAvailable } : i
      );
      localStorage.setItem('lamb_house_items', JSON.stringify(updated));
      return updated;
    });
  };

  const handleOrderShowcase = () => {
    const karahi = menuItems.find((m) => m.name.toLowerCase().includes('karahi')) || {
      id: 'showcase-karahi',
      categoryId: 'cat-karahi',
      name: 'Lamb Karahi',
      description: 'Slow-braised succulent lamb simmered in cast iron wok with fresh tomatoes, ginger slivers and green chillies.',
      price: null,
      imageUrl: '/images/lamb_karahi.jpg',
      isFeatured: true,
      isAvailable: true,
      tags: ['Signature', 'Cast Iron', 'Freshly Prepared'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSelectedDish(karahi);
  };

  const scrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0a09] text-[#f2ede4] selection:bg-[#c88a38] selection:text-black font-sans antialiased">
      {/* Sticky Header Navigation */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} isAdminLoggedIn={!!adminToken} />

      {/* Hero Section */}
      <Hero onOpenReserve={scrollToReservation} />

      {/* About The Lamb House */}
      <AboutSection />

      {/* Why The Lamb House (4 Standard Cards) */}
      <WhyUsSection />

      {/* Unified Digital Menu: Features all dishes, signature specialties, categories, search, and Admin Add Dish */}
      <MenuSection
        categories={categories}
        items={menuItems}
        onSelectDish={(dish) => setSelectedDish(dish)}
        isAdminLoggedIn={!!adminToken}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        onToggleAvailable={handleToggleAvailable}
        onRefreshData={fetchData}
      />

      {/* Featured Food Showcase: Lamb Karahi */}
      <ShowcaseSection onOrderClick={handleOrderShowcase} />

      {/* Dining Experience & Atmosphere */}
      <AtmosphereSection />

      {/* Customer Reviews & Google Maps Score (3.9 / 5, 706+ reviews) */}
      <ReviewsSection />

      {/* Visual Gallery */}
      <GallerySection items={galleryItems} />

      {/* Reservation Form */}
      <ReservationSection />

      {/* Contact, Location & Google Maps */}
      <ContactLocationSection />

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Order / Dish Details Modal */}
      <OrderModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onGoToReservation={scrollToReservation}
      />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        categories={categories}
        items={menuItems}
        gallery={galleryItems}
        onRefreshData={fetchData}
        token={adminToken}
        setToken={setAdminToken}
      />
    </div>
  );
}
