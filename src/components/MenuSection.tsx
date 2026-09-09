import { useState, useMemo } from 'react';
import { MenuCategory, MenuItem } from '../types';
import { Search, Utensils, MessageSquare, AlertCircle } from 'lucide-react';

interface MenuSectionProps {
  categories: MenuCategory[];
  items: MenuItem[];
  onSelectDish: (dish: MenuItem) => void;
}

export function MenuSection({ categories, items, onSelectDish }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        item.categoryId === selectedCategory ||
        (selectedCategory === 'cat-signature' && item.isFeatured);

      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <section id="menu" className="py-24 bg-[#0d0c0b] border-b border-[#211e1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#c88a38] uppercase tracking-[0.2em]">
            <Utensils className="w-3.5 h-3.5" />
            <span>Prepared Fresh To Order</span>
          </div>
          <h2
            id="menu-heading"
            className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#f2ede4]"
          >
            Our Meat Selections
          </h2>
          <p className="mt-3 text-base text-[#ded5c5] font-light">
            Explore authentic Pakistani favourites crafted with fresh lamb and mutton cuts. All dishes prepared daily in Johar Town.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-6 mb-12">
          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7e766a]" />
            <input
              type="text"
              id="menu-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search karahi, pulao, kabab, shinwari..."
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#141211] border border-[#2e2a26] text-sm text-[#f2ede4] placeholder-[#787063] focus:outline-none focus:border-[#c88a38] transition-colors"
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

          {/* Category Tabs */}
          <div
            id="menu-category-tabs"
            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center"
          >
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#c88a38] text-black font-semibold shadow-md shadow-[#c88a38]/20'
                  : 'bg-[#151312] text-[#ded5c5] border border-[#2b2723] hover:border-[#c88a38]/60 hover:text-white'
              }`}
            >
              All Items ({items.length})
            </button>
            {categories.map((cat) => (
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
            <p className="text-sm text-[#9e9587] mt-1">Try another search term or select a different category.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
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
                className="group bg-[#121110] rounded-lg overflow-hidden border border-[#24211e] hover:border-[#c88a38]/50 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/60"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#1a1816]">
                  <img
                    src={item.imageUrl}
                    alt={`${item.name} at The Lamb House`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-transparent opacity-75" />
                  
                  {item.isFeatured && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-[#c88a38] text-black text-[11px] font-bold uppercase tracking-wider">
                      Signature
                    </span>
                  )}

                  {!item.isAvailable && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-red-950/90 text-red-300 text-[11px] font-semibold border border-red-800">
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

                  <div className="mt-5 pt-3 border-t border-[#1e1c19] flex items-center justify-between">
                    <span className="text-[11px] text-[#6e675b] tracking-wider uppercase">
                      Freshly Prepared
                    </span>
                    <button
                      onClick={() => onSelectDish(item)}
                      id={`order-enquire-btn-${item.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c88a38] hover:text-[#e0a250] transition-colors"
                    >
                      <MessageSquare className="w-3 h-3" />
                      Order / Inquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
