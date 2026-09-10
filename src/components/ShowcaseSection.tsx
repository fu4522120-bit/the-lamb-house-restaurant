import { Flame, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import { getImageUrl } from '../data/restaurantData';

interface ShowcaseSectionProps {
  onOrderClick: () => void;
}

export function ShowcaseSection({ onOrderClick }: ShowcaseSectionProps) {
  return (
    <section id="showcase" className="relative py-28 bg-[#090808] overflow-hidden border-b border-[#211e1c]">
      {/* Background Graphic / Texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#c88a38_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Karahi Presentation */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-xl overflow-hidden border border-[#332f2b] shadow-2xl shadow-black">
              <img
                src={getImageUrl('/images/lamb_karahi.jpg')}
                alt="Authentic Pakistani Lamb Karahi bubbling in black iron wok at The Lamb House"
                className="w-full h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090808] via-transparent to-transparent opacity-85 pointer-events-none" />
              
              {/* Floating feature pill */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-[#0e0d0c]/90 backdrop-blur-md border border-[#2b2724] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#c88a38] font-bold">
                    Signature Wok Craft
                  </span>
                  <p className="text-sm font-medium text-[#f2ede4] mt-0.5">
                    Simmered with ripe tomatoes, julienne ginger, green chillies &amp; desi ghee.
                  </p>
                </div>
                <span className="px-3 py-1 rounded bg-[#1c1a17] text-[#c88a38] text-xs font-semibold border border-[#38332c]">
                  Cooked to Order
                </span>
              </div>
            </div>
          </div>

          {/* Copy & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1917] border border-[#2e2a26] text-xs font-semibold text-[#c88a38] uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>Chef's Masterpiece</span>
            </div>

            <h2
              id="showcase-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-[#f2ede4] tracking-tight"
            >
              Lamb Karahi
            </h2>

            <p className="text-xl sm:text-2xl font-serif text-[#c88a38] italic">
              “Rich, hearty and made for sharing.”
            </p>

            <p className="text-[#ded5c5] text-base leading-relaxed font-light">
              Our Lamb Karahi is the cornerstone of The Lamb House table. Fresh, bone-in cuts of prime Pakistani lamb are seared and slow-braised in heavy cast iron, drawing deep natural marrow juices into a velvety, aromatic tomato gravy spiked with fresh ginger batons and pungent green chillies.
            </p>

            {/* Visual checks */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-[#c4bdaf]">
                <CheckCircle2 className="w-4 h-4 text-[#c88a38] shrink-0" />
                <span>Prepared with 100% fresh, premium local lamb cuts</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#c4bdaf]">
                <CheckCircle2 className="w-4 h-4 text-[#c88a38] shrink-0" />
                <span>Zero artificial flavours — purely tomatoes, ginger, chillies &amp; ghee</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#c4bdaf]">
                <CheckCircle2 className="w-4 h-4 text-[#c88a38] shrink-0" />
                <span>Served sizzling hot with fresh clay-oven tandoori naan</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOrderClick}
                id="showcase-order-enquire-btn"
                className="px-8 py-3.5 rounded bg-[#c88a38] hover:bg-[#d99b4b] text-black font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-[#c88a38]/20 flex items-center gap-2 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                Order / Enquire
              </button>
              
              <a
                href="tel:03218440321"
                id="showcase-call-btn"
                className="px-6 py-3.5 rounded bg-[#161413] hover:bg-[#211e1c] text-[#ded5c5] border border-[#332f2b] text-sm font-semibold flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#c88a38]" />
                Call 0321 8440321
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
