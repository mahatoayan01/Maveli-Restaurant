import React from "react";
import { Star, MessageSquareQuote, CheckCircle, ExternalLink, ArrowRight } from "lucide-react";
import { REVIEWS_DATA } from "../../data/reviews";
import { RESTAURANT_INFO } from "../../data/restaurant";

export default function ReviewsSection() {
  const { summary, reviews } = REVIEWS_DATA;

  return (
    <section className="py-20 bg-cream-100 border-t border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Rating Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold-100 border border-gold-300 text-gold-800 text-xs uppercase tracking-wider font-bold mb-3">
              <Star className="w-3.5 h-3.5 fill-gold-600 text-gold-600" />
              Customer Stories
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-kerala-950 tracking-tight">
              Loved by Foodies in RR Nagar
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-xl">
              Authentic reviews shared by diners who visited our branch on BHEL Main Road and ordered online.
            </p>
          </div>

          {/* Rating Summary Pill Box */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-cream-300 shadow-warm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-serif font-bold text-4xl sm:text-5xl text-kerala-950">
                  {summary.averageRating}
                </span>
                <div className="flex flex-col">
                  <div className="flex text-gold-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">Out of 5.0 Stars</span>
                </div>
              </div>
              <p className="text-xs text-neutral-600 mt-2 font-medium">
                Based on <strong className="text-kerala-950">{summary.totalRatings}+ ratings</strong> across Google & Swiggy
              </p>
            </div>

            {/* Google Review Buttons */}
            <div className="flex flex-col gap-2.5 w-full sm:w-auto">
              <a
                href={summary.googlePlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-kerala-900 text-cream-50 hover:bg-kerala-800 text-xs font-bold shadow-sm transition-all"
              >
                Read on Google <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
              </a>
              <a
                href={summary.writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-gold-500 text-gold-800 hover:bg-gold-50 text-xs font-bold transition-all"
              >
                Write a Review
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-cream-300/80 shadow-warm hover:shadow-warm-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Author Info & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-cream-300"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-kerala-950 flex items-center gap-1">
                        {rev.authorName}
                        {rev.verified && (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                        )}
                      </h3>
                      <span className="text-[11px] text-neutral-500">{rev.date}</span>
                    </div>
                  </div>
                  <div className="flex text-gold-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Mentioned Dishes */}
              {rev.highlightDishes && (
                <div className="mt-5 pt-3 border-t border-cream-200 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] uppercase font-bold text-neutral-600 mr-1">Loved:</span>
                  {rev.highlightDishes.map((dish, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-kerala-50 text-kerala-800 px-2 py-0.5 rounded-md font-medium border border-kerala-200"
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
