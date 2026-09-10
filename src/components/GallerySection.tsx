import { useState } from 'react';
import { GalleryItem } from '../types';
import { Camera, X, ZoomIn } from 'lucide-react';
import { getImageUrl } from '../data/restaurantData';

interface GallerySectionProps {
  items: GalleryItem[];
}

export function GallerySection({ items }: GallerySectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const filterOptions = ['All', 'Pulao & Rice', 'Karahi', 'Kababs', 'BBQ / Grills', 'Shinwari', 'Atmosphere'];

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
      activeFilter.toLowerCase().includes(item.category.toLowerCase());
  });

  return (
    <section id="gallery" className="py-24 bg-[#0d0c0b] border-b border-[#211e1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#c88a38] uppercase tracking-[0.2em]">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Journal</span>
          </div>
          <h2
            id="gallery-heading"
            className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#f2ede4]"
          >
            The Lamb House Gallery
          </h2>
          <p className="mt-3 text-[#a8a194] text-base font-light">
            A glimpse into our slow-cooked meats, charcoal grills, and the warm dining atmosphere of Johar Town.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          id="gallery-filter-tabs"
          className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none"
        >
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-[#c88a38] text-black font-semibold shadow-md shadow-[#c88a38]/20'
                  : 'bg-[#141312] text-[#ded5c5] border border-[#2b2724] hover:border-[#c88a38]/50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Clean 2-column mobile, 3-column desktop */}
        <div
          id="gallery-grid"
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6"
        >
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              id={`gallery-item-${idx + 1}`}
              onClick={() => setActiveLightbox(item)}
              className="group relative cursor-pointer overflow-hidden rounded-lg bg-[#151413] border border-[#25221f] hover:border-[#c88a38]/60 transition-all duration-300 aspect-[4/3]"
            >
              <img
                src={getImageUrl(item.imageUrl)}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] font-semibold text-[#c88a38] uppercase tracking-wider">
                  {item.category}
                </span>
                <p className="text-xs sm:text-sm text-white font-medium line-clamp-2 mt-0.5">
                  {item.caption}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[11px] text-[#e0d7c7]">
                  <ZoomIn className="w-3 h-3 text-[#c88a38]" />
                  <span>Enlarge</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#121110] rounded-xl overflow-hidden border border-[#332f2b] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-[#c88a38] hover:text-black transition-colors"
              aria-label="Close image"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-[16/10] bg-black">
              <img
                src={getImageUrl(activeLightbox.imageUrl)}
                alt={activeLightbox.caption}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 flex items-center justify-between border-t border-[#262320]">
              <div>
                <span className="text-xs font-semibold text-[#c88a38] uppercase tracking-wider">
                  {activeLightbox.category}
                </span>
                <p className="text-sm font-medium text-[#f2ede4] mt-0.5">
                  {activeLightbox.caption}
                </p>
              </div>
              <a
                href="#reservation"
                onClick={() => setActiveLightbox(null)}
                className="px-4 py-2 rounded bg-[#c88a38] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#d99b4b]"
              >
                Book Table
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
