import { MenuItem } from '../types';
import { Flame, Sparkles, MessageSquare } from 'lucide-react';
import { getImageUrl } from '../data/restaurantData';

interface SignatureDishesProps {
  items: MenuItem[];
  onSelectDish: (dish: MenuItem) => void;
}

export function SignatureDishes({ items, onSelectDish }: SignatureDishesProps) {
  // Exact 5 signature dishes mandated by prompt:
  const signatureDishesList = [
    {
      key: 'Mutton Afghani Pulao',
      name: 'Mutton Afghani Pulao',
      description: 'Fragrant aged basmati rice steamed slowly with a succulent mutton shank, caramelized carrot juliennes, and sweet plump raisins.',
      imageUrl: '/images/hero_afghani_pulao.jpg',
      tag: 'Signature Dish',
    },
    {
      key: 'Lamb Karahi',
      name: 'Lamb Karahi',
      description: 'Tender fresh cuts of lamb simmered in a traditional black wok with ripe tomatoes, ginger slivers, and fragrant green chillies.',
      imageUrl: '/images/lamb_karahi.jpg',
      tag: 'Chef Signature',
    },
    {
      key: 'Chapli Kabab',
      name: 'Chapli Kabab',
      description: 'Peshawari minced lamb patties infused with pomegranate seeds, roasted coriander, and fresh tomato rounds, pan-fried to juicy perfection.',
      imageUrl: '/images/chapli_kabab.jpg',
      tag: 'Peshawari Heritage',
    },
    {
      key: 'Grilled Ribs with Rice',
      name: 'Grilled Ribs with Rice',
      description: 'Prime lamb ribs charred over natural charcoal embers with rock salt, served alongside seasoned spiced basmati rice.',
      imageUrl: '/images/grilled_ribs.jpg',
      tag: 'Charcoal Smoked',
    },
    {
      key: 'Shinwari',
      name: 'Shinwari Lamb',
      description: 'Traditional Khyber Shinwari recipe prepared with pure lamb fat, tomatoes, rock salt, and whole green chillies. Zero heavy masalas.',
      imageUrl: '/images/shinwari_dish.jpg',
      tag: 'Khyber Classic',
    },
  ];

  // Match items from database if available, otherwise use defined list
  const displayDishes = signatureDishesList.map((sig, idx) => {
    const matched = items.find(
      (it) => it.name.toLowerCase().includes(sig.key.toLowerCase()) || sig.key.toLowerCase().includes(it.name.toLowerCase())
    );
    return {
      id: matched?.id || `sig-${idx + 1}`,
      name: sig.name,
      description: sig.description,
      imageUrl: matched?.imageUrl || sig.imageUrl,
      price: matched?.price || null,
      tag: sig.tag,
      isAvailable: matched?.isAvailable ?? true,
      categoryId: matched?.categoryId || 'cat-signature',
      isFeatured: true,
      createdAt: matched?.createdAt || new Date().toISOString(),
      updatedAt: matched?.updatedAt || new Date().toISOString(),
    };
  });

  return (
    <section id="signature" className="py-24 bg-[#0e0d0c] border-b border-[#211e1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1917] border border-[#2b2724] text-xs font-semibold text-[#c88a38] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Must-Try Signatures
          </div>
          <h2
            id="signature-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#f2ede4] tracking-tight"
          >
            The House Signatures
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#ded5c5] font-light">
            Our most celebrated Pakistani meat specialities, prepared fresh to order for an authentic Lahori dining experience.
          </p>
        </div>

        {/* 3-column desktop, 2-column tablet, 1-column mobile */}
        <div
          id="signature-dishes-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayDishes.map((dish, idx) => (
            <div
              key={dish.id}
              id={`signature-card-${idx + 1}`}
              className="group relative bg-[#131211] rounded-lg overflow-hidden border border-[#25221f] hover:border-[#c88a38]/60 transition-all duration-300 flex flex-col shadow-xl hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-1"
            >
              {/* Image Container with Consistent Aspect Ratio */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1b1917]">
                <img
                  src={getImageUrl(dish.imageUrl)}
                  alt={`${dish.name} - The Lamb House Lahore`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131211] via-transparent to-transparent opacity-80 pointer-events-none" />
                
                {/* Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0c0b0a]/85 backdrop-blur-md border border-[#332f2b] text-xs font-semibold text-[#e5a947]">
                  <Flame className="w-3 h-3 text-[#c88a38]" />
                  <span>{dish.tag}</span>
                </div>

                {!dish.isAvailable && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <span className="px-3 py-1 bg-red-900/90 text-red-100 rounded text-xs font-bold uppercase tracking-wider">
                      Currently Unavailable
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-serif font-bold text-[#f2ede4] group-hover:text-[#c88a38] transition-colors">
                      {dish.name}
                    </h3>
                    {/* Only display price if real price is available - NO fake prices! */}
                    {dish.price && (
                      <span className="text-sm font-semibold text-[#c88a38] px-2 py-0.5 rounded bg-[#1f1c19] border border-[#332e29]">
                        {dish.price}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-[#b5aea3] line-clamp-3 leading-relaxed font-light">
                    {dish.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-[#201d1b] flex items-center justify-between">
                  <span className="text-xs text-[#7e766a] uppercase tracking-wider font-medium">
                    Fresh to Order
                  </span>
                  <button
                    onClick={() => onSelectDish(dish as MenuItem)}
                    id={`dish-enquire-btn-${idx + 1}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#c88a38] hover:text-[#d99b4b] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Enquire / Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
