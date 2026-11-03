import React from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Bike, 
  Store, 
  ShieldCheck, 
  ArrowLeft 
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { RESTAURANT_INFO } from "../data/restaurant";

export default function Cart() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    itemCount,
    subtotal,
    deliveryFee,
    isFreeDelivery,
    tax,
    grandTotal,
    orderType,
    setOrderType,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-cream-100 flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl border border-cream-300 shadow-warm">
          <div className="w-16 h-16 rounded-full bg-cream-200 text-neutral-400 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-serif font-bold text-2xl text-kerala-950 mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mb-6">
            Looks like you haven't added any of our delicious Kerala dishes yet. Explore our banana-leaf meals, seafood, and breakfast specials!
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-kerala-900 text-cream-50 hover:bg-kerala-800 font-bold text-xs uppercase tracking-wider shadow"
          >
            Browse Food Menu <ArrowRight className="w-4 h-4 text-gold-400" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <Link to="/menu" className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-kerala-900 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Menu
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-kerala-950 tracking-tight">
            Your Order Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Delivery / Pickup Choice Tab */}
            <div className="bg-white p-3 rounded-2xl border border-cream-300 shadow-sm flex items-center gap-2">
              <button
                onClick={() => setOrderType("delivery")}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  orderType === "delivery"
                    ? "bg-kerala-900 text-cream-50 shadow"
                    : "text-neutral-700 hover:bg-cream-100"
                }`}
              >
                <Bike className="w-4 h-4 text-gold-400" />
                Home Delivery
              </button>
              <button
                onClick={() => setOrderType("pickup")}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  orderType === "pickup"
                    ? "bg-kerala-900 text-cream-50 shadow"
                    : "text-neutral-700 hover:bg-cream-100"
                }`}
              >
                <Store className="w-4 h-4 text-gold-400" />
                Takeaway / Pickup
              </button>
            </div>

            {/* Items Card List */}
            <div className="bg-white rounded-2xl border border-cream-300 shadow-warm overflow-hidden divide-y divide-cream-200">
              {items.map((item) => (
                <div key={item.id} className="p-4 sm:p-5 flex items-center gap-4">
                  {/* Dish Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-cream-200"
                  />

                  {/* Title & Price */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className={`w-3 h-3 rounded-sm border flex items-center justify-center ${
                          item.isVeg ? "border-emerald-600" : "border-rose-700"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.isVeg ? "bg-emerald-600" : "bg-rose-700"
                          }`}
                        />
                      </span>
                      <h2 className="font-serif font-bold text-sm sm:text-base text-kerala-950 truncate">
                        {item.name}
                      </h2>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-neutral-800">
                      ₹{item.price} each
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-cream-300 rounded-xl bg-cream-50 overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 sm:p-2 text-neutral-600 hover:bg-cream-200 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2.5 sm:px-3 text-xs sm:text-sm font-bold text-kerala-950">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 sm:p-2 text-neutral-600 hover:bg-cream-200 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Item Total & Remove */}
                  <div className="text-right shrink-0">
                    <span className="font-bold text-sm sm:text-base text-kerala-950 block">
                      ₹{item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-neutral-400 hover:text-rose-600 p-1 mt-1 transition-colors"
                      title="Remove item"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart Action */}
            <div className="flex justify-between items-center text-xs">
              <Link to="/menu" className="font-bold text-kerala-900 hover:underline">
                + Add more items from menu
              </Link>
              <button
                onClick={clearCart}
                className="text-neutral-500 hover:text-rose-700 font-medium"
              >
                Clear Entire Cart
              </button>
            </div>

          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-cream-300 shadow-warm space-y-5">
              <h2 className="font-serif font-bold text-xl text-kerala-950">
                Order Bill Summary
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-neutral-600 border-b border-cream-200 pb-4">
                <div className="flex justify-between">
                  <span>Item Subtotal:</span>
                  <span className="font-semibold text-neutral-900">₹{subtotal}</span>
                </div>

                {orderType === "delivery" && (
                  <div className="flex justify-between items-center">
                    <div>
                      <span>Delivery Fee:</span>
                      {isFreeDelivery && (
                        <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                          Free Over ₹{RESTAURANT_INFO.ordering.freeDeliveryThreshold}
                        </span>
                      )}
                    </div>
                    <span className="font-semibold text-neutral-900">
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>GST Taxes (5%):</span>
                  <span className="font-semibold text-neutral-900">₹{tax}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-baseline pt-1">
                <span className="font-serif font-bold text-lg text-kerala-950">Grand Total:</span>
                <span className="font-serif font-bold text-2xl text-kerala-900">₹{grandTotal}</span>
              </div>

              {/* Free delivery hint */}
              {orderType === "delivery" && !isFreeDelivery && (
                <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  Add items worth <strong>₹{RESTAURANT_INFO.ordering.freeDeliveryThreshold - subtotal}</strong> more to unlock <strong>FREE Delivery</strong>!
                </p>
              )}

              {/* Proceed Button */}
              <Link
                to="/checkout"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-kerala-950 font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="pt-2 text-center text-xs text-neutral-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Safe & Secure Checkout Guaranteed</span>
              </div>
            </div>

            {/* Estimated Time Card */}
            <div className="p-4 rounded-2xl bg-cream-200 border border-cream-300 text-xs text-neutral-700 flex items-center justify-between">
              <span>Estimated Delivery / Preparation:</span>
              <strong className="text-kerala-950">{RESTAURANT_INFO.ordering.estimatedDeliveryTime}</strong>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

