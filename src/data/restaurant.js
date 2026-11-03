/**
 * Maveli Restaurant - Central Configuration & Source of Truth
 * All restaurant information lives here so the owner can update content easily.
 */

export const RESTAURANT_INFO = {
  name: "Maveli Restaurant",
  tagline: "Authentic Kerala & Coastal Flavors in RR Nagar",
  shortDescription: "Experience authentic Kerala dining in Bengaluru. Traditional banana-leaf meals, spicy naadan roasts, fresh coastal seafood, and mouthwatering weekend breakfast spreads.",
  cuisine: ["Kerala", "South Indian", "Coastal Seafood", "Malabar Biryani"],
  priceRange: "₹₹ (Approx. ₹500 - ₹700 for two)",
  category: "Casual Dining & Family Restaurant",
  currency: "₹",
  country: "IN",

  // Contact Details
  contact: {
    phone: "+91 72591 55001",
    displayPhone: "+91 72591 55001",
    whatsapp: "917259155001",
    // TODO: Owner to provide official email address
    email: "info@mavelirestaurant.in", 
    isEmailPlaceholder: true,
  },

  // Location & Navigation
  location: {
    addressLine1: "405, BHEL Main Road",
    landmark: "Opposite BHEL Layout Bus Stop & Near Kittur Rani Chennamma Park",
    area: "Pattanagere, Rajarajeshwari Nagar (RR Nagar)",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560098",
    fullAddress: "405, BHEL Main Road, Opp. BHEL Layout Bus Stop / Kittur Chennamma Park, Pattanagere, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098",
    coordinates: {
      lat: 12.92862,
      lng: 77.51651,
    },
    googleMapsPlaceId: "ChIJV3W-voc_rjsR93aWABiZrVQ",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Maveli%20Restaurant&query_place_id=ChIJV3W-voc_rjsR93aWABiZrVQ",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=12.92862,77.51651",
    embedMapUrl: "https://maps.google.com/maps?q=12.92862,77.51651&hl=en&z=16&output=embed",
    parkingInfo: "Two-wheeler and street four-wheeler parking available along BHEL Main Road.",
    transitInfo: "Directly opposite BHEL Layout Bus Stop. Closest Namma Metro station is Jnana Bharati / Rajarajeshwari Nagar (Purple Line, approx. 2.5 km).",
  },

  // Operating Hours
  hours: [
    { day: "Monday", slots: ["12:00 PM – 4:00 PM", "7:00 PM – 10:30 PM"], isOpen: true },
    { day: "Tuesday", slots: ["12:00 PM – 4:00 PM", "7:00 PM – 10:30 PM"], isOpen: true },
    { day: "Wednesday", slots: ["12:00 PM – 4:00 PM", "7:00 PM – 10:30 PM"], isOpen: true },
    { day: "Thursday", slots: ["12:00 PM – 4:00 PM", "7:00 PM – 10:30 PM"], isOpen: true },
    { day: "Friday", slots: ["12:00 PM – 4:00 PM", "7:00 PM – 10:30 PM"], isOpen: true },
    { day: "Saturday", slots: ["7:00 AM – 4:00 PM (Breakfast Buffet)", "7:00 PM – 10:30 PM"], isOpen: true },
    { day: "Sunday", slots: ["7:00 AM – 4:00 PM (Breakfast Buffet)", "7:00 PM – 10:30 PM"], isOpen: true },
  ],

  // Service Offerings
  services: {
    dineIn: true,
    takeaway: true,
    delivery: true,
    reservations: true,
    catering: true,
    breakfastBuffet: true,
  },

  // Ratings & Footprint (Verified from Google Maps & aggregators)
  ratings: {
    overall: 3.9,
    totalReviews: 1160,
    googleRating: "3.9 / 5.0",
    swiggyRating: "4.1 / 5.0",
    zomatoRating: "3.8 / 5.0",
    reviewPlatforms: "Google, Swiggy, Zomato & Justdial",
  },

  // Social Links
  socials: {
    // Note: The restaurant doesn't operate a standalone corporate Instagram handle; customers tag #MaveliRRnagar
    instagram: "https://www.instagram.com/explore/tags/mavelirrnagar/",
    instagramHandle: "@mavelirrnagar",
    facebook: "https://www.facebook.com/search/top?q=Maveli%20Restaurant%20Bangalore",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Maveli%20Restaurant&query_place_id=ChIJV3W-voc_rjsR93aWABiZrVQ",
    whatsapp: "https://wa.me/917259155001?text=Hello%20Maveli%20Restaurant%2C%20I%20would%20like%20to%20enquire%20about%20a%20table%20reservation.",
  },

  // Brand Story & Highlights
  about: {
    title: "The Spirit of Maveli & Authentic Naadan Feasts",
    subtitle: "Named after Kerala's legendary King Mahabali (Maveli), bringing heartwarming hospitality and heritage culinary secrets to Rajarajeshwari Nagar.",
    paragraphs: [
      "Founded with a passion to bring true God's Own Country culinary culture to Bengaluru, Maveli Restaurant serves authentic Kerala fare prepared with cold-pressed coconut oil, fresh curry leaves, and stone-ground spices sourced directly from Kerala.",
      "From comforting Sadya-style banana leaf meals loaded with sambar, avial, thoran, and payasam to sizzling seer fish pollichathu wrapped in fragrant banana leaves, every dish celebrates age-old coastal home cooking.",
      "On weekends, our doors open early at 7:00 AM for our acclaimed pocket-friendly unlimited breakfast buffet featuring fluffy appams, hot idlis, rich stew, and traditional filter coffee."
    ],
    features: [
      {
        title: "Authentic Kerala Heritage",
        description: "Pure traditional recipes passed down through generations, cooked with authentic Kerala spices and fragrant coconut oil.",
        icon: "CookingPot"
      },
      {
        title: "Banana Leaf Feast",
        description: "Traditional unlimited Kerala meals served on fresh banana leaves with comforting accompaniments and divine Nei Payasam.",
        icon: "Sparkles"
      },
      {
        title: "Fresh Seafood Daily",
        description: "Seer fish, pomfret, prawns, and crab prepared Naadan-style, roasted in banana leaf or simmered in spicy Kudampuli gravies.",
        icon: "Fish"
      },
      {
        title: "Weekend Breakfast Buffet",
        description: "Popular unlimited weekend breakfast spread with 12+ traditional items at unbeatable budget-friendly pricing.",
        icon: "Coffee"
      }
    ]
  },

  // Order & Payment Settings
  ordering: {
    enabled: true,
    minOrderAmount: 150,
    deliveryFee: 40,
    freeDeliveryThreshold: 500,
    taxPercentage: 5, // 5% GST on restaurant food
    estimatedDeliveryTime: "30 - 45 mins",
    paymentMethods: [
      { id: "razorpay", name: "UPI / Credit & Debit Card / Net Banking (Razorpay Test Mode)", default: true },
      { id: "cod", name: "Cash on Delivery (COD)" },
      { id: "pay_restaurant", name: "Pay at Counter (for Takeaway / Pickup)" },
    ]
  }
};
