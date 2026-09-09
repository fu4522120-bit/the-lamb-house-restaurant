import { Users, Moon, Flame, HeartHandshake } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#0c0b0a] border-b border-[#1f1c1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#c88a38] text-xs font-semibold uppercase tracking-[0.2em]">
              <Flame className="w-3.5 h-3.5" />
              <span>Lahore Meat Tradition</span>
            </div>

            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#f2ede4] leading-tight"
            >
              Built Around Great Meat &amp; Great Company
            </h2>

            <p className="text-[#ded5c5] text-base sm:text-lg leading-relaxed font-light">
              Nestled in the bustling dining hub of Johar Town, Lahore, <strong className="text-white font-medium">The Lamb House</strong> is a casual, trendy, and family-friendly Pakistani meat destination. We take pride in celebrating the time-honoured heritage of slow-cooked meat dishes, sizzling live karahis, and authentic regional recipes.
            </p>

            <p className="text-[#a8a194] text-base leading-relaxed">
              Every dish is crafted with prime cuts of fresh mutton and lamb, cooked in pure traditional methods to let natural flavours shine through. Whether you are gathering with close family for a hearty weekend platter, hosting friends over simmering Shinwari, or enjoying a late-night feast under the stars, our tables are built for generous sharing and lively conversations.
            </p>

            {/* Core highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded bg-[#151312] border border-[#262421]">
                <Users className="w-5 h-5 text-[#c88a38] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#f2ede4]">Family &amp; Group Feasts</h4>
                  <p className="text-xs text-[#a39c90] mt-0.5">Spacious seating arranged for large family gatherings and friend circles.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded bg-[#151312] border border-[#262421]">
                <Moon className="w-5 h-5 text-[#c88a38] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#f2ede4]">Late-Night Dining</h4>
                  <p className="text-xs text-[#a39c90] mt-0.5">Serving hot, fresh meat dishes daily until 2:00 AM in Johar Town.</p>
                </div>
              </div>
            </div>

            {/* Exact requested stats row */}
            <div
              id="about-stats-row"
              className="pt-6 border-t border-[#24211e] grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <div className="p-3 rounded bg-[#121110] border border-[#22201d]">
                <div className="text-2xl font-bold font-serif text-[#c88a38]">706+</div>
                <div className="text-xs text-[#999285] uppercase tracking-wider mt-0.5">Reviews</div>
              </div>
              <div className="p-3 rounded bg-[#121110] border border-[#22201d]">
                <div className="text-lg sm:text-xl font-bold font-serif text-[#f2ede4]">2:30 PM – 2 AM</div>
                <div className="text-xs text-[#999285] uppercase tracking-wider mt-0.5">Daily Hours</div>
              </div>
              <div className="p-3 rounded bg-[#121110] border border-[#22201d]">
                <div className="text-2xl font-bold font-serif text-[#f2ede4]">Johar Town</div>
                <div className="text-xs text-[#999285] uppercase tracking-wider mt-0.5">Lahore</div>
              </div>
              <div className="p-3 rounded bg-[#121110] border border-[#22201d]">
                <div className="text-xl font-bold font-serif text-[#c88a38]">Family</div>
                <div className="text-xs text-[#999285] uppercase tracking-wider mt-0.5">Friendly</div>
              </div>
            </div>

          </div>

          {/* Large Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-lg overflow-hidden border border-[#2e2a26] shadow-2xl shadow-black">
              <img
                src="/images/restaurant_interior.jpg"
                alt="The Lamb House dining room and welcoming seating in Johar Town Lahore"
                className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded bg-[#0f0e0d]/90 backdrop-blur-md border border-[#2b2724]">
                <p className="text-xs text-[#c88a38] font-semibold uppercase tracking-wider">Atmosphere</p>
                <p className="text-sm text-[#f2ede4] font-medium mt-0.5">A modern casual space where Lahori hospitality meets authentic meat craft.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
