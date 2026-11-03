import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Plus, 
  Check, 
  Flame, 
  ShoppingBag, 
  Filter, 
  Utensils, 
  X,
  Sparkles 
} from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data/menu";
import { useCart } from "../context/CartContext";
import Toast from "../components/Toast";

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState("all"); // 'all', 'veg', 'non-veg', 'spicy'
  const [toastMessage, setToastMessage] = useState("");
  const [addedItemMap, setAddedItemMap] = useState({});

  const { addToCart, itemCount, grandTotal } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item, 1);
    setAddedItemMap((prev) => ({ ...prev, [item.id]: true }));
    setToastMessage(`Added "${item.name}" to cart!`);
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchesCat = selectedCategory === "all" || item.category === selectedCategory;

      // Dietary filter match
      let matchesDiet = true;
      if (dietFilter === "veg") matchesDiet = item.isVeg;
      if (dietFilter === "non-veg") matchesDiet = !item.isVeg;
      if (dietFilter === "spicy") matchesDiet = item.isSpicy;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(q)));

      return matchesCat && matchesDiet && matchesSearch;
    });
  }, [selectedCategory, dietFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-cream-100 pb-28 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block text-xs uppercase tracking-widest text-gold-700 font-bold bg-gold-100 border border-gold-300 px-3 py-1 rounded-md mb-2">
            Maveli Culinary Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-kerala-950 tracking-tight">
            Our Traditional Kerala Menu
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            Cooked with authentic cold-pressed coconut oil, fresh ground spices, and deep passion.
          </p>
        </div>

        {/* Search & Dietary Filter Controls */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-cream-300 shadow-warm mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g., Parotta, Pollichathu, Biryani, Payasam)..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white text-sm focus:border-gold-500 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-neutral-700"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary Filter Buttons */}
            <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setDietFilter("all")}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  dietFilter === "all"
                    ? "bg-kerala-900 text-cream-50"
                    : "bg-cream-100 text-neutral-700 hover:bg-cream-200"
                }`}
              >
                All Diets
              </button>

              <button
                onClick={() => setDietFilter("veg")}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  dietFilter === "veg"
                    ? "bg-emerald-700 text-white"
                    : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Pure Veg
              </button>

              <button
                onClick={() => setDietFilter("non-veg")}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  dietFilter === "non-veg"
                    ? "bg-rose-700 text-white"
                    : "bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                Non-Veg
              </button>

              <button
                onClick={() => setDietFilter("spicy")}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1 transition-all ${
                  dietFilter === "spicy"
                    ? "bg-terracotta-600 text-white"
                    : "bg-terracotta-50 text-terracotta-800 border border-terracotta-200 hover:bg-terracotta-100"
                }`}
              >
                <Flame className="w-3.5 h-3.5 fill-current" />
                Spicy Specials
              </button>
            </div>

          </div>
        </div>

        {/* Category Sticky Navigation Tabs */}
        <div className="sticky top-16 sm:top-20 z-30 bg-cream-100/95 backdrop-blur-md py-3 mb-8 border-b border-cream-300">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-gold-500 to-gold-600 text-kerala-950 shadow-md font-bold"
                    : "bg-white text-neutral-700 hover:bg-cream-200 border border-cream-300"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-cream-300 p-8">
            <Utensils className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h3 className="font-serif font-bold text-xl text-neutral-800">No dishes match your filters</h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or reset your diet filters to view all delicious Kerala items.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setDietFilter("all");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 bg-kerala-900 text-cream-50 rounded-xl text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-2xl overflow-hidden border border-cream-300/80 shadow-warm hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image & Badges */}
                <div className="relative h-48 overflow-hidden bg-neutral-100">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Veg Indicator */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm p-1.5 rounded-md shadow">
                    <div
                      className={`w-3.5 h-3.5 border-2 flex items-center justify-center rounded-sm ${
                        dish.isVeg ? "border-emerald-600" : "border-rose-700"
                      }`}
                      title={dish.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
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

                  {/* Popular Tag */}
                  {dish.isPopular && (
                    <div className="absolute bottom-3 left-3 bg-gold-500 text-kerala-950 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow">
                      Favorite
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-kerala-950 mb-1.5 group-hover:text-gold-700 transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3 mb-4">
                      {dish.description}
                    </p>

                    {/* Tags */}
                    {dish.tags && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {dish.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-cream-200 text-neutral-600 px-2 py-0.5 rounded font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-cream-200 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-kerala-900">₹{dish.price}</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(dish)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                        addedItemMap[dish.id]
                          ? "bg-emerald-700 text-white"
                          : "bg-kerala-900 text-cream-50 hover:bg-gold-500 hover:text-kerala-950 active:scale-95"
                      }`}
                      aria-label={`Add ${dish.name} to cart`}
                    >
                      {addedItemMap[dish.id] ? (
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
        )}

      </div>

      {/* Floating Bottom Cart Bar if cart has items */}
      {itemCount > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-kerala-950 border-t border-gold-500/50 p-4 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500 text-kerala-950 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-cream-300 block font-medium">
                  {itemCount} {itemCount === 1 ? "dish" : "dishes"} selected
                </span>
                <span className="text-lg font-bold text-white">
                  ₹{grandTotal} <span className="text-xs font-normal text-cream-300">(incl. tax)</span>
                </span>
              </div>
            </div>

            <Link
              to="/cart"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 text-kerala-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-gold-500/20 transition-all"
            >
              View Cart & Checkout &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Toast Alert */}
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
}

