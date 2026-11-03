import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";

// Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Location from "./pages/Location";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerDashboard from "./pages/OwnerDashboard";
import NotFound from "./pages/NotFound";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Layout wrapper that hides customer header/footer on owner admin pages
function LayoutWrapper({ children }) {
  const location = useLocation();
  const isOwnerRoute = location.pathname.startsWith("/owner");

  return (
    <div className="flex flex-col min-h-screen">
      {!isOwnerRoute && <Navbar />}
      <div className="flex-1">{children}</div>
      {!isOwnerRoute && <Footer />}
      {!isOwnerRoute && <FloatingActions />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <LayoutWrapper>
            <Routes>
              {/* Customer Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/location" element={<Location />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />

              {/* Private Owner Routes */}
              <Route path="/owner/login" element={<OwnerLogin />} />
              <Route path="/owner" element={<OwnerDashboard />} />

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LayoutWrapper>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
