import { motion } from 'motion/react';
import { Compass, UtensilsCrossed, MapPin, Clock, Star } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a09]"
    >
      {/* Background Image with subtle cinematic overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_afghani_pulao.jpg"
          alt="Authentic Pakistani Mutton Afghani Pulao at The Lamb House Johar Town"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
          loading="eager"
        />
        {/* Layered cinematic gradient overlay for high contrast and luxury atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a] via-[#0c0b0a]/75 to-[#0a0a09]/55" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          {/* Subtle rating pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b1917]/80 backdrop-blur-md border border-[#332f2b] text-xs text-[#ded5c5] mb-6">
            <span className="flex items-center gap-1 text-[#e5a947]">
              <Star className="w-3.5 h-3.5 fill-[#e5a947]" />
              <strong className="font-semibold text-white">3.9 / 5</strong>
            </span>
            <span className="text-[#6d665a]">•</span>
            <span>706+ Reviews on Google</span>
            <span className="text-[#6d665a]">•</span>
            <span className="text-[#c88a38] font-medium">Johar Town, Lahore</span>
          </div>

          {/* Primary Restaurant Name */}
          <h1
            id="hero-title"
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#f2ede4] font-serif uppercase max-w-4xl"
          >
            THE LAMB HOUSE
          </h1>

          {/* Tagline */}
          <p
            id="hero-tagline"
            className="mt-3 text-2xl sm:text-3xl md:text-4xl font-serif text-[#c88a38] tracking-wide italic font-medium"
          >
            “Authentic Meat. Bold Flavours.”
          </p>

          {/* Supporting Copy */}
          <p
            id="hero-description"
            className="mt-6 text-base sm:text-lg md:text-xl text-[#ded5c5] max-w-2xl font-light leading-relaxed text-balance"
          >
            From slow-cooked karahi to tender lamb and traditional Pakistani favourites,
            experience hearty flavours made for good food and great company.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center">
            <a
              href="#menu"
              id="hero-explore-menu-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded bg-[#c88a38] hover:bg-[#d99b4b] text-[#0c0b0a] font-bold text-base transition-all duration-200 shadow-xl shadow-[#c88a38]/25 active:scale-95 uppercase tracking-wider"
            >
              <UtensilsCrossed className="w-5 h-5" />
              Explore Menu
            </a>
            <a
              href="https://maps.app.goo.gl/JacoscgzBPpPYr1d8"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-directions-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded bg-[#1b1917]/90 hover:bg-[#25221f] text-[#f2ede4] border border-[#3b3631] hover:border-[#c88a38] font-semibold text-base transition-all duration-200 active:scale-95"
            >
              <Compass className="w-5 h-5 text-[#c88a38]" />
              Get Directions
            </a>
          </div>

          {/* Small metadata beneath */}
          <div
            id="hero-subinfo"
            className="mt-12 pt-8 border-t border-[#332f2b]/60 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-[#b5ada0]"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#c88a38]" />
              <span>Johar Town, Lahore</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#c88a38]" />
              <span>Open Daily • 2:30 PM – 2:00 AM</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0c0b0a] to-transparent pointer-events-none" />
    </section>
  );
}
