import React, { useState } from "react";
import { Calendar, Users, Clock, Phone, User, MessageSquare, CheckCircle, MessageCircle, AlertCircle } from "lucide-react";
import { createReservation } from "../../lib/storage";
import { RESTAURANT_INFO } from "../../data/restaurant";

export default function ReservationSection({ onToast }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "1:00 PM",
    guests: "2",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.phone.trim() || !formData.date) {
      setErrorMessage("Please fill in your name, phone number, and reservation date.");
      return;
    }

    setLoading(true);
    try {
      const result = await createReservation({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests, 10),
        notes: formData.notes.trim(),
      });

      setConfirmedBooking(result);
      if (onToast) {
        onToast(`Table reserved successfully for ${formData.guests} guests! Reference: ${result.id}`);
      }
    } catch (err) {
      console.error("Booking error:", err);
      setErrorMessage("Failed to submit reservation. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppBookingUrl = (booking) => {
    const text = `Hello Maveli Restaurant! I have reserved a table online (Ref: ${booking.id}) for ${booking.guests} guests on ${booking.date} at ${booking.time} under the name of ${booking.name}. Please confirm availability.`;
    return `https://wa.me/${RESTAURANT_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="reserve" className="py-20 bg-cream-100 border-t border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hospitality Context */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold-100 border border-gold-300 text-gold-800 text-xs uppercase tracking-wider font-bold">
              <Calendar className="w-3.5 h-3.5 text-gold-600" />
              Table Reservations
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-kerala-950 tracking-tight leading-tight">
              Reserve Your Feast on Banana Leaf
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Planning a weekend family reunion or festive group dinner? Reserve your table in advance to avoid waiting, especially during Saturday and Sunday peak hours.
            </p>

            <div className="p-5 rounded-2xl bg-kerala-900 text-cream-50 space-y-3 shadow-md border border-kerala-800">
              <h3 className="font-serif font-bold text-base text-gold-400">
                Reservation Policy & Hours
              </h3>
              <ul className="text-xs text-cream-200 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  Lunch Slots: 12:00 PM – 3:30 PM
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  Dinner Slots: 7:00 PM – 10:00 PM
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  Weekend Breakfast buffet is walk-in friendly from 7:00 AM!
                </li>
              </ul>
              <div className="pt-2 border-t border-kerala-800 text-xs text-cream-300 flex items-center justify-between">
                <span>Prefer to call directly?</span>
                <a href={`tel:${RESTAURANT_INFO.contact.phone}`} className="text-gold-300 font-bold hover:underline">
                  {RESTAURANT_INFO.contact.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Card */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-300 shadow-warm-lg">
              
              {confirmedBooking ? (
                /* Success Confirmation State with WhatsApp Button */
                <div className="text-center py-6 space-y-5 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-kerala-950">
                    Reservation Request Received!
                  </h3>

                  <p className="text-sm text-neutral-600 max-w-md mx-auto">
                    Thank you, <strong className="text-kerala-950">{confirmedBooking.name}</strong>. Your reservation request for{" "}
                    <strong>{confirmedBooking.guests} guests</strong> on{" "}
                    <strong>{confirmedBooking.date}</strong> at <strong>{confirmedBooking.time}</strong> has been saved.
                  </p>

                  <div className="p-4 rounded-xl bg-cream-100 border border-cream-300 max-w-sm mx-auto text-xs text-left space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Booking Reference:</span>
                      <strong className="text-kerala-950">{confirmedBooking.id}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Phone:</span>
                      <span>{confirmedBooking.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Status:</span>
                      <span className="font-semibold text-amber-700">Pending Restaurant Confirmation</span>
                    </div>
                  </div>

                  {/* Required "Confirm on WhatsApp" button */}
                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppBookingUrl(confirmedBooking)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Confirm on WhatsApp
                    </a>

                    <button
                      onClick={() => setConfirmedBooking(null)}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold"
                    >
                      Book Another Table
                    </button>
                  </div>
                </div>
              ) : (
                /* The Booking Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Anand Menon"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white text-sm focus:border-gold-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98450 XXXXX"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white text-sm focus:border-gold-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Date */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white text-sm focus:border-gold-500 transition-colors"
                      />
                    </div>

                    {/* Time Slot */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Time Slot
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white text-sm focus:border-gold-500 transition-colors"
                      >
                        <option value="12:30 PM">12:30 PM (Lunch)</option>
                        <option value="1:00 PM">1:00 PM (Lunch)</option>
                        <option value="1:30 PM">1:30 PM (Lunch)</option>
                        <option value="2:00 PM">2:00 PM (Lunch)</option>
                        <option value="2:30 PM">2:30 PM (Lunch)</option>
                        <option value="7:00 PM">7:00 PM (Dinner)</option>
                        <option value="7:30 PM">7:30 PM (Dinner)</option>
                        <option value="8:00 PM">8:00 PM (Dinner)</option>
                        <option value="8:30 PM">8:30 PM (Dinner)</option>
                        <option value="9:00 PM">9:00 PM (Dinner)</option>
                      </select>
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Guests
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white text-sm focus:border-gold-500 transition-colors"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5 Guests</option>
                        <option value="6">6 Guests</option>
                        <option value="8">8+ Guests (Large Table)</option>
                        <option value="12">12+ Guests (Party)</option>
                      </select>
                    </div>
                  </div>

                  {/* Special Requests / Notes */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Special Requests / Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      rows="2"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="e.g. Birthday celebration, prefer high chairs for toddler, quiet table"
                      className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white text-sm focus:border-gold-500 transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-kerala-900 hover:bg-kerala-800 text-cream-50 font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Reserving Table...</span>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 text-gold-400" />
                          Submit Table Reservation
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-neutral-500 text-center mt-2">
                      Instant reservation request saved to system with WhatsApp confirmation option.
                    </p>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

