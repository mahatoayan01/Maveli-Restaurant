import React, { useState } from "react";
import Hero from "../components/home/Hero";
import HighlightsStrip from "../components/home/HighlightsStrip";
import AboutSection from "../components/home/AboutSection";
import SignatureDishes from "../components/home/SignatureDishes";
import WhyChooseUs from "../components/home/WhyChooseUs";
import GallerySection from "../components/home/GallerySection";
import ReviewsSection from "../components/home/ReviewsSection";
import InstagramSection from "../components/home/InstagramSection";
import ReservationSection from "../components/home/ReservationSection";
import ContactHoursSection from "../components/home/ContactHoursSection";
import CtaBanner from "../components/home/CtaBanner";
import Toast from "../components/Toast";

export default function Home() {
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  return (
    <main className="flex-1">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Highlights Strip */}
      <HighlightsStrip />

      {/* 3. About / Our Story */}
      <AboutSection />

      {/* 4. Signature dishes / Popular items */}
      <SignatureDishes onAddToast={showToast} />

      {/* 5. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. Gallery */}
      <GallerySection />

      {/* 7. Customer Reviews Section */}
      <ReviewsSection />

      {/* 8. Instagram Section */}
      <InstagramSection />

      {/* 9. Reservation / Table booking form */}
      <ReservationSection onToast={showToast} />

      {/* 10. Opening hours + mini map + contact summary */}
      <ContactHoursSection />

      {/* 11. Final CTA Banner */}
      <CtaBanner />

      {/* Global Toast for feedback */}
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </main>
  );
}

