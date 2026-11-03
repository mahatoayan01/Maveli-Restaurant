import React from "react";
import { Link } from "react-router-dom";
import { Utensils, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-cream-100 flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-cream-300 shadow-warm">
        <span className="font-serif font-bold text-6xl sm:text-7xl text-gold-600 block mb-2">
          404
        </span>
        <h1 className="font-serif font-bold text-2xl text-kerala-950 mb-3">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
          The page or recipe you are looking for does not exist or has been moved to our traditional kitchen archives.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-kerala-900 text-cream-50 hover:bg-kerala-800 text-xs font-bold uppercase tracking-wider shadow"
          >
            <Home className="w-4 h-4 text-gold-400" /> Back to Home
          </Link>
          <Link
            to="/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-300 text-neutral-800 hover:bg-neutral-50 text-xs font-bold"
          >
            <Utensils className="w-4 h-4 text-kerala-700" /> Explore Menu
          </Link>
        </div>
      </div>
    </div>
  );
}

