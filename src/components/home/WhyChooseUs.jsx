import React from "react";
import { 
  Sparkles, 
  Utensils, 
  Fish, 
  Coffee, 
  Award, 
  ShieldCheck, 
  Users 
} from "lucide-react";
import { RESTAURANT_INFO } from "../../data/restaurant";

export default function WhyChooseUs() {
  const iconMap = {
    CookingPot: Utensils,
    Sparkles: Sparkles,
    Fish: Fish,
    Coffee: Coffee,
  };

  return (
    <section className="py-20 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-kerala-100 border border-kerala-200 text-kerala-800 text-xs uppercase tracking-wider font-bold mb-3">
            <Award className="w-3.5 h-3.5 text-gold-600" />
            The Maveli Distinction
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-kerala-950 tracking-tight">
            Why Bengaluru Loves Maveli
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            Rooted in Kerala culinary integrity, honest pricing, and generous homestyle portions.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESTAURANT_INFO.about.features.map((feature, idx) => {
            const Icon = iconMap[feature.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-cream-300/80 shadow-warm hover:shadow-warm-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-gold-100 to-gold-200 border border-gold-300/70 flex items-center justify-center text-kerala-900 mb-6 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6 transition-colors" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-kerala-950 mb-2.5">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-cream-200 flex items-center text-xs font-semibold text-gold-700">
                  <ShieldCheck className="w-4 h-4 mr-1 text-kerala-700" />
                  Quality Assured
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
