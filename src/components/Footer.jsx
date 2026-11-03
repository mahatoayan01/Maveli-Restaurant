import React from "react";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  MessageCircle,
  ExternalLink,
  Lock,
  ArrowUpRight
} from "lucide-react";
import { RESTAURANT_INFO } from "../data/restaurant";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-kerala-950 text-cream-200 border-t border-kerala-900 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-kerala-800/60">
          
          {/* Col 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-kerala-950 font-bold shadow-md">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8 6 6 11 8 16c1 2 2.5 3 4 3s3-1 4-3c2-5 0-10-4-14zm0 18a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                </svg>
              </div>
              <span className="font-serif font-bold text-2xl text-cream-50">
                Maveli <span className="text-gold-400 font-sans text-sm tracking-wider font-semibold">RESTAURANT</span>
              </span>
            </div>
            <p className="text-sm text-cream-300 leading-relaxed">
              Bringing authentic God's Own Country culinary traditions to Rajarajeshwari Nagar, Bengaluru. Authentic banana-leaf meals, coastal fresh seafood, and naadan breakfast buffets.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <a
                href={RESTAURANT_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-kerala-900 hover:bg-gold-500 hover:text-kerala-950 flex items-center justify-center transition-all border border-kerala-800 text-gold-400"
                aria-label="Instagram Feed"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-kerala-900 hover:bg-gold-500 hover:text-kerala-950 flex items-center justify-center transition-all border border-kerala-800 text-gold-400"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-kerala-900 hover:bg-gold-500 hover:text-kerala-950 flex items-center justify-center transition-all border border-kerala-800 text-gold-400"
                aria-label="WhatsApp Chat"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.socials.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-kerala-900 hover:bg-gold-500 hover:text-kerala-950 flex items-center justify-center transition-all border border-kerala-800 text-gold-400"
                aria-label="Google Maps Listing"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-400 font-sans">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm text-cream-300">
              <li>
                <Link to="/" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  &rsaquo; Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  &rsaquo; Full Food Menu
                </Link>
              </li>
              <li>
                <a href="/#reserve" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  &rsaquo; Reserve a Table
                </a>
              </li>
              <li>
                <Link to="/location" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  &rsaquo; Directions & Timings
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  &rsaquo; Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
                  &rsaquo; Your Cart & Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Operating Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-400 font-sans">
              Opening Hours
            </h3>
            <div className="space-y-3 text-xs text-cream-300">
              <div className="border-b border-kerala-800/60 pb-2">
                <span className="font-semibold text-cream-100 block">Monday – Friday</span>
                <span className="text-gold-200">12:00 PM – 4:00 PM</span> &bull; <span>7:00 PM – 10:30 PM</span>
              </div>
              <div className="border-b border-kerala-800/60 pb-2">
                <span className="font-semibold text-cream-100 block">Saturday – Sunday</span>
                <span className="text-gold-300 font-medium">7:00 AM – 4:00 PM</span> (Buffet starts 7 AM)
                <br />
                <span>7:00 PM – 10:30 PM</span>
              </div>
              <p className="text-[11px] text-cream-400 italic">
                *Dine-in, Takeaway & Online Delivery available daily.
              </p>
            </div>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-400 font-sans">
              Visit Us
            </h3>
            <div className="space-y-3 text-xs text-cream-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.location.fullAddress}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.contact.phone}`} className="hover:text-gold-300 font-semibold text-sm text-cream-100">
                  {RESTAURANT_INFO.contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.contact.email}`} className="hover:text-gold-300">
                  {RESTAURANT_INFO.contact.email}
                </a>
              </p>
              <div className="pt-2">
                <a
                  href={RESTAURANT_INFO.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gold-400 hover:text-gold-300 underline underline-offset-4"
                >
                  Open in Google Maps <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Discreet Owner Login */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-400 gap-4">
          <p>
            &copy; {currentYear} {RESTAURANT_INFO.name}. All rights reserved. Rajarajeshwari Nagar, Bengaluru.
          </p>
          <div className="flex items-center space-x-6">
            <span className="text-cream-400">Authentic Kerala Cuisine</span>
            <span className="text-kerala-700">&bull;</span>
            {/* Small, discreet Owner Login link as required */}
            <Link
              to="/owner/login"
              className="text-cream-400 hover:text-gold-400 flex items-center gap-1 transition-colors"
              title="Restaurant Owner & Management Portal"
            >
              <Lock className="w-3 h-3 text-kerala-400" />
              Owner Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
