import { db, isFirebaseConfigured } from "./firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  query,
  orderBy 
} from "firebase/firestore";
import { MENU_ITEMS } from "../data/menu";
import { RESTAURANT_INFO } from "../data/restaurant";

// Initial seed mock orders for owner dashboard demonstration
const INITIAL_SEED_ORDERS = [
  {
    id: "MVL-8901",
    customer: {
      name: "Suresh Pillai",
      phone: "+91 98450 12345",
      address: "Flat 402, Green Glen Layout, RR Nagar, Bengaluru",
      notes: "Please deliver piping hot. Extra onion salad."
    },
    items: [
      { id: "meal-veg", name: "Kerala Vegetarian Banana Leaf Meal", price: 130, quantity: 2 },
      { id: "starter-seer-pollichathu", name: "Seer Fish Pollichathu (Signature)", price: 280, quantity: 1 },
      { id: "dessert-nei-payasam", name: "Nei Payasam (Ambalapuzha Style)", price: 85, quantity: 2 }
    ],
    orderType: "delivery",
    subtotal: 710,
    deliveryFee: 0,
    tax: 35.5,
    total: 745.5,
    status: "Preparing", // Pending, Confirmed, Preparing, Out for Delivery, Completed, Cancelled
    payment: {
      id: "pay_test_8901abc",
      method: "Razorpay (UPI)",
      status: "Paid",
      amount: 745.5
    },
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString()
  },
  {
    id: "MVL-8902",
    customer: {
      name: "Meera Krishnan",
      phone: "+91 97412 67890",
      address: "Takeaway Counter",
      notes: "Pack well in hot foil."
    },
    items: [
      { id: "bfast-buffet", name: "Weekend Unlimited Breakfast Buffet", price: 120, quantity: 3 }
    ],
    orderType: "pickup",
    subtotal: 360,
    deliveryFee: 0,
    tax: 18,
    total: 378,
    status: "Ready for Pickup",
    payment: {
      id: "pay_cod_8902",
      method: "Pay at Counter",
      status: "Pending",
      amount: 378
    },
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString()
  },
  {
    id: "MVL-8903",
    customer: {
      name: "Anand R.",
      phone: "+91 99001 22334",
      address: "12, 5th Cross, Ideal Homes Twp, RR Nagar",
      notes: ""
    },
    items: [
      { id: "starter-kada-fry", name: "Kada Fry (Quail Pepper Fry)", price: 170, quantity: 2 },
      { id: "bread-parotta", name: "Kerala Parotta (Layered)", price: 25, quantity: 4 }
    ],
    orderType: "delivery",
    subtotal: 440,
    deliveryFee: 40,
    tax: 22,
    total: 502,
    status: "Pending",
    payment: {
      id: "pay_test_8903xyz",
      method: "Razorpay (Card)",
      status: "Paid",
      amount: 502
    },
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString()
  }
];

const INITIAL_SEED_RESERVATIONS = [
  {
    id: "RES-101",
    name: "Dr. K. V. Joseph",
    phone: "+91 94480 34567",
    email: "kvjoseph@gmail.com",
    guests: 4,
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    time: "1:30 PM",
    notes: "Family reunion lunch. Please reserve a quiet corner table.",
    status: "Confirmed",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "RES-102",
    name: "Pooja Hegde",
    phone: "+91 88840 56789",
    email: "pooja.h@yahoo.com",
    guests: 2,
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    time: "8:00 PM",
    notes: "Anniversary dinner celebration.",
    status: "Pending",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  }
];

const INITIAL_SEED_MESSAGES = [
  {
    id: "MSG-01",
    name: "Rajesh Varma",
    email: "rvarma@outlook.com",
    phone: "+91 98860 11223",
    subject: "Catering for Birthday Party (40 people)",
    message: "We are hosting a family gathering in RR Nagar next month and would like a quote for a Kerala Banana leaf Sadhya catering package for 40 people.",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    isRead: false
  }
];

// Helper to get from LocalStorage or seed
function getLocalItem(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setLocalItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Local storage error:", e);
  }
}

// ========================
// ORDERS
// ========================
export async function getOrders() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (orders.length > 0) return orders;
    } catch (e) {
      console.warn("Firestore error getting orders, using local store:", e);
    }
  }
  return getLocalItem("maveli_orders", INITIAL_SEED_ORDERS);
}

