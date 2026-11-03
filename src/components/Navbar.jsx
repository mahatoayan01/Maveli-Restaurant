import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  Calendar, 
  MapPin,
  Clock
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { RESTAURANT_INFO } from "../data/restaurant";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Location & Hours", path: "/location" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Banner with operating status & quick call */}
      <div className="bg-kerala-950 text-cream-200 text-xs py-1.5 px-4 hidden sm:block border-b border-kerala-900/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-gold-400">
              <MapPin className="w-3.5 h-3.5" />
              BHEL Main Road, Opp. Kittur Chennamma Park, RR Nagar, Bengaluru
            </span>
            <span className="text-kerala-400">|</span>
            <span className="flex items-center gap-1 text-cream-300">
              <Clock className="w-3.5 h-3.5 text-gold-400" />
              Lunch: 12PM-4PM &bull; Dinner: 7PM-10:30PM &bull; Weekend Buffet: 7AM
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <a 
              href={`tel:${RESTAURANT_INFO.contact.phone}`}
              className="text-gold-300 hover:text-gold-200 font-medium transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              {RESTAURANT_INFO.contact.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-kerala-900/95 backdrop-blur-md shadow-lg shadow-black/10 py-3"
            : "bg-kerala-900 py-4 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <Link to="/" className="flex items-center space-x-3 group" aria-label="Maveli Restaurant Home">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-md shadow-gold-900/20 group-hover:scale-105 transition-transform duration-300">
                {/* Traditional Nilavilakku / Leaf Icon */}
                <svg className="w-6 h-6 text-kerala-950" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8 6 6 11 8 16c1 2 2.5 3 4 3s3-1 4-3c2-5 0-10-4-14zm0 18a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl sm:text-2xl text-cream-50 tracking-wide flex items-center gap-1.5">
                  Maveli
                  <span className="text-xs font-sans uppercase tracking-widest text-gold-400 font-semibold px-1.5 py-0.5 rounded bg-kerala-950/70 border border-gold-500/30">
                    Kerala
                  </span>
                </span>
                <span className="text-[11px] text-cream-300 tracking-wider uppercase font-medium">
                  Restaurant &bull; Bengaluru
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-gold-400 bg-kerala-800/80 shadow-inner"
                      : "text-cream-200 hover:text-white hover:bg-kerala-800/40"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Action Buttons & Cart */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Table Reserve CTA */}
              <a
                href="/#reserve"
                className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-cream-100 border border-gold-500/50 hover:border-gold-400 rounded-lg hover:bg-gold-500/10 transition-all"
              >
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                Reserve Table
              </a>

              {/* Order Online Button */}
              <Link
                to="/menu"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide text-kerala-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 rounded-lg shadow-sm hover:shadow-md hover:shadow-gold-500/20 transition-all"
              >
                Order Online
              </Link>

              {/* Cart Button */}
              <Link
                to="/cart"
                className="relative p-2.5 rounded-lg bg-kerala-800/90 hover:bg-kerala-800 text-cream-100 hover:text-gold-400 border border-kerala-700/60 transition-colors focus:ring-2 focus:ring-gold-500"
                aria-label={`Shopping Cart with ${itemCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-terracotta-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-lg bg-kerala-800/80 text-cream-200 hover:text-white border border-kerala-700/60 focus:ring-2 focus:ring-gold-500"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-kerala-950 border-t border-kerala-800 px-4 pt-4 pb-6 mt-3 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-gold-400 bg-kerala-800/70 font-semibold"
                      : "text-cream-200 hover:text-white hover:bg-kerala-800/40"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-kerala-800/80 grid grid-cols-2 gap-2">
              <Link
                to="/menu"
                className="w-full text-center py-2.5 px-3 bg-gradient-to-r from-gold-400 to-gold-500 text-kerala-950 font-semibold text-xs rounded-lg shadow"
              >
                Order Online
              </Link>
              <a
                href="/#reserve"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 px-3 border border-gold-500/50 text-gold-300 font-semibold text-xs rounded-lg hover:bg-kerala-800"
              >
                Reserve Table
              </a>
            </div>

            <div className="pt-2 text-center text-xs text-cream-400">
              <p className="flex items-center justify-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                Call for Orders: {RESTAURANT_INFO.contact.phone}
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

