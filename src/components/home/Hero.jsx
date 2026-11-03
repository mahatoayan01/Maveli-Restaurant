import React from "react";
import { Link } from "react-router-dom";
import { 
  Utensils, 
  ShoppingBag, 
  Calendar, 
  Phone, 
  Star, 
  Clock, 
  MapPin, 
  Flame 
} from "lucide-react";
import { RESTAURANT_INFO } from "../../data/restaurant";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-[92vh] flex items-center justify-center bg-kerala-950 text-white overflow-hidden">
      {/* Background Hero Image with atmospheric Kerala gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1610057099433-2ba8c3664d95?auto=format&fit=crop&w=2000&q=85"
          alt="Traditional Kerala feast served on fresh banana leaf with authentic sides"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-75 contrast-110"
        />
        {/* Gradients to ensure exceptional WCAG AA text contrast and warm mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-kerala-950 via-kerala-950/75 to-kerala-950/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-kerala-950/40 to-kerala-950/90" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Top Badges */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-kerala-900/80 border border-gold-500/40 backdrop-blur-md mb-6 shadow-lg shadow-black/20 animate-in fade-in zoom-in duration-500">
          <span className="flex items-center text-gold-400 font-bold text-xs uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-gold-400 mr-1" />
            {RESTAURANT_INFO.ratings.googleRating}
          </span>
          <span className="text-kerala-400">&bull;</span>
          <span className="text-xs text-cream-100 font-medium tracking-wide">
            1,160+ Happy Diners in Rajarajeshwari Nagar
          </span>
        </div>

        {/* Headline & Tagline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-cream-50 leading-[1.1] mb-6 drop-shadow-md">
          Authentic Flavors of <br />
          <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">
            God's Own Country
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-cream-200 font-light leading-relaxed mb-10 drop-shadow">
          {RESTAURANT_INFO.shortDescription}
        </p>

        {/* 4 Required Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
          {/* Button 1: View Menu */}
          <Link
            to="/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide bg-gradient-to-r from-gold-500 to-gold-600 text-kerala-950 hover:from-gold-400 hover:to-gold-500 shadow-lg shadow-gold-900/40 hover:shadow-gold-500/30 transform hover:-translate-y-0.5 transition-all"
          >
            <Utensils className="w-4 h-4" />
            View Menu
          </Link>

          {/* Button 2: Order Online */}
          <Link
            to="/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide bg-kerala-800/90 text-cream-50 hover:bg-kerala-800 border border-kerala-600 hover:border-gold-400 shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-gold-400" />
            Order Online
          </Link>

          {/* Button 3: Reserve a Table */}
          <a
            href="#reserve"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide bg-transparent text-cream-100 hover:text-white border border-gold-500/60 hover:border-gold-400 hover:bg-gold-500/10 shadow-sm transition-all"
          >
            <Calendar className="w-4 h-4 text-gold-400" />
            Reserve a Table
          </a>

          {/* Button 4: Call Now */}
          <a
            href={`tel:${RESTAURANT_INFO.contact.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide bg-kerala-900/80 text-cream-200 hover:text-white border border-kerala-700 hover:bg-kerala-800 transition-all"
          >
            <Phone className="w-4 h-4 text-gold-400" />
            Call Now
          </a>
        </div>

        {/* Feature Pills under hero */}
        <div className="mt-12 pt-8 border-t border-kerala-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm text-cream-300">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-400" />
            <span>Fresh Banana Leaf Meals</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-terracotta-400" />
            <span>Seer Fish Pollichathu</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-400" />
            <span>Unlimited Weekend Buffet</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-terracotta-400" />
            <span>Cold-Pressed Coconut Oil</span>
          </div>
        </div>
      </div>
    </section>
  );
}
