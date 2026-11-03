import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Utensils, Heart, Award, ArrowRight } from "lucide-react";
import { RESTAURANT_INFO } from "../../data/restaurant";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-cream-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Showcase (5 columns) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Gold Backdrop Box */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl bg-gold-500/15 border-2 border-gold-400/40 -z-10 transform -rotate-2" />
              
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden shadow-warm-lg border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
                  alt="Kerala Fish Curry and authentic clay pot cooking at Maveli Restaurant"
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-kerala-900 text-cream-50 p-4 sm:p-5 rounded-2xl shadow-xl border border-gold-500/40 max-w-[220px]">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-5 h-5 text-gold-400 shrink-0" />
                  <span className="font-serif font-bold text-lg text-gold-400">Pure Heritage</span>
                </div>
                <p className="text-xs text-cream-200 leading-snug">
                  Traditional recipes straight from the kitchens of Kerala.
                </p>
              </div>
            </div>
          </div>

          {/* Text Story (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-kerala-100 border border-kerala-200 text-kerala-800 text-xs uppercase tracking-wider font-bold">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              Our Culinary Journey
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-kerala-950 tracking-tight leading-tight">
              {RESTAURANT_INFO.about.title}
            </h2>

            <p className="font-medium text-gold-800 text-base sm:text-lg">
              {RESTAURANT_INFO.about.subtitle}
            </p>

            <div className="space-y-4 text-neutral-700 text-sm sm:text-base leading-relaxed">
              {RESTAURANT_INFO.about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Value Points */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-cream-300">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-gold-100 flex items-center justify-center text-gold-700 shrink-0">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-kerala-950">Banana Leaf Tradition</h3>
                  <p className="text-xs text-neutral-600">Fresh plantain leaves loaded with 8+ traditional accompaniments.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-kerala-100 flex items-center justify-center text-kerala-800 shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-kerala-950">Homely Hospitality</h3>
                  <p className="text-xs text-neutral-600">Courteous service inspired by King Mahabali's legendary generosity.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-kerala-900 text-cream-50 hover:bg-kerala-800 font-semibold text-sm shadow-md hover:shadow-lg transition-all"
              >
                Explore Full Menu <ArrowRight className="w-4 h-4 text-gold-400" />
              </Link>
              <Link
                to="/location"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-300 text-neutral-800 hover:bg-white font-semibold text-sm transition-all"
              >
                Find Us on BHEL Road
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
