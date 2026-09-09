import { MapPin, Phone, Clock, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export function Footer({ onOpenAdmin }: FooterProps) {
  return (
    <footer id="footer" className="bg-[#080707] border-t border-[#1a1816] text-[#8e877c] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-xl font-bold tracking-wider text-[#f2ede4] block">
                THE LAMB HOUSE
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#a1998c] uppercase">
                Johar Town, Lahore
              </span>
            </div>
            <p className="text-[#a8a194] leading-relaxed text-xs">
              Casual, trendy, and family-friendly Pakistani meat restaurant specializing in authentic slow-cooked karahi, tender mutton afghani pulao, fresh chapli kababs, and live charcoal grills.
            </p>
            <div className="text-[11px] text-[#736c61]">
              Rating: <strong className="text-[#e5a947]">3.9 / 5.0</strong> (706+ verified reviews)
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#f2ede4] uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Signature Dishes', 'Menu', 'Atmosphere', 'Reviews', 'Gallery', 'Reservation', 'Contact'].map((name) => (
                <li key={name}>
                  <a
                    href={`#${name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-[#c88a38] transition-colors"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Visit & Timings */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#f2ede4] uppercase tracking-wider">
              Hours &amp; Location
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c88a38] shrink-0 mt-0.5" />
                <span>445, Block G1, Block G 1 Phase 1, Johar Town, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#c88a38] shrink-0" />
                <span>Monday – Sunday: 2:30 PM – 2:00 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c88a38] shrink-0" />
                <a href="tel:03218440321" className="text-[#f2ede4] hover:text-[#c88a38] font-semibold">
                  0321 8440321
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Links & Admin Access */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#f2ede4] uppercase tracking-wider">
              Verified Links
            </h4>
            <div className="space-y-2.5">
              <a
                href="https://maps.app.goo.gl/JacoscgzBPpPYr1d8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-[#131211] border border-[#2b2723] text-[#ded5c5] hover:text-white hover:border-[#c88a38] transition-colors"
              >
                <span>Google Maps Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#c88a38]" />
              </a>

              <div className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  id="footer-admin-portal-btn"
                  className="inline-flex items-center gap-2 text-[#736c61] hover:text-[#c88a38] transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c88a38]" />
                  <span>Restaurant Staff &amp; Admin Portal</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#181615] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#635c52]">
          <p>© {new Date().getFullYear()} The Lamb House. All rights reserved. Johar Town, Lahore.</p>
          <p>Family Friendly • Outdoor Seating • Home Delivery • Late-Night Dining</p>
        </div>
      </div>
    </footer>
  );
}
