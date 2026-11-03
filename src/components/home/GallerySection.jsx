import React, { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { GALLERY_ITEMS } from "../../data/gallery";

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const categories = [
    { id: "all", name: "All Photos" },
    { id: "food", name: "Culinary Highlights" },
    { id: "ambience", name: "Ambience" },
    { id: "specials", name: "Weekend Specials" },
  ];

  const filteredItems = activeTab === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  const openLightbox = (index) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section className="py-20 bg-cream-200 border-t border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold-100 border border-gold-300 text-gold-800 text-xs uppercase tracking-wider font-bold mb-3">
            <ImageIcon className="w-3.5 h-3.5 text-gold-600" />
            Visual Glimpse
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-kerala-950 tracking-tight">
            Moments at Maveli
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">
            A feast for your eyes: our banana leaf feasts, searing clay pot curries, and warm family dining ambience.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === cat.id
                    ? "bg-kerala-900 text-cream-50 shadow-md"
                    : "bg-white text-neutral-700 hover:bg-cream-100 border border-cream-300"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-warm hover:shadow-warm-lg bg-neutral-200"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-kerala-950/90 via-kerala-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-gold-300">{item.title}</h3>
                  <div className="w-8 h-8 rounded-full bg-gold-500 text-kerala-950 flex items-center justify-center shadow">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-cream-200 line-clamp-1 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && filteredItems[activeImageIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-cream-200 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-100 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors z-50"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cream-100 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors z-50"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Content Card */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[activeImageIndex].image}
              alt={filteredItems[activeImageIndex].title}
              className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="font-serif font-bold text-xl text-gold-400">
                {filteredItems[activeImageIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-cream-200 mt-1">
                {filteredItems[activeImageIndex].description}
              </p>
              <span className="text-[11px] text-cream-400 mt-2 block">
                {activeImageIndex + 1} of {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

