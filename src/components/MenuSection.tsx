import { useState, useMemo, FormEvent } from 'react';
import { MenuCategory, MenuItem } from '../types';
import {
  Search,
  Utensils,
  MessageSquare,
  AlertCircle,
  Plus,
  Sparkles,
  X,
  Check,
  Eye,
  EyeOff,
  Trash2,
  Lock,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { getImageUrl, DISH_IMAGE_PRESETS } from '../data/restaurantData';

interface MenuSectionProps {
  categories: MenuCategory[];
  items: MenuItem[];
  onSelectDish: (dish: MenuItem) => void;
  isAdminLoggedIn?: boolean;
  onOpenAdmin?: () => void;
  onAddItem?: (item: MenuItem) => void;
  onDeleteItem?: (id: string) => void;
  onToggleAvailable?: (item: MenuItem) => void;
  onRefreshData?: () => Promise<void>;
}

export function MenuSection({
  categories,
  items,
  onSelectDish,
  isAdminLoggedIn = false,
  onOpenAdmin,
  onAddItem,
  onDeleteItem,
  onToggleAvailable,
  onRefreshData,
}: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Add Dish Form state
  const [dishForm, setDishForm] = useState({
    name: '',
    categoryId: 'cat-karahi',
    description: '',
    price: '',
    imageUrl: '/images/luxury_lamb_feast.jpg',
    isFeatured: false,
    isAvailable: true,
    tagsString: 'Fresh, Signature',
  });

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'signature' && item.isFeatured) ||
        item.categoryId === selectedCategory ||
        (selectedCategory === 'cat-signature' && item.isFeatured);

      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  // Open add dish modal or require login
  const handleAddDishClick = () => {
    if (isAdminLoggedIn || sessionStorage.getItem('lamb_admin_token')) {
      setIsAddDishOpen(true);
    } else {
      setShowAdminLoginModal(true);
    }
  };

  const handleQuickAdminLogin = (e: FormEvent) => {
    e.preventDefault();
    setAdminLoginError('');
    if (
      adminPasswordInput === 'lambhouse2026' ||
      adminPasswordInput === 'admin123' ||
      adminPasswordInput === 'thehouse786'
    ) {
      const token = 'lamb-house-secret-token-786';
      sessionStorage.setItem('lamb_admin_token', token);
      setShowAdminLoginModal(false);
      setAdminPasswordInput('');
      setIsAddDishOpen(true);
      if (onRefreshData) onRefreshData();
    } else {
      setAdminLoginError('Incorrect password. (Default manager password is "lambhouse2026")');
    }
  };

  const handleSaveNewDish = async (e: FormEvent) => {
    e.preventDefault();
    if (!dishForm.name.trim() || !dishForm.description.trim()) {
      return;
    }

    const tags = dishForm.tagsString
      ? dishForm.tagsString.split(',').map((t) => t.trim()).filter(Boolean)
      : ['Fresh'];

    const newDish: MenuItem = {
      id: `dish-${Date.now()}`,
      categoryId: dishForm.categoryId || 'cat-karahi',
      name: dishForm.name.trim(),
      description: dishForm.description.trim(),
      price: dishForm.price.trim() || null,
      imageUrl: dishForm.imageUrl || '/images/luxury_lamb_feast.jpg',
      isFeatured: dishForm.isFeatured,
      isAvailable: dishForm.isAvailable,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Try backend API if token exists
    const token = sessionStorage.getItem('lamb_admin_token');
    if (token) {
      try {
        await fetch('/api/menu/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            categoryId: newDish.categoryId,
            name: newDish.name,
            description: newDish.description,
            price: newDish.price,
            imageUrl: newDish.imageUrl,
            isFeatured: newDish.isFeatured,
            isAvailable: newDish.isAvailable,
            tags: newDish.tags,
          }),
        }).catch(() => null);
      } catch {
        // Continue to offline persistence
      }
    }

    // Call parent handler
    if (onAddItem) {
      onAddItem(newDish);
    } else {
      // Local storage fallback
      const savedItems = JSON.parse(localStorage.getItem('lamb_house_items') || '[]');
      const updated = [newDish, ...savedItems];
      localStorage.setItem('lamb_house_items', JSON.stringify(updated));
      if (onRefreshData) onRefreshData();
    }

    // Success feedback
    setSuccessToast(`"${newDish.name}" has been added to the menu!`);
    setTimeout(() => setSuccessToast(null), 4000);

    // Reset form & close modal
    setDishForm({
      name: '',
      categoryId: 'cat-karahi',
      description: '',
      price: '',
      imageUrl: '/images/luxury_lamb_feast.jpg',
      isFeatured: false,
      isAvailable: true,
      tagsString: 'Fresh, Signature',
    });
    setIsAddDishOpen(false);

    // Switch category filter to show the new dish
    setSelectedCategory('all');
  };

  const handleQuickToggle = (item: MenuItem) => {
    if (onToggleAvailable) {
      onToggleAvailable(item);
    } else {
      const saved = JSON.parse(localStorage.getItem('lamb_house_items') || '[]');
      const updated = saved.map((i: MenuItem) =>
        i.id === item.id ? { ...i, isAvailable: !i.isAvailable } : i
      );
      localStorage.setItem('lamb_house_items', JSON.stringify(updated));
      if (onRefreshData) onRefreshData();
    }
  };

  const handleQuickDelete = (item: MenuItem) => {
    if (!confirm(`Are you sure you want to remove "${item.name}" from the menu?`)) return;
    if (onDeleteItem) {
      onDeleteItem(item.id);
    } else {
      const saved = JSON.parse(localStorage.getItem('lamb_house_items') || '[]');
      const updated = saved.filter((i: MenuItem) => i.id !== item.id);
      localStorage.setItem('lamb_house_items', JSON.stringify(updated));
      if (onRefreshData) onRefreshData();
    }
  };

  return (
    <section id="menu" className="py-24 bg-[#0d0c0b] border-b border-[#211e1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#c88a38] uppercase tracking-[0.2em]">
            <Utensils className="w-3.5 h-3.5" />
            <span>Complete House Menu</span>
          </div>
          <h2
            id="menu-heading"
            className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#f2ede4]"
          >
            Our Meat Selections &amp; Specialties
          </h2>
          <p className="mt-3 text-base text-[#ded5c5] font-light">
            All authentic Pakistani specialties, signature mutton karahis, Afghani pulao, and live grills prepared daily in Johar Town, Lahore.
          </p>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="mb-6 p-4 rounded-lg bg-[#142817] border border-emerald-600/60 text-emerald-200 text-sm flex items-center justify-between shadow-lg shadow-black">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{successToast}</span>
            </div>
            <button
              onClick={() => setSuccessToast(null)}
              className="text-emerald-400 hover:text-white text-xs font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Action Controls & Search Toolbar */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            {/* Search bar */}
            <div className="w-full sm:flex-1 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7e766a]" />
              <input
                type="text"
                id="menu-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search karahi, pulao, kabab, shinwari, ribs..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#141211] border border-[#2e2a26] text-sm text-[#f2ede4] placeholder-[#787063] focus:outline-none focus:border-[#c88a38] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#9c9383] hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Add New Dish Button for Admin */}
            <button
              onClick={handleAddDishClick}
              id="menu-add-dish-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#c88a38] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#db9a44] transition-all shadow-md shadow-[#c88a38]/20 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add New Dish</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div
            id="menu-category-tabs"
            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center"
          >
            {/* All items */}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#c88a38] text-black font-semibold shadow-md shadow-[#c88a38]/20'
                  : 'bg-[#151312] text-[#ded5c5] border border-[#2b2723] hover:border-[#c88a38]/60 hover:text-white'
              }`}
            >
              All Dishes ({items.length})
            </button>

            {/* Signature Specialties Tab */}
            <button
              onClick={() => setSelectedCategory('signature')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === 'signature'
                  ? 'bg-[#c88a38] text-black font-semibold shadow-md shadow-[#c88a38]/20'
                  : 'bg-[#151312] text-[#e0a656] border border-[#3d3328] hover:border-[#c88a38]/60 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Dishes</span>
            </button>

            {/* Individual categories */}
            {categories
              .filter((cat) => cat.id !== 'cat-signature')
              .map((cat) => (
                <button
                  key={cat.id}
                  id={`cat-tab-${cat.slug}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#c88a38] text-black font-semibold shadow-md shadow-[#c88a38]/20'
                      : 'bg-[#151312] text-[#ded5c5] border border-[#2b2723] hover:border-[#c88a38]/60 hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
          </div>
        </div>

        {/* Results Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 px-4 bg-[#121110] rounded-lg border border-[#262320]">
            <AlertCircle className="w-10 h-10 text-[#c88a38] mx-auto mb-3 opacity-80" />
            <h3 className="text-lg font-serif font-bold text-[#f2ede4]">No items found</h3>
            <p className="text-sm text-[#9e9587] mt-1">
              Try another search term or select a different category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded bg-[#1c1a18] text-[#c88a38] border border-[#332f2b] text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            id="menu-items-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                id={`menu-item-${item.id}`}
                className="group bg-[#121110] rounded-lg overflow-hidden border border-[#24211e] hover:border-[#c88a38]/60 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/70"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#1a1816]">
                  <img
                    src={getImageUrl(item.imageUrl)}
                    alt={`${item.name} at The Lamb House Johar Town`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-transparent opacity-80" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.isFeatured && (
                      <span className="px-2.5 py-1 rounded bg-[#c88a38] text-black text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md shadow-black/60">
                        <Sparkles className="w-3 h-3" />
                        Signature Dish
                      </span>
                    )}
                  </div>

                  {!item.isAvailable && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-red-950/90 text-red-300 text-[11px] font-semibold border border-red-800 shadow-md">
                      Sold Out
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="text-lg font-serif font-bold text-[#f2ede4] group-hover:text-[#c88a38] transition-colors">
                        {item.name}
                      </h3>
                      {item.price && (
                        <span className="text-sm font-semibold text-[#c88a38] shrink-0">
                          {item.price}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-[#a8a194] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#1b1917] text-[#8f887b] border border-[#282522]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-5 pt-3 border-t border-[#1e1c19]">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#6e675b] tracking-wider uppercase">
                        Fresh To Order
                      </span>
                      <button
                        onClick={() => onSelectDish(item)}
                        id={`order-enquire-btn-${item.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c88a38] hover:text-[#e0a250] transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Order / Inquire
                      </button>
                    </div>

                    {/* Admin quick controls if logged in */}
                    {(isAdminLoggedIn || sessionStorage.getItem('lamb_admin_token')) && (
                      <div className="mt-3 pt-2.5 border-t border-[#1f1d1a] flex items-center justify-between text-[11px] text-[#80776b]">
                        <button
                          onClick={() => handleQuickToggle(item)}
                          className="hover:text-white flex items-center gap-1 transition-colors"
                          title="Toggle availability"
                        >
                          {item.isAvailable ? (
                            <>
                              <EyeOff className="w-3 h-3 text-amber-500" />
                              <span>Mark Sold Out</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3 h-3 text-emerald-400" />
                              <span>Mark Available</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleQuickDelete(item)}
                          className="text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                          title="Remove dish"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL 1: Admin Quick Login if not logged in */}
      {showAdminLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#141211] border border-[#332f2b] rounded-xl p-6 shadow-2xl shadow-black">
            <button
              onClick={() => setShowAdminLoginModal(false)}
              className="absolute top-4 right-4 text-[#8a8275] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#24201c] border border-[#3a352f] flex items-center justify-center text-[#c88a38]">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#f2ede4]">
                  Manager / Admin Access
                </h3>
                <p className="text-xs text-[#8f877a]">
                  Enter password to add or manage dishes
                </p>
              </div>
            </div>

            <form onSubmit={handleQuickAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#ded5c5] uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="Enter manager password"
                  autoFocus
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#1a1816] border border-[#2e2a26] text-sm text-[#f2ede4] focus:outline-none focus:border-[#c88a38]"
                />
                <p className="text-[11px] text-[#736c61] mt-1.5">
                  Default manager password: <code className="text-[#c88a38]">lambhouse2026</code>
                </p>
              </div>

              {adminLoginError && (
                <div className="p-2.5 rounded bg-red-950/80 border border-red-800 text-red-200 text-xs">
                  {adminLoginError}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminLoginModal(false)}
                  className="px-4 py-2 rounded-lg bg-[#1c1a18] text-[#8e8678] hover:text-white text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#c88a38] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#db9a44] transition-colors"
                >
                  Unlock &amp; Add Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Add New Dish Modal */}
      {isAddDishOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#141211] border border-[#332f2b] rounded-xl p-6 sm:p-8 shadow-2xl shadow-black my-8">
            <button
              onClick={() => setIsAddDishOpen(false)}
              className="absolute top-4 right-4 text-[#8a8275] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#24211e]">
              <div className="w-10 h-10 rounded-lg bg-[#24201c] border border-[#3a352f] flex items-center justify-center text-[#c88a38]">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#f2ede4]">
                  Add New Dish to Menu
                </h3>
                <p className="text-xs text-[#8f877a]">
                  Add a new meat specialty, karahi, kabab, or side for The Lamb House Johar Town
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveNewDish} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Dish Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#ded5c5] uppercase tracking-wider mb-1.5">
                    Dish Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={dishForm.name}
                    onChange={(e) => setDishForm({ ...dishForm, name: e.target.value })}
                    placeholder="e.g. Peshawari Charsi Tikka"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1a18] border border-[#2e2a26] text-sm text-[#f2ede4] focus:outline-none focus:border-[#c88a38]"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-[#ded5c5] uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={dishForm.categoryId}
                    onChange={(e) => setDishForm({ ...dishForm, categoryId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1a18] border border-[#2e2a26] text-sm text-[#f2ede4] focus:outline-none focus:border-[#c88a38]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#ded5c5] uppercase tracking-wider mb-1.5">
                    Price (Optional)
                  </label>
                  <input
                    type="text"
                    value={dishForm.price}
                    onChange={(e) => setDishForm({ ...dishForm, price: e.target.value })}
                    placeholder="e.g. Rs. 2,450 or Market Price"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1a18] border border-[#2e2a26] text-sm text-[#f2ede4] focus:outline-none focus:border-[#c88a38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#ded5c5] uppercase tracking-wider mb-1.5">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={dishForm.tagsString}
                    onChange={(e) => setDishForm({ ...dishForm, tagsString: e.target.value })}
                    placeholder="e.g. Charcoal Grilled, Spicy, Must Try"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1a18] border border-[#2e2a26] text-sm text-[#f2ede4] focus:outline-none focus:border-[#c88a38]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-[#ded5c5] uppercase tracking-wider mb-1.5">
                  Appetizing Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={dishForm.description}
                  onChange={(e) => setDishForm({ ...dishForm, description: e.target.value })}
                  placeholder="Describe cuts of mutton/lamb, spices, preparation style in Johar Town..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#1c1a18] border border-[#2e2a26] text-sm text-[#f2ede4] focus:outline-none focus:border-[#c88a38]"
                />
              </div>

              {/* Image Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#ded5c5] uppercase tracking-wider mb-1.5">
                  Select Photo Preset or Enter Image URL
                </label>
                
                {/* Preset image buttons */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
                  {DISH_IMAGE_PRESETS.map((preset) => (
                    <button
                      type="button"
                      key={preset.url}
                      onClick={() => setDishForm({ ...dishForm, imageUrl: preset.url })}
                      className={`group relative rounded-lg overflow-hidden border aspect-video text-left transition-all ${
                        dishForm.imageUrl === preset.url
                          ? 'border-[#c88a38] ring-2 ring-[#c88a38]/40 scale-102'
                          : 'border-[#2e2a26] opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={getImageUrl(preset.url)}
                        alt={preset.label}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-1">
                        <span className="text-[9px] font-semibold text-white truncate">
                          {preset.label}
                        </span>
                      </div>
                      {dishForm.imageUrl === preset.url && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#c88a38] text-black flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  value={dishForm.imageUrl}
                  onChange={(e) => setDishForm({ ...dishForm, imageUrl: e.target.value })}
                  placeholder="Or enter custom image URL"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#1c1a18] border border-[#2e2a26] text-xs text-[#f2ede4] focus:outline-none focus:border-[#c88a38]"
                />
              </div>

              {/* Checkboxes: Featured / Signature & Available */}
              <div className="flex flex-wrap items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#ded5c5]">
                  <input
                    type="checkbox"
                    checked={dishForm.isFeatured}
                    onChange={(e) => setDishForm({ ...dishForm, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded accent-[#c88a38] bg-[#1c1a18] border-[#332f2b]"
                  />
                  <span className="font-semibold text-[#e5a947]">Mark as Signature Dish</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#ded5c5]">
                  <input
                    type="checkbox"
                    checked={dishForm.isAvailable}
                    onChange={(e) => setDishForm({ ...dishForm, isAvailable: e.target.checked })}
                    className="w-4 h-4 rounded accent-[#c88a38] bg-[#1c1a18] border-[#332f2b]"
                  />
                  <span>Dish is Available Now</span>
                </label>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#24211e]">
                <button
                  type="button"
                  onClick={() => setIsAddDishOpen(false)}
                  className="px-4 py-2.5 rounded-lg bg-[#1c1a18] text-[#8e8678] hover:text-white text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#c88a38] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#db9a44] transition-all shadow-lg shadow-[#c88a38]/20"
                >
                  Save Dish to Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

