/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { MenuCategory, MenuItem, GalleryItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SignatureDishes } from './components/SignatureDishes';
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
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return sessionStorage.getItem('lamb_admin_token') || null;
  });

  const fetchData = async () => {
    try {
      const [catsRes, itemsRes, galRes] = await Promise.all([
        fetch('/api/menu/categories'),
        fetch('/api/menu/items'),
        fetch('/api/gallery'),
      ]);

      if (catsRes.ok) {
        const catsData = await catsRes.json();
        setCategories(catsData);
      }
      if (itemsRes.ok) {
        const itemsData = await itemsRes.json();
        setMenuItems(itemsData);
      }
      if (galRes.ok) {
        const galData = await galRes.json();
        setGalleryItems(galData);
      }
    } catch (err) {
      console.error('Error fetching initial restaurant data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

      {/* Signature Dishes: Mutton Afghani Pulao, Lamb Karahi, Chapli Kabab, Grilled Ribs, Shinwari */}
      <SignatureDishes
        items={menuItems}
        onSelectDish={(dish) => setSelectedDish(dish)}
      />

      {/* Why The Lamb House (4 Standard Cards) */}
      <WhyUsSection />

      {/* Digital Menu Categories & Search */}
      <MenuSection
        categories={categories}
        items={menuItems}
        onSelectDish={(dish) => setSelectedDish(dish)}
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
