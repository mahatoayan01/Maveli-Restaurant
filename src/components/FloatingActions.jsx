import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { RESTAURANT_INFO } from "../data/restaurant";

export default function FloatingActions() {
  return (
    <aside aria-label="Quick contact shortcuts" className="fixed bottom-5 right-4 z-40 sm:hidden flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={RESTAURANT_INFO.socials.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-13 h-13 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg shadow-black/25 flex items-center justify-center hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-white"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
      </a>

      {/* Call Button */}
      <a
        href={`tel:${RESTAURANT_INFO.contact.phone}`}
        aria-label={`Call Maveli Restaurant at ${RESTAURANT_INFO.contact.phone}`}
        className="w-13 h-13 bg-gradient-to-tr from-gold-500 to-gold-400 text-kerala-950 p-3.5 rounded-full shadow-lg shadow-black/25 flex items-center justify-center hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-kerala-950"
      >
        <Phone className="w-6 h-6 fill-current" />
      </a>
    </aside>
  );
}

