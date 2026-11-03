import React from "react";
import { Link } from "react-router-dom";
import { Utensils, Calendar, Phone } from "lucide-react";
import { RESTAURANT_INFO } from "../../data/restaurant";

export default function CtaBanner() {
  return (
    <section className="relative py-20 bg-kerala-950 text-white overflow-hidden">
      {/* Decorative Warm Backlighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="inline-block text-xs uppercase tracking-widest text-gold-400 font-bold bg-kerala-900/80 px-3 py-1 rounded-full border border-gold-500/30">
          Taste the Authenticity
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream-50 tracking-tight leading-tight max-w-3xl mx-auto">
          Ready for a Genuine Kerala Banana Leaf Sadhya?
        </h2>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-cream-200 font-light leading-relaxed">
          Order for quick doorstep delivery in RR Nagar, or join us at our dining hall for a memorable feast with family and friends.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/menu"
            className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-gold-400 to-gold-500 text-kerala-950 hover:from-gold-300 hover:to-gold-400 shadow-lg shadow-gold-900/30 transition-all flex items-center gap-2"
          >
            <Utensils className="w-4 h-4" />
            Order Online Now
          </Link>
          <a
            href="#reserve"
            className="px-6 py-3.5 rounded-xl font-bold text-sm bg-kerala-900 text-cream-100 hover:text-white border border-gold-500/50 hover:bg-kerala-800 transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-gold-400" />
            Book a Table
          </a>
          <a
            href={`tel:${RESTAURANT_INFO.contact.phone}`}
            className="px-6 py-3.5 rounded-xl font-semibold text-sm text-cream-200 hover:text-white border border-kerala-700 hover:bg-kerala-900 transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-gold-400" />
            {RESTAURANT_INFO.contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

