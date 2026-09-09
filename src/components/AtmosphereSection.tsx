import { Users, Moon, Armchair, Sparkles } from 'lucide-react';

export function AtmosphereSection() {
  return (
    <section id="atmosphere" className="relative py-28 bg-[#0b0a09] overflow-hidden border-b border-[#211e1c]">
      {/* Background with Dark Atmospheric Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85"
          alt="Warm dining atmosphere at The Lamb House Johar Town"
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#0c0b0a]/88" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09] via-transparent to-[#0b0a09]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Central Statement */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1917]/90 border border-[#332f2b] text-xs font-semibold text-[#c88a38] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            The Johar Town Experience
          </div>
          
          <h2
            id="atmosphere-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-[#f2ede4] tracking-tight"
          >
            “Come Hungry. Leave Happy.”
          </h2>

          <p className="mt-4 text-base sm:text-xl text-[#c88a38] font-medium tracking-wide">
            Family friendly • Groups welcome • Outdoor seating
          </p>

          <p className="mt-4 text-sm sm:text-base text-[#c7bfb1] font-light leading-relaxed max-w-2xl mx-auto">
            Step into a welcoming ambient space crafted with dark earthy textures, warm pendant lighting, and comfortable seating arrangements designed for relaxed family gatherings and lively late-night Lahori get-togethers.
          </p>
        </div>

        {/* 3 Atmosphere Visual Vignettes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Dining Room & Warm Lighting */}
          <div className="group rounded-xl overflow-hidden bg-[#131211]/90 border border-[#2b2724] backdrop-blur-sm flex flex-col justify-between">
            <div className="relative h-56 overflow-hidden">
              <img
                src="/images/restaurant_interior.jpg"
                alt="Comfortable indoor family seating at The Lamb House"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131211] via-transparent to-transparent opacity-80" />
              <div className="absolute top-3 left-3 p-2 rounded bg-black/60 backdrop-blur-md text-[#c88a38]">
                <Armchair className="w-4 h-4" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-serif font-bold text-[#f2ede4] mb-2">Indoor Dining Room</h3>
              <p className="text-xs sm:text-sm text-[#a8a194] leading-relaxed">
                Air-conditioned comfortable seating with warm amber illumination, creating a cozy and relaxed environment for family dinners.
              </p>
            </div>
          </div>

          {/* Card 2: Outdoor Seating */}
          <div className="group rounded-xl overflow-hidden bg-[#131211]/90 border border-[#2b2724] backdrop-blur-sm flex flex-col justify-between">
            <div className="relative h-56 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85"
                alt="Outdoor seating Johar Town Lahore"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131211] via-transparent to-transparent opacity-80" />
              <div className="absolute top-3 left-3 p-2 rounded bg-black/60 backdrop-blur-md text-[#c88a38]">
                <Moon className="w-4 h-4" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-serif font-bold text-[#f2ede4] mb-2">Outdoor Seating</h3>
              <p className="text-xs sm:text-sm text-[#a8a194] leading-relaxed">
                Enjoy Johar Town's evening air with open outdoor dining, ideal for late-night feasts with friends under the Lahore sky.
              </p>
            </div>
          </div>

          {/* Card 3: Group & Family Feasting */}
          <div className="group rounded-xl overflow-hidden bg-[#131211]/90 border border-[#2b2724] backdrop-blur-sm flex flex-col justify-between">
            <div className="relative h-56 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85"
                alt="Group dining and communal meat feast setting"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131211] via-transparent to-transparent opacity-80" />
              <div className="absolute top-3 left-3 p-2 rounded bg-black/60 backdrop-blur-md text-[#c88a38]">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-serif font-bold text-[#f2ede4] mb-2">Group Dining Tables</h3>
              <p className="text-xs sm:text-sm text-[#a8a194] leading-relaxed">
                Generously proportioned tables designed to accommodate large sharing platters, hot karahis, and naan baskets for parties of all sizes.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
