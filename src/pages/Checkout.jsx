import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  ShieldCheck, 
  CreditCard, 
  Banknote, 
  Store, 
  MapPin, 
  Phone, 
  User, 
  AlertCircle, 
  ArrowLeft,
  CheckCircle,
  Clock,
  Sparkles
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../lib/storage";
import { RESTAURANT_INFO } from "../data/restaurant";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, deliveryFee, tax, grandTotal, orderType, clearCart } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: orderType === "pickup" ? "Takeaway Pickup at Restaurant" : "",
    landmark: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("razorpay"); // 'razorpay', 'cod', 'counter'
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [razorpayMethodSelected, setRazorpayMethodSelected] = useState("upi");

  // Redirect to menu if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif font-bold text-2xl text-kerala-950 mb-2">No items to checkout</h2>
        <p className="text-neutral-600 text-sm mb-4">Please add dishes to your cart before proceeding.</p>
        <Link to="/menu" className="px-5 py-2.5 bg-kerala-900 text-white rounded-xl text-xs font-bold">
          Go to Menu
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const validateForm = () => {
    if (!customer.name.trim()) {
      setErrorMsg("Please provide your full name.");
      return false;
    }
    if (!customer.phone.trim() || customer.phone.trim().length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return false;
    }
    if (orderType === "delivery" && !customer.address.trim()) {
      setErrorMsg("Please provide your delivery address in Bengaluru.");
      return false;
    }
    return true;
  };

  const handleProceedPayment = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (paymentMethod === "razorpay") {
      // Trigger Razorpay Test Mode simulator modal
      setShowRazorpayModal(true);
    } else {
      finalizeOrder({
        method: paymentMethod === "cod" ? "Cash on Delivery" : "Pay at Restaurant",
        id: `pay_manual_${Date.now()}`,
        status: "Pending"
      });
    }
  };

  const finalizeOrder = async (paymentDetails) => {
    setLoading(true);
    try {
      const generatedOrderId = `MVL-${Math.floor(1000 + Math.random() * 9000)}`;

      const orderData = {
        id: generatedOrderId,
        customer: {
          name: customer.name.trim(),
          phone: customer.phone.trim(),
          address: orderType === "delivery" 
            ? `${customer.address.trim()}${customer.landmark ? ` (Landmark: ${customer.landmark.trim()})` : ""}` 
            : "Takeaway Counter Pickup (Maveli Restaurant, BHEL Main Rd)",
          notes: customer.notes.trim(),
        },
        items: items.map(i => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          isVeg: i.isVeg
        })),
        orderType: orderType,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        tax: tax,
        total: grandTotal,
        status: "Pending", // Pending, Confirmed, Preparing, Out for Delivery, Completed
        payment: {
          id: paymentDetails.id,
          method: paymentDetails.method,
          status: paymentDetails.status,
          amount: grandTotal,
        },
      };

      await createOrder(orderData);
      clearCart();
      navigate(`/order-confirmation/${generatedOrderId}`, { state: { order: orderData } });
    } catch (err) {
      console.error("Order completion failed:", err);
      setErrorMsg("An error occurred while creating your order. Please try again.");
    } finally {
      setLoading(false);
      setShowRazorpayModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="mb-8">
          <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-kerala-900 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-kerala-950 tracking-tight">
            Checkout & Confirmation
          </h1>
        </div>

        <form onSubmit={handleProceedPayment}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Customer Details & Payment Options (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {errorMsg && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Customer Contact & Address Card */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-cream-300 shadow-warm space-y-4">
                <h2 className="font-serif font-bold text-xl text-kerala-950 flex items-center gap-2">
                  <User className="w-5 h-5 text-gold-600" />
                  Customer Details ({orderType === "delivery" ? "Delivery" : "Takeaway"})
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={customer.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Suresh Pillai"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white text-sm focus:border-gold-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      10-Digit Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={customer.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98450 XXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white text-sm focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>

                {orderType === "delivery" ? (
                  <>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Delivery Address in RR Nagar / Bengaluru *
                      </label>
                      <textarea
                        name="address"
                        required
                        rows="3"
                        value={customer.address}
                        onChange={handleInputChange}
                        placeholder="House / Flat No., Apartment Name, Street, Area"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white text-sm focus:border-gold-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Nearby Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        name="landmark"
                        value={customer.landmark}
                        onChange={handleInputChange}
                        placeholder="e.g. Near Kittur Chennamma Park / BHEL Bus Stop"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white text-sm focus:border-gold-500 transition-colors"
                      />
                    </div>
                  </>
                ) : (
                  <div className="p-4 rounded-xl bg-kerala-50 border border-kerala-200 text-xs text-kerala-900 flex items-start gap-2">
                    <Store className="w-4 h-4 text-kerala-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block">Pickup Point:</strong>
                      <span>Maveli Restaurant Counter, 405 BHEL Main Road, Opp. BHEL Layout Bus Stop, Rajarajeshwari Nagar, Bengaluru.</span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Cooking or Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    name="notes"
                    value={customer.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. Extra spicy, pack sambar separately, ring doorbell"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white text-sm focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>

              {/* Payment Methods Selection */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-cream-300 shadow-warm space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif font-bold text-xl text-kerala-950 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-gold-600" />
                    Payment Options (India)
                  </h2>
                  <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                    Test Mode Active
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Option 1: Razorpay (UPI, Cards, NetBanking) */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === "razorpay"
                        ? "border-gold-500 bg-gold-50/50 shadow-sm"
                        : "border-cream-300 hover:bg-cream-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={() => setPaymentMethod("razorpay")}
                      className="mt-1 text-gold-600 focus:ring-gold-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-kerala-950">
                          Razorpay (UPI / Google Pay / PhonePe / Cards / Net Banking)
                        </span>
                        <span className="text-xs font-semibold text-emerald-700">Recommended</span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">
                        Instant online checkout in Razorpay test mode. No real money deducted.
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Cash on Delivery or Pay at Restaurant */}
                  {orderType === "delivery" ? (
                    <label
                      className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === "cod"
                          ? "border-gold-500 bg-gold-50/50 shadow-sm"
                          : "border-cream-300 hover:bg-cream-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="mt-1 text-gold-600 focus:ring-gold-500"
                      />
                      <div className="flex-1">
                        <span className="font-bold text-sm text-kerala-950">
                          Cash on Delivery (COD)
                        </span>
                        <p className="text-xs text-neutral-500 mt-1">
                          Pay cash or UPI directly to our delivery rider when your food arrives.
                        </p>
                      </div>
                    </label>
                  ) : (
                    <label
                      className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === "counter"
                          ? "border-gold-500 bg-gold-50/50 shadow-sm"
                          : "border-cream-300 hover:bg-cream-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="counter"
                        checked={paymentMethod === "counter"}
                        onChange={() => setPaymentMethod("counter")}
                        className="mt-1 text-gold-600 focus:ring-gold-500"
                      />
                      <div className="flex-1">
                        <span className="font-bold text-sm text-kerala-950">
                          Pay at Counter
                        </span>
                        <p className="text-xs text-neutral-500 mt-1">
                          Pay via UPI, cash, or card when picking up at Maveli Restaurant counter.
                        </p>
                      </div>
                    </label>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary & Place Order Button (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-cream-300 shadow-warm space-y-4">
                <h2 className="font-serif font-bold text-xl text-kerala-950 border-b border-cream-200 pb-3">
                  Order Breakdown
                </h2>

                {/* Items mini list */}
                <div className="max-h-56 overflow-y-auto divide-y divide-cream-100 pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="py-2.5 flex justify-between text-xs">
                      <div>
                        <span className="font-semibold text-neutral-900">{item.name}</span>
                        <span className="text-neutral-500 block">x {item.quantity}</span>
                      </div>
                      <span className="font-bold text-neutral-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Cost calculation */}
                <div className="space-y-2 text-xs border-t border-cream-200 pt-3 text-neutral-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-neutral-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span className="font-semibold text-neutral-900">
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%):</span>
                    <span className="font-semibold text-neutral-900">₹{tax}</span>
                  </div>
                </div>

                {/* Final Total */}
                <div className="flex justify-between items-baseline pt-2 border-t border-cream-200">
                  <span className="font-serif font-bold text-base text-kerala-950">Total Payable:</span>
                  <span className="font-serif font-bold text-2xl text-kerala-900">₹{grandTotal}</span>
                </div>

                {/* Action button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-kerala-950 font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  {paymentMethod === "razorpay" ? `Pay ₹${grandTotal} with Razorpay` : "Confirm & Place Order"}
                </button>

                <p className="text-[11px] text-neutral-500 text-center">
                  By clicking, you confirm this order with Maveli Restaurant.
                </p>
              </div>
            </div>

          </div>
        </form>

      </div>

      {/* Razorpay Test Mode Checkout Modal Simulator */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-cream-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-cream-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  R
                </div>
                <div>
                  <h3 className="font-bold text-sm text-neutral-900">Razorpay Checkout</h3>
                  <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">
                    TEST MODE (Mock Gateway)
                  </span>
                </div>
              </div>
              <span className="text-base font-bold text-kerala-950">₹{grandTotal}</span>
            </div>

            {/* Test Details */}
            <div className="py-4 space-y-3">
              <p className="text-xs text-neutral-600">
                Paying to: <strong className="text-kerala-950">Maveli Restaurant (RR Nagar)</strong>
              </p>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1">
                <p className="font-semibold">Razorpay Test Gateway Integration</p>
                <p className="text-[11px] text-blue-700">
                  Key ID: <code className="bg-white px-1 py-0.5 rounded">{import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_MaveliDemoKey123"}</code>
                </p>
              </div>

              {/* Method radio in test dialog */}
              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold cursor-pointer">
                  <input
                    type="radio"
                    name="rzp_type"
                    checked={razorpayMethodSelected === "upi"}
                    onChange={() => setRazorpayMethodSelected("upi")}
                  />
                  <span>UPI / Google Pay / PhonePe (Test Instant Success)</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold cursor-pointer">
                  <input
                    type="radio"
                    name="rzp_type"
                    checked={razorpayMethodSelected === "card"}
                    onChange={() => setRazorpayMethodSelected("card")}
                  />
                  <span>Test Visa / Mastercard (Demo Card)</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-cream-200 flex gap-2">
              <button
                type="button"
                onClick={() => setShowRazorpayModal(false)}
                className="flex-1 py-2.5 border border-neutral-300 text-neutral-700 rounded-xl text-xs font-semibold hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() =>
                  finalizeOrder({
                    id: `pay_rzp_${Date.now()}`,
                    method: `Razorpay (${razorpayMethodSelected.toUpperCase()})`,
                    status: "Success"
                  })
                }
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow"
              >
                Simulate Success
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