export async function createOrder(orderData) {
  const newOrder = {
    ...orderData,
    id: orderData.id || `MVL-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    status: orderData.status || "Pending",
  };

  if (isFirebaseConfigured && db) {
    try {
      await addDoc(collection(db, "orders"), {
        ...newOrder,
        timestamp: serverTimestamp()
      });
    } catch (e) {
      console.warn("Firestore error adding order:", e);
    }
  }

  // Also update local storage
  const currentOrders = getLocalItem("maveli_orders", INITIAL_SEED_ORDERS);
  const updatedOrders = [newOrder, ...currentOrders];
  setLocalItem("maveli_orders", updatedOrders);

  // If order has payment, record it in payments list too
  if (newOrder.payment) {
    await recordPayment({
      paymentId: newOrder.payment.id || `pay_${Date.now()}`,
      orderId: newOrder.id,
      customerName: newOrder.customer?.name || "Customer",
      method: newOrder.payment.method || "Online",
      amount: newOrder.total,
      status: newOrder.payment.status || "Success",
      createdAt: newOrder.createdAt
    });
  }

  return newOrder;
}

export async function updateOrderStatus(orderId, status) {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "orders", orderId);
      await updateDoc(docRef, { status });
    } catch (e) {
      console.warn("Firestore error updating order status:", e);
    }
  }
  const currentOrders = getLocalItem("maveli_orders", INITIAL_SEED_ORDERS);
  const updated = currentOrders.map(order => 
    order.id === orderId ? { ...order, status } : order
  );
  setLocalItem("maveli_orders", updated);
  return updated;
}

// ========================
// PAYMENTS
// ========================
export async function getPayments() {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, "payments"));
      const payments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (payments.length > 0) return payments;
    } catch (e) {
      console.warn("Firestore error getting payments:", e);
    }
  }
  return getLocalItem("maveli_payments", [
    {
      id: "pay_test_8901abc",
      orderId: "MVL-8901",
      customerName: "Suresh Pillai",
      method: "Razorpay (UPI)",
      amount: 745.5,
      status: "Success",
      createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString()
    },
    {
      id: "pay_test_8903xyz",
      orderId: "MVL-8903",
      customerName: "Anand R.",
      method: "Razorpay (Card)",
      amount: 502,
      status: "Success",
      createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString()
    }
  ]);
}

export async function recordPayment(paymentData) {
  const newPayment = {
    id: paymentData.paymentId || `pay_${Date.now()}`,
    orderId: paymentData.orderId,
    customerName: paymentData.customerName,
    method: paymentData.method,
    amount: paymentData.amount,
    status: paymentData.status,
    createdAt: paymentData.createdAt || new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      await addDoc(collection(db, "payments"), newPayment);
    } catch (e) {
      console.warn("Firestore error recording payment:", e);
    }
  }

  const current = getLocalItem("maveli_payments", []);
  setLocalItem("maveli_payments", [newPayment, ...current]);
  return newPayment;
}

// ========================
// RESERVATIONS
// ========================
export async function getReservations() {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, "reservations"));
      const res = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (res.length > 0) return res;
    } catch (e) {
      console.warn("Firestore error getting reservations:", e);
    }
  }
  return getLocalItem("maveli_reservations", INITIAL_SEED_RESERVATIONS);
}

export async function createReservation(resData) {
  const newRes = {
    ...resData,
    id: `RES-${Math.floor(100 + Math.random() * 900)}`,
    status: "Pending",
    createdAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      await addDoc(collection(db, "reservations"), newRes);
    } catch (e) {
      console.warn("Firestore error adding reservation:", e);
    }
  }

  const current = getLocalItem("maveli_reservations", INITIAL_SEED_RESERVATIONS);
  setLocalItem("maveli_reservations", [newRes, ...current]);
  return newRes;
}

export async function updateReservationStatus(id, status) {
  const current = getLocalItem("maveli_reservations", INITIAL_SEED_RESERVATIONS);
  const updated = current.map(r => r.id === id ? { ...r, status } : r);
  setLocalItem("maveli_reservations", updated);
  return updated;
}

// ========================
// CONTACT MESSAGES
// ========================
export async function getMessages() {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, "messages"));
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (msgs.length > 0) return msgs;
    } catch (e) {
      console.warn("Firestore error getting messages:", e);
    }
  }
  return getLocalItem("maveli_messages", INITIAL_SEED_MESSAGES);
}

export async function createMessage(msgData) {
  const newMsg = {
    ...msgData,
    id: `MSG-${Math.floor(10 + Math.random() * 90)}`,
    createdAt: new Date().toISOString(),
    isRead: false
  };

  if (isFirebaseConfigured && db) {
    try {
      await addDoc(collection(db, "messages"), newMsg);
    } catch (e) {
      console.warn("Firestore error saving message:", e);
    }
  }

  const current = getLocalItem("maveli_messages", INITIAL_SEED_MESSAGES);
  setLocalItem("maveli_messages", [newMsg, ...current]);
  return newMsg;
}

// ========================
// MENU MANAGEMENT
// ========================
export async function getMenuItems() {
  return getLocalItem("maveli_custom_menu", MENU_ITEMS);
}

export async function saveMenuItems(items) {
  setLocalItem("maveli_custom_menu", items);
  return items;
}

// ========================
// RESTAURANT SETTINGS
// ========================
export async function getRestaurantSettings() {
  return getLocalItem("maveli_settings", {
    orderingEnabled: RESTAURANT_INFO.ordering.enabled,
    phone: RESTAURANT_INFO.contact.phone,
    address: RESTAURANT_INFO.location.fullAddress,
    minOrderAmount: RESTAURANT_INFO.ordering.minOrderAmount,
    deliveryFee: RESTAURANT_INFO.ordering.deliveryFee,
  });
}

export async function updateRestaurantSettings(settings) {
  setLocalItem("maveli_settings", settings);
  return settings;
}

