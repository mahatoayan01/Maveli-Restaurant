import React, { useMemo } from "react";
import { Star, Clock, UtensilsCrossed, ShieldCheck, CheckCircle } from "lucide-react";
import { RESTAURANT_INFO } from "../../data/restaurant";

export default function HighlightsStrip() {
  // Compute live open/closed status from current local time & day
  const statusInfo = useMemo(() => {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    const isWeekend = day === 0 || day === 6;
    
    // Minutes from midnight
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const lunchStart = isWeekend ? 7 * 60 : 12 * 60; // 7 AM on weekend, 12 PM on weekday
    const lunchEnd = 16 * 60; // 4:00 PM
    const dinnerStart = 19 * 60; // 7:00 PM
    const dinnerEnd = 22 * 60 + 30; // 10:30 PM

    if (currentMinutes >= lunchStart && currentMinutes < lunchEnd) {
      return {
        isOpen: true,
        text: "Open Now",
        detail: "Closes at 4:00 PM (Lunch)",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        indicator: "bg-emerald-500 animate-pulse"
      };
    } else if (currentMinutes >= dinnerStart && currentMinutes < dinnerEnd) {
      return {
        isOpen: true,
        text: "Open Now",
        detail: "Closes at 10:30 PM (Dinner)",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        indicator: "bg-emerald-500 animate-pulse"
      };
    } else if (currentMinutes < lunchStart) {
      return {
        isOpen: false,
        text: "Closed Now",
        detail: `Opens at ${isWeekend ? "7:00 AM (Weekend Buffet)" : "12:00 PM"}`,
        color: "text-amber-800 bg-amber-50 border-amber-200",
        indicator: "bg-amber-500"
      };
    } else if (currentMinutes >= lunchEnd && currentMinutes < dinnerStart) {
      return {
        isOpen: false,
        text: "Afternoon Break",
        detail: "Reopens at 7:00 PM for Dinner",
        color: "text-amber-800 bg-amber-50 border-amber-200",
        indicator: "bg-amber-500"
      };
    } else {
      return {
        isOpen: false,
        text: "Closed for the Night",
        detail: `Opens tomorrow at ${isWeekend ? "7:00 AM" : "12:00 PM"}`,
        color: "text-neutral-700 bg-neutral-100 border-neutral-300",
        indicator: "bg-neutral-400"
      };
    }
  }, []);

  return (
    <div className="bg-cream-200 border-y border-cream-300 shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          
          {/* Highlight 1: Google Rating */}
          <div className="flex items-center gap-3.5 p-2 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-gold-100 border border-gold-300 flex items-center justify-center shrink-0 shadow-sm">
              <Star className="w-6 h-6 fill-gold-500 text-gold-600" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-kerala-900 text-base">
                <span>{RESTAURANT_INFO.ratings.overall} / 5.0</span>
                <span className="text-xs font-normal text-kerala-700 font-sans">({RESTAURANT_INFO.ratings.totalReviews}+ reviews)</span>
              </div>
              <p className="text-xs text-neutral-600">Rated on Google & Food Delivery</p>
            </div>
          </div>

          {/* Highlight 2: Authentic Cuisine */}
          <div className="flex items-center gap-3.5 p-2 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-kerala-100 border border-kerala-300 flex items-center justify-center shrink-0 shadow-sm">
              <UtensilsCrossed className="w-6 h-6 text-kerala-800" />
            </div>
            <div>
              <h2 className="font-bold text-kerala-900 text-base">Kerala & Coastal</h2>
              <p className="text-xs text-neutral-600">Banana Leaf Sadhya & Seafood</p>
            </div>
          </div>

          {/* Highlight 3: Live Opening Status */}
          <div className="flex items-center gap-3.5 p-2 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 shadow-sm">
              <Clock className="w-6 h-6 text-kerala-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border ${statusInfo.color}`}>
                  <span className={`w-2 h-2 rounded-full ${statusInfo.indicator}`} />
                  {statusInfo.text}
                </span>
              </div>
              <p className="text-xs text-neutral-600 mt-0.5 font-medium">{statusInfo.detail}</p>
            </div>
          </div>

          {/* Highlight 4: Verified Local Hospitality */}
          <div className="flex items-center gap-3.5 p-2 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-terracotta-100 border border-terracotta-300 flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-terracotta-700" />
            </div>
            <div>
              <div className="font-bold text-kerala-900 text-base">100% Naadan Taste</div>
              <p className="text-xs text-neutral-600">Pure Coconut Oil & Malabar Spices</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

