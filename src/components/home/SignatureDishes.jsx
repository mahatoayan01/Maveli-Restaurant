import React from "react";
import { Link } from "react-router-dom";
import { Plus, Flame, Sparkles, ArrowRight, Check } from "lucide-react";
import { MENU_ITEMS } from "../../data/menu";
import { useCart } from "../../context/CartContext";

export default function SignatureDishes({ onAddToast }) {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = React.useState(null);

  // Filter for popular signature items
  const popularDishes = MENU_ITEMS.filter((item) => item.isPopular).slice(0, 6);

  const handleAdd = (dish) => {
    addToCart(dish, 1);
    setAddedId(dish.id);
    if (onAddToast) onAddToast(`Added "${dish.name}" to cart!`);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="py-20 bg-cream-200 border-t border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold-100 border border-gold-300 text-gold-800 text-xs uppercase tracking-wider font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              Maveli Specials
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-kerala-950 tracking-tight">
              Signature Dishes & Favorites
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-xl">
              From fresh banana-leaf Sadhya to spicy Seer Fish Pollichathu, these are the creations our guests come back for.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-sm font-bold text-kerala-900 hover:text-gold-700 underline underline-offset-4 group"
            >
              View Full Menu ({MENU_ITEMS.length} dishes)
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {popularDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-2xl overflow-hidden border border-cream-300/80 shadow-warm hover:shadow-warm-lg transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-neutral-100">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Veg / Non-Veg Indicator */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm p-1.5 rounded-md shadow">
                  <div
                    className={`w-4 h-4 border-2 flex items-center justify-center rounded-sm ${
                      dish.isVeg ? "border-emerald-600" : "border-rose-700"
                    }`}
                    title={dish.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        dish.isVeg ? "bg-emerald-600" : "bg-rose-700"
                      }`}
                    />
                  </div>
                </div>

                {/* Spicy Tag */}
                {dish.isSpicy && (
                  <div className="absolute top-3 right-3 bg-terracotta-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                    <Flame className="w-3 h-3 fill-current" />
                    Spicy
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-serif font-bold text-lg text-kerala-950 group-hover:text-gold-700 transition-colors">
                      {dish.name}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                    {dish.description}
                  </p>
                </div>

                {/* Price and Add Button */}
                <div className="pt-3 border-t border-cream-200 flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-kerala-900">₹{dish.price}</span>
                  </div>

                  <button
                    onClick={() => handleAdd(dish)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      addedId === dish.id
                        ? "bg-emerald-700 text-white"
                        : "bg-kerala-900 text-cream-50 hover:bg-gold-500 hover:text-kerala-950 active:scale-95"
                    }`}
                    aria-label={`Add ${dish.name} to order`}
                  >
                    {addedId === dish.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Shortcut Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-kerala-900 text-cream-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="text-center sm:text-left">
            <h3 className="font-serif font-bold text-xl text-gold-400">Craving something specific?</h3>
            <p className="text-xs sm:text-sm text-cream-300">
              Browse our full categorized menu with Biryanis, Kerala breads, Curries, and Desserts.
            </p>
          </div>
          <Link
            to="/menu"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-kerala-950 font-bold text-xs uppercase tracking-wider transition-all shadow"
          >
            Explore Complete Menu &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}

