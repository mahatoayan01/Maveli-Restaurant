import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation, Bus, Car } from "lucide-react";
import { RESTAURANT_INFO } from "../../data/restaurant";

export default function ContactHoursSection() {
  return (
    <section className="py-20 bg-cream-200 border-t border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold-100 border border-gold-300 text-gold-800 text-xs uppercase tracking-wider font-bold mb-3">
            <Clock className="w-3.5 h-3.5 text-gold-600" />
            Hours & Location
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-kerala-950 tracking-tight">
            Plan Your Visit to Maveli
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            Conveniently located opposite BHEL Layout Bus Stop on BHEL Main Road in Rajarajeshwari Nagar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Hours Table & Contact summary (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Opening Hours Card */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-cream-300 shadow-warm">
              <h3 className="font-serif font-bold text-xl text-kerala-950 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold-600" />
                Dine-in & Delivery Schedule
              </h3>

              <div className="divide-y divide-cream-200 text-xs sm:text-sm">
                {RESTAURANT_INFO.hours.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between gap-2">
                    <span className="font-bold text-kerala-950 w-28 shrink-0">{item.day}</span>
                    <div className="text-right text-neutral-600 space-y-0.5">
                      {item.slots.map((slot, sIdx) => (
                        <div key={sIdx} className={slot.includes("Breakfast") ? "text-gold-700 font-semibold" : ""}>
                          {slot}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-cream-200 text-xs text-neutral-500 flex items-center justify-between">
                <span>Weekend Breakfast Buffet:</span>
                <strong className="text-gold-700">7:00 AM – 11:30 AM (Sat & Sun)</strong>
              </div>
            </div>

            {/* Contact details mini card */}
            <div className="bg-kerala-900 text-cream-50 p-6 rounded-2xl shadow-md border border-kerala-800 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gold-400 font-bold block mb-1">Direct Call:</span>
                  <a href={`tel:${RESTAURANT_INFO.contact.phone}`} className="text-cream-100 hover:text-white font-semibold text-sm">
                    {RESTAURANT_INFO.contact.phone}
                  </a>
                </div>
                <div>
                  <span className="text-gold-400 font-bold block mb-1">WhatsApp Desk:</span>
                  <a href={RESTAURANT_INFO.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="text-cream-100 hover:text-white font-semibold text-sm">
                    +91 {RESTAURANT_INFO.contact.whatsapp.slice(2)}
                  </a>
                </div>
              </div>
              <p className="text-xs text-cream-300 pt-2 border-t border-kerala-800">
                <strong>Address:</strong> {RESTAURANT_INFO.location.fullAddress}
              </p>
            </div>

          </div>

          {/* Right Column: Mini Interactive Map & Directions (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Embedded Google Map */}
            <div className="bg-white p-2 rounded-2xl border border-cream-300 shadow-warm overflow-hidden">
              <div className="h-72 sm:h-80 w-full rounded-xl overflow-hidden relative">
                <iframe
                  title="Maveli Restaurant Location Map"
                  src={RESTAURANT_INFO.location.embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Action Buttons */}
              <div className="p-4 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={RESTAURANT_INFO.location.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-kerala-900 text-cream-50 hover:bg-kerala-800 text-xs font-bold shadow-sm transition-all"
                >
                  <Navigation className="w-4 h-4 text-gold-400" />
                  Get Directions
                </a>
                <a
                  href={RESTAURANT_INFO.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-800 hover:bg-neutral-50 text-xs font-bold transition-all"
                >
                  Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Transit & Parking Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-white border border-cream-300 flex items-start gap-2.5 shadow-sm">
                <Bus className="w-4 h-4 text-kerala-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-kerala-950 block">By BMTC Bus</span>
                  <span className="text-neutral-600">Opposite BHEL Layout Bus Stop on BHEL Main Road.</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-cream-300 flex items-start gap-2.5 shadow-sm">
                <Car className="w-4 h-4 text-gold-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-kerala-950 block">Parking Info</span>
                  <span className="text-neutral-600">Two-wheeler and roadside four-wheeler parking available.</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

