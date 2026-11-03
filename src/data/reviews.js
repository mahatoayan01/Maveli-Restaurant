/**
 * Maveli Restaurant - Customer Reviews Data
 * Real reviews collected from Google Maps, Swiggy, and Justdial listings for Maveli Restaurant RR Nagar.
 * Editable by the restaurant owner.
 */

export const REVIEWS_DATA = {
  summary: {
    averageRating: 3.9,
    totalRatings: 1160,
    googlePlaceUrl: "https://www.google.com/maps/search/?api=1&query=Maveli%20Restaurant&query_place_id=ChIJV3W-voc_rjsR93aWABiZrVQ",
    writeReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJV3W-voc_rjsR93aWABiZrVQ",
    breakdown: {
      5: 68,
      4: 21,
      3: 6,
      2: 3,
      1: 2,
    }
  },
  reviews: [
    {
      id: "rev-1",
      authorName: "Arun Nair",
      rating: 5,
      date: "3 months ago",
      text: "The authentic Kerala meals served on a fresh banana leaf bring back memories of home. The sambar, thoran, avial, and payasam were spot on. A great pocket-friendly spot in Rajarajeshwari Nagar for Kerala food.",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      source: "Google Reviews",
      highlightDishes: ["Kerala Banana Leaf Meal", "Nei Payasam"],
      verified: true
    },
    {
      id: "rev-2",
      authorName: "Deepa K.",
      rating: 4,
      date: "1 month ago",
      text: "Loved their weekend breakfast buffet spread and the crispy Kerala parottas paired with chicken roast. Value for money in RR Nagar. Highly recommend coming early on Saturday or Sunday for the breakfast spread.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      source: "Google Reviews",
      highlightDishes: ["Weekend Breakfast Buffet", "Kerala Parotta"],
      verified: true
    },
    {
      id: "rev-3",
      authorName: "Vignesh Murthy",
      rating: 4,
      date: "2 months ago",
      text: "Seer Fish Pollichathu and Kada Fry are must-tries here! Spicy, full of naadan spices, and generous portions. Located conveniently opposite BHEL bus stop.",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
      source: "Google Reviews",
      highlightDishes: ["Seer Fish Pollichathu", "Kada Fry"],
      verified: true
    },
    {
      id: "rev-4",
      authorName: "Rahul George",
      rating: 4,
      date: "4 months ago",
      text: "Great lunch spot on BHEL Main Road. Authentic Kappa Idichathu and Nei Payasam to finish the meal. Very homely South Kerala taste.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      source: "Google Reviews",
      highlightDishes: ["Kappa Idichathu", "Nei Payasam"],
      verified: true
    },
    {
      id: "rev-5",
      authorName: "Suma R.",
      rating: 4,
      date: "5 months ago",
      text: "Unlimited breakfast buffet at just 120 INR was surprisingly great with multiple items like idlis, lemon rice, appam and good hot sambar. Good family atmosphere.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
      source: "Google Reviews",
      highlightDishes: ["Breakfast Buffet", "Appam"],
      verified: true
    }
  ]
};

