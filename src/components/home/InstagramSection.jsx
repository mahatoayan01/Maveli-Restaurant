import React from "react";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { INSTAGRAM_CONFIG } from "../../data/instagram";

export default function InstagramSection() {
  if (!INSTAGRAM_CONFIG || !INSTAGRAM_CONFIG.enabled) {
    return null;
  }

  return (
    <section className="py-20 bg-cream-200 border-t border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs uppercase tracking-wider font-bold mb-3">
            <Instagram className="w-3.5 h-3.5 text-rose-600" />
            Social Wall
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-kerala-950 tracking-tight">
            Follow the Flavor
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            {INSTAGRAM_CONFIG.tagline}
          </p>
          <div className="mt-4">
            <a
              href={INSTAGRAM_CONFIG.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg hover:opacity-95 transition-all"
            >
              <Instagram className="w-4 h-4" />
              Follow {INSTAGRAM_CONFIG.displayHandle}
            </a>
          </div>
        </div>

        {/* Post Grid (6 to 9 items) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_CONFIG.posts.map((post) => (
            <a
              key={post.id}
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-200 shadow-sm block"
            >
              <img
                src={post.image}
                alt="Instagram post preview"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-kerala-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-white text-center">
                <div className="flex items-center gap-3 text-xs font-bold mb-2">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                    {post.comments}
                  </span>
                </div>
                <p className="text-[11px] line-clamp-2 text-cream-200 font-light leading-snug">
                  {post.caption}
                </p>
                <div className="mt-2 text-[10px] text-gold-400 font-semibold flex items-center gap-1">
                  View on Instagram <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
