import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { 
  CheckCircle, 
  ShoppingBag, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Home 
} from "lucide-react";
import { RESTAURANT_INFO } from "../data/restaurant";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const location = useLocation();
  const order = location.state?.order;

  const getWhatsAppMessageUrl = () => {
    const text = `Hello Maveli Restaurant! I have placed order #${orderId} for ₹${order?.total || ""} (${order?.orderType || "food"}). Please update me on the order preparation status.`;
    return `https://wa.me/${RESTAURANT_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-cream-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Receipt Card */}
        <div className="bg-white rounded-3xl border border-cream-300 shadow-warm-lg p-6 sm:p-10 space-y-8 animate-in zoom-in-95 duration-300">
          
          {/* Header & Status */}
          <div className="text-center space-y-3 pb-6 border-b border-cream-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
              Order Confirmed & Placed
            </span>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-kerala-950">
              Thank You for Ordering!
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
              Your order has been transmitted to our kitchen. We will start preparing your fresh Kerala feast right away.
            </p>
          </div>

          {/* Reference Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-cream-100 border border-cream-300 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <span className="text-[11px] text-neutral-500 uppercase font-bold block">Order ID</span>
              <strong className="text-kerala-950 text-sm sm:text-base font-serif">{orderId}</strong>
            </div>
            <div>
              <span className="text-[11px] text-neutral-500 uppercase font-bold block">Order Type</span>
              <strong className="text-kerala-950 text-sm sm:text-base capitalize">{order?.orderType || "Delivery"}</strong>
            </div>
            <div>
              <span className="text-[11px] text-neutral-500 uppercase font-bold block">Est. Ready Time</span>
              <strong className="text-gold-700 text-sm sm:text-base">{RESTAURANT_INFO.ordering.estimatedDeliveryTime}</strong>
            </div>
            <div>
              <span className="text-[11px] text-neutral-500 uppercase font-bold block">Payment</span>
              <strong className="text-emerald-700 text-sm sm:text-base">{order?.payment?.status || "Confirmed"}</strong>
            </div>
          </div>

          {/* Items breakdown if present */}
          {order && order.items && (
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-lg text-kerala-950">Dishes Ordered:</h3>
              <div className="divide-y divide-cream-200 border-y border-cream-200">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between text-xs sm:text-sm">
                    <div>
                      <span className="font-semibold text-kerala-950">{item.name}</span>
                      <span className="text-neutral-500 block">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-kerala-900">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Total Calculation */}
              <div className="pt-2 text-right space-y-1 text-xs sm:text-sm">
                <div className="text-neutral-600">Subtotal: ₹{order.subtotal}</div>
                <div className="text-neutral-600">Delivery Fee: ₹{order.deliveryFee}</div>
                <div className="text-neutral-600">Taxes (GST): ₹{order.tax}</div>
                <div className="font-serif font-bold text-xl text-kerala-950 pt-2 border-t border-cream-200">
                  Total Paid: ₹{order.total}
                </div>
              </div>
            </div>
          )}

          {/* Customer & Address Details */}
          {order?.customer && (
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 space-y-1.5">
              <span className="font-bold text-kerala-950 block text-sm">Delivery / Pickup Info:</span>
              <p><strong>Customer Name:</strong> {order.customer.name}</p>
              <p><strong>Phone:</strong> {order.customer.phone}</p>
              <p><strong>Destination:</strong> {order.customer.address}</p>
              {order.customer.notes && <p><strong>Kitchen Note:</strong> {order.customer.notes}</p>}
            </div>
          )}

          {/* WhatsApp & Call Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={getWhatsAppMessageUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider shadow transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Get Order Updates on WhatsApp
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.contact.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-neutral-300 text-neutral-800 hover:bg-neutral-50 font-semibold text-xs"
            >
              <Phone className="w-4 h-4 text-kerala-700" />
              Call Kitchen Desk
            </a>
          </div>

          {/* Back Home */}
          <div className="text-center pt-2">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-700 hover:underline">
              <Home className="w-3.5 h-3.5" /> Return to Homepage
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
