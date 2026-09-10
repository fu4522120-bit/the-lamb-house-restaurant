import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  isAdminLoggedIn?: boolean;
}

export function Navbar({ onOpenAdmin, isAdminLoggedIn }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Atmosphere', href: '#atmosphere' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reserve', href: '#reservation' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top micro bar for quick restaurant information */}
      <div id="top-info-bar" className="bg-[#0a0a09] border-b border-[#221f1d] text-xs text-[#a39e95] py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#c88a38]" />
              445, Block G1, Johar Town, Lahore
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#c88a38]" />
              Open Daily: 2:30 PM – 2:00 AM
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="tel:03218440321"
              id="top-call-link"
              className="flex items-center gap-1 text-[#f2ede4] hover:text-[#c88a38] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#c88a38]" />
              0321 8440321
            </a>
            <button
              onClick={onOpenAdmin}
              id="top-admin-trigger"
              className="flex items-center gap-1 text-[#787268] hover:text-[#c88a38] transition-colors pl-3 border-l border-[#262422]"
            >
              <ShieldCheck className="w-3 h-3 text-[#c88a38]" />
              {isAdminLoggedIn ? 'Staff Portal (Active)' : 'Admin'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        id="main-navigation"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0f0e0d]/95 backdrop-blur-md shadow-2xl shadow-black/80 border-b border-[#262320]'
            : 'bg-[#0f0e0d]/80 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" id="brand-logo" className="group flex flex-col justify-center">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#f2ede4] group-hover:text-[#c88a38] transition-colors">
                THE LAMB HOUSE
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#a1998c] uppercase -mt-0.5">
                Authentic Meat • Lahore
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm font-medium text-[#ded5c5] hover:text-[#c88a38] transition-colors tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              <a
                href="#menu"
                id="header-view-menu-btn"
                className="px-5 py-2.5 rounded bg-[#c88a38] hover:bg-[#d99b4b] text-[#0f0e0d] font-semibold text-sm transition-all duration-200 shadow-md shadow-[#c88a38]/20 tracking-wider uppercase active:scale-95"
              >
                View Menu
              </a>
              <a
                href="#reservation"
                id="header-reserve-btn"
                className="px-4 py-2 rounded border border-[#3b3631] hover:border-[#c88a38] text-[#f2ede4] hover:text-[#c88a38] font-medium text-sm transition-colors"
              >
                Book Table
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <a
                href="tel:03218440321"
                aria-label="Call restaurant"
                id="mobile-call-btn"
                className="p-2 rounded bg-[#1f1c1a] text-[#c88a38] border border-[#332f2b]"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="mobile-menu-toggle-btn"
                aria-label="Toggle Menu"
                className="p-2.5 rounded bg-[#1f1c1a] text-[#f2ede4] hover:text-[#c88a38] border border-[#332f2b] transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div id="mobile-menu-drawer" className="lg:hidden bg-[#121110] border-b border-[#292623] px-5 pt-3 pb-6 space-y-3">
            <div className="flex flex-col space-y-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  id={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-3 py-2 text-base font-medium text-[#ded5c5] hover:text-[#c88a38] hover:bg-[#1b1917] rounded transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-[#262320] flex flex-col gap-2.5">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                id="mobile-drawer-view-menu-btn"
                className="w-full text-center py-3 rounded bg-[#c88a38] text-black font-semibold text-sm uppercase tracking-wider"
              >
                View Menu
              </a>
              <div className="flex gap-2">
                <a
                  href="tel:03218440321"
                  id="mobile-drawer-call-btn"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded bg-[#1b1917] text-[#f2ede4] border border-[#332f2b] text-sm"
                >
                  <Phone className="w-4 h-4 text-[#c88a38]" /> Call 0321 8440321
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  id="mobile-drawer-admin-btn"
                  className="px-3 py-2.5 rounded bg-[#1b1917] text-[#9c9588] hover:text-[#c88a38] border border-[#332f2b] text-sm flex items-center justify-center"
                  title="Staff Portal"
                >
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
