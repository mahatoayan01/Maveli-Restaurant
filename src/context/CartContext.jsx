import React, { createContext, useContext, useState, useEffect } from "react";
import { RESTAURANT_INFO } from "../data/restaurant";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("maveli_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [orderType, setOrderType] = useState("delivery"); // 'delivery' or 'pickup'

  useEffect(() => {
    try {
      localStorage.setItem("maveli_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e);
    }
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          isVeg: product.isVeg,
          image: product.image,
          quantity: quantity,
        },
      ];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculations
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Delivery fee logic
  const isFreeDelivery = subtotal >= RESTAURANT_INFO.ordering.freeDeliveryThreshold;
  const deliveryFee = orderType === "delivery" 
    ? (subtotal > 0 && isFreeDelivery ? 0 : RESTAURANT_INFO.ordering.deliveryFee) 
    : 0;

  // 5% GST
  const tax = Math.round((subtotal * RESTAURANT_INFO.ordering.taxPercentage) / 100 * 100) / 100;
  const grandTotal = Math.round((subtotal + deliveryFee + tax) * 100) / 100;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
