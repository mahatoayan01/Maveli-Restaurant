import React, { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Clock, 
  Instagram, 
  Facebook, 
  AlertCircle 
} from "lucide-react";
import { RESTAURANT_INFO } from "../data/restaurant";
import { createMessage } from "../lib/storage";
import Toast from "../components/Toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    honeypot: "", // anti-spam bot trap
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Spam honeypot detection: if honeypot is filled, discard silently
    if (formData.honeypot) {
      setSubmitted(true);
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    setLoading(true);
    try {
      await createMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim() || "General Inquiry",
        message: formData.message.trim(),
      });

      setSubmitted(true);
      setToastMessage("Your message has been sent to Maveli Restaurant!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        honeypot: "",
      });
    } catch (err) {
      console.error("Message sending error:", err);
      setErrorMsg("Failed to send message. Please reach out to us by phone or WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-widest text-gold-700 font-bold bg-gold-100 border border-gold-300 px-3 py-1 rounded-md mb-2">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-kerala-950 tracking-tight">
            Contact Maveli Restaurant
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            Have a question about our menu, weekend buffet, catering, or bulk party orders? We are here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-kerala-900 text-cream-50 p-7 rounded-3xl shadow-warm border border-kerala-800 space-y-6">
              <h2 className="font-serif font-bold text-2xl text-gold-400">
                Reach Out Directly
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-kerala-800 flex items-center justify-center text-gold-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-cream-400 block text-[11px] uppercase tracking-wider font-semibold">Phone</span>
                    <a href={`tel:${RESTAURANT_INFO.contact.phone}`} className="font-bold text-cream-100 hover:text-gold-300 text-base">
                      {RESTAURANT_INFO.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-kerala-800 flex items-center justify-center text-gold-400 shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-cream-400 block text-[11px] uppercase tracking-wider font-semibold">WhatsApp Chat</span>
                    <a href={RESTAURANT_INFO.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-cream-100 hover:text-gold-300">
                      +91 {RESTAURANT_INFO.contact.whatsapp.slice(2)}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-kerala-800 flex items-center justify-center text-gold-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-cream-400 block text-[11px] uppercase tracking-wider font-semibold">Email</span>
                    <a href={`mailto:${RESTAURANT_INFO.contact.email}`} className="text-cream-200 hover:text-gold-300">
                      {RESTAURANT_INFO.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-kerala-800 flex items-center justify-center text-gold-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-cream-400 block text-[11px] uppercase tracking-wider font-semibold">Address</span>
                    <p className="text-cream-200 leading-relaxed">
                      {RESTAURANT_INFO.location.fullAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-kerala-800">
                <span className="text-xs uppercase tracking-wider text-gold-400 font-bold block mb-3">
                  Social Channels
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={RESTAURANT_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-kerala-800 hover:bg-gold-500 hover:text-kerala-950 transition-colors text-gold-400"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={RESTAURANT_INFO.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-kerala-800 hover:bg-gold-500 hover:text-kerala-950 transition-colors text-gold-400"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={RESTAURANT_INFO.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-kerala-800 hover:bg-gold-500 hover:text-kerala-950 transition-colors text-gold-400"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a
                    href={RESTAURANT_INFO.socials.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-kerala-800 hover:bg-gold-500 hover:text-kerala-950 transition-colors text-gold-400"
                    aria-label="Google Maps"
                  >
                    <MapPin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Timings Quick Glance */}
            <div className="bg-white p-6 rounded-2xl border border-cream-300 shadow-sm space-y-2 text-xs">
              <h3 className="font-bold text-sm text-kerala-950 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gold-600" />
                Dine-in Timings
              </h3>
              <p className="text-neutral-600">
                <strong>Mon – Fri:</strong> 12:00 PM – 4:00 PM, 7:00 PM – 10:30 PM
              </p>
              <p className="text-neutral-600">
                <strong>Sat – Sun:</strong> 7:00 AM – 4:00 PM, 7:00 PM – 10:30 PM
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form with Honeypot (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-300 shadow-warm-lg">
              <h2 className="font-serif font-bold text-2xl text-kerala-950 mb-2">
                Send a Message
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mb-6">
                Fill in the form below and our management will get back to you promptly.
              </p>

              {submitted ? (
                <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-kerala-950">Thank You!</h3>
                  <p className="text-sm text-neutral-600 max-w-sm mx-auto">
                    Your inquiry has been received. Our team will review your message and reply via phone or email shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 bg-kerala-900 text-cream-50 rounded-xl text-xs font-semibold hover:bg-kerala-800"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Anti-spam Honeypot (Hidden from humans, bots fill it) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="honeypot">Do not fill this</label>
                    <input
                      id="honeypot"
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Shenoy"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white text-sm focus:border-gold-500 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. ramesh@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white text-sm focus:border-gold-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98450 XXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white text-sm focus:border-gold-500 transition-colors"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Catering quote / Feedback"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white text-sm focus:border-gold-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please let us know how we can assist you..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white text-sm focus:border-gold-500 transition-colors"
                    />
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-kerala-900 hover:bg-kerala-800 text-cream-50 font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-gold-400" />
                          Send Inquiry
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>

      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
}

