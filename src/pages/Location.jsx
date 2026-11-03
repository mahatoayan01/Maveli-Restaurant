import React from "react";
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Clock, 
  Bus, 
  Train, 
  Car, 
  Phone, 
  ShieldCheck, 
  Compass 
} from "lucide-react";
import { RESTAURANT_INFO } from "../data/restaurant";

export default function Location() {
  return (
    <div className="min-h-screen bg-cream-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs uppercase tracking-widest text-gold-700 font-bold bg-gold-100 border border-gold-300 px-3 py-1 rounded-md mb-2">
            Location & Directions
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-kerala-950 tracking-tight">
            Visit Maveli Restaurant
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            Conveniently situated on BHEL Main Road in Rajarajeshwari Nagar, Bengaluru.
          </p>
        </div>

        {/* Top Info Banner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Card 1: Address */}
          <div className="bg-white p-6 rounded-2xl border border-cream-300 shadow-warm">
            <div className="w-10 h-10 rounded-xl bg-kerala-100 flex items-center justify-center text-kerala-800 mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="font-serif font-bold text-lg text-kerala-950 mb-2">Our Address</h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
              {RESTAURANT_INFO.location.fullAddress}
            </p>
            <span className="text-xs font-semibold text-gold-700 block">
              Landmark: {RESTAURANT_INFO.location.landmark}
            </span>
          </div>

          {/* Card 2: Operating Hours Summary */}
          <div className="bg-white p-6 rounded-2xl border border-cream-300 shadow-warm">
            <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center text-gold-800 mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="font-serif font-bold text-lg text-kerala-950 mb-2">Timings</h2>
            <div className="text-xs sm:text-sm text-neutral-600 space-y-1 mb-3">
              <p><strong className="text-kerala-950">Mon – Fri:</strong> 12:00 PM – 4:00 PM | 7:00 PM – 10:30 PM</p>
              <p><strong className="text-kerala-950">Sat – Sun:</strong> 7:00 AM – 4:00 PM | 7:00 PM – 10:30 PM</p>
            </div>
            <span className="text-xs text-neutral-500 italic block">
              *Weekend breakfast starts 7:00 AM!
            </span>
          </div>

          {/* Card 3: Contact & Bookings */}
          <div className="bg-white p-6 rounded-2xl border border-cream-300 shadow-warm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-terracotta-100 flex items-center justify-center text-terracotta-800 mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h2 className="font-serif font-bold text-lg text-kerala-950 mb-2">Get in Touch</h2>
              <p className="text-xs sm:text-sm text-neutral-600 mb-1">
                Call our reception for table bookings, takeaway orders, or catering inquiries.
              </p>
              <a
                href={`tel:${RESTAURANT_INFO.contact.phone}`}
                className="text-base font-bold text-kerala-900 hover:text-gold-700 block mt-2"
              >
                {RESTAURANT_INFO.contact.phone}
              </a>
            </div>
            <div className="pt-3">
              <a
                href={RESTAURANT_INFO.location.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-700 hover:underline"
              >
                Get Real-time Traffic Directions &rarr;
              </a>
            </div>
          </div>

        </div>

        {/* Embedded Interactive Map & Directions */}
        <div className="bg-white p-3 sm:p-4 rounded-3xl border border-cream-300 shadow-warm-lg mb-12 overflow-hidden">
          <div className="h-96 sm:h-[480px] w-full rounded-2xl overflow-hidden relative">
            <iframe
              title="Maveli Restaurant Google Map"
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

          <div className="p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-t border-cream-200 mt-2">
            <div>
              <h3 className="font-serif font-bold text-lg text-kerala-950">
                Maveli Restaurant, Pattanagere, RR Nagar
              </h3>
              <p className="text-xs text-neutral-500">
                GPS Coordinates: {RESTAURANT_INFO.location.coordinates.lat}° N, {RESTAURANT_INFO.location.coordinates.lng}° E
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={RESTAURANT_INFO.location.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-kerala-900 text-cream-50 hover:bg-kerala-800 font-bold text-xs uppercase tracking-wider shadow transition-all"
              >
                <Navigation className="w-4 h-4 text-gold-400" />
                Get Directions
              </a>
              <a
                href={RESTAURANT_INFO.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-300 text-neutral-800 hover:bg-neutral-50 font-semibold text-xs transition-all"
              >
                Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Travel Tips & Landmark Details */}
        <div className="bg-cream-200 rounded-3xl border border-cream-300 p-8 sm:p-10 mb-12">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-kerala-950 mb-6 flex items-center gap-2">
            <Compass className="w-6 h-6 text-gold-600" />
            Travel Tips & How to Reach Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* By BMTC Bus */}
            <div className="bg-white p-6 rounded-2xl border border-cream-300 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5">
                <Bus className="w-5 h-5 text-kerala-800" />
                <h3 className="font-bold text-base text-kerala-950">By City Bus (BMTC)</h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Maveli Restaurant is located directly opposite the <strong>BHEL Layout Bus Stop</strong>. Frequent BMTC buses connect from Majestic, Market, Kengeri, and Mysore Road.
              </p>
            </div>

            {/* By Namma Metro */}
            <div className="bg-white p-6 rounded-2xl border border-cream-300 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5">
                <Train className="w-5 h-5 text-gold-700" />
                <h3 className="font-bold text-base text-kerala-950">By Namma Metro</h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                The closest metro stations on the Purple Line are <strong>Jnana Bharati</strong> and <strong>Rajarajeshwari Nagar Metro Station</strong> (approx. 2.5 km away, a short 5-minute auto ride).
              </p>
            </div>

            {/* By Car / Two-Wheeler */}
            <div className="bg-white p-6 rounded-2xl border border-cream-300 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5">
                <Car className="w-5 h-5 text-terracotta-700" />
                <h3 className="font-bold text-base text-kerala-950">Parking & Accessibility</h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {RESTAURANT_INFO.location.parkingInfo} Adjacent to Kittur Rani Chennamma Park with convenient road frontage.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

