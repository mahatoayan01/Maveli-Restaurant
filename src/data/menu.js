/**
 * Maveli Restaurant - Menu Data
 * Note: Features real dishes and prices identified from Maveli Restaurant Rajarajeshwari Nagar
 * listings on Google/Swiggy/Zomato. Sensible sample items added for full categories.
 * Owner can easily edit, add, or toggle items here or via the /owner dashboard.
 */

export const MENU_CATEGORIES = [
  { id: "all", name: "All Items" },
  { id: "meals", name: "Banana Leaf Meals" },
  { id: "breakfast", name: "Weekend Breakfast" },
  { id: "starters", name: "Starters & Roasts" },
  { id: "curries", name: "Kerala Curries" },
  { id: "seafood", name: "Seafood Delicacies" },
  { id: "biryani", name: "Biryani & Rice" },
  { id: "breads", name: "Kerala Breads" },
  { id: "desserts", name: "Desserts & Drinks" }
];

export const MENU_ITEMS = [
  // BANANA LEAF MEALS
  {
    id: "meal-veg",
    name: "Kerala Vegetarian Banana Leaf Meal",
    category: "meals",
    price: 130,
    description: "Unlimited traditional Kerala Sadhya meal served on a fresh banana leaf with boiled Kerala Matta rice, sambar, rasam, avial, thoran, moru curry, pickle, and papadam.",
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1610057099433-2ba8c3664d95?auto=format&fit=crop&w=600&q=80",
    tags: ["Signature", "Unlimited", "Authentic"]
  },
  {
    id: "meal-fish",
    name: "Kerala Fish Curry Meal",
    category: "meals",
    price: 190,
    description: "Traditional banana leaf meal served with spicy Kerala fish curry simmered with Kudampuli (Malabar tamarind) and fresh coconut.",
    isVeg: false,
    isSpicy: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    tags: ["Bestseller", "Spicy"]
  },
  {
    id: "meal-chicken",
    name: "Kerala Chicken Meal",
    category: "meals",
    price: 210,
    description: "Banana leaf meal accompanied by rich, slow-simmered Naadan chicken gravy and traditional Kerala accompaniments.",
    isVeg: false,
    isSpicy: true,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80",
    tags: ["Hearty", "Non-Veg"]
  },

  // BREAKFAST SPECIALS (Famous weekend buffet & naadan breakfast)
  {
    id: "bfast-buffet",
    name: "Weekend Unlimited Breakfast Buffet",
    category: "breakfast",
    price: 120,
    description: "Our famous weekend special (Sat-Sun 7 AM - 11 AM)! Unlimited spread with hot idlis, vadas, appam, lemon rice, kesari bath, sambar, and two varieties of chutneys.",
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    tags: ["Weekend Special", "Unlimited", "Must Try"]
  },
  {
    id: "bfast-appam-stew",
    name: "Appam with Vegetable Stew (2 Pcs)",
    category: "breakfast",
    price: 90,
    description: "Lacy, bowl-shaped fermented rice pancakes with soft centers and crisp edges, paired with aromatic coconut milk vegetable stew.",
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    tags: ["Homestyle", "Mild"]
  },
  {
    id: "bfast-puttu-kadala",
    name: "Kerala Puttu with Kadala Curry",
    category: "breakfast",
    price: 95,
    description: "Steamed rice cake cylinders layered with freshly grated coconut, served alongside spicy black chickpea curry.",
    isVeg: true,
    isSpicy: true,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    tags: ["Traditional"]
  },

  // STARTERS & ROASTS
  {
    id: "starter-seer-pollichathu",
    name: "Seer Fish Pollichathu (Signature)",
    category: "seafood",
    price: 280,
    description: "Fresh Seer fish (Neymeen) marinated in roasted shallots, ginger, garlic, and naadan spices, wrapped in banana leaf and slow-cooked to perfection.",
    isVeg: false,
    isSpicy: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    tags: ["House Special", "Signature Dish"]
  },
  {
    id: "starter-kappa-idichathu",
    name: "Kappa Idichathu (Mashed Tapioca)",
    category: "starters",
    price: 110,
    description: "Mashed boiled tapioca seasoned with coconut, mustard seeds, curry leaves, and green chillies. Served with fiery red fish gravy.",
    isVeg: false,
    isSpicy: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    tags: ["Street Favorite", "Spicy"]
  },
  {
    id: "starter-kada-fry",
    name: "Kada Fry (Quail Pepper Fry)",
    category: "starters",
    price: 170,
    description: "Tender whole quail marinated in crushed black peppercorns, fennel seeds, and native spices, deep-fried to a crisp golden crunch.",
    isVeg: false,
    isSpicy: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
    tags: ["Meat Lover", "Spicy"]
  },
  {
    id: "starter-prawns-roast",
    name: "Kerala Naadan Prawns Roast",
    category: "seafood",
    price: 260,
    description: "Juicy prawns tossed in caramelised shallots, curry leaves, and ground Malabar spices in pure coconut oil.",
    isVeg: false,
    isSpicy: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80",
    tags: ["Seafood Special"]
  },

  // KERALA CURRIES & GRAVIES
  {
    id: "curry-chicken-roast",
    name: "Naadan Kozhi Roast (Kerala Chicken Roast)",
    category: "curries",
    price: 210,
    description: "Succulent chicken morsels cooked in a thick, dark spicy gravy enriched with roasted onions, ginger, and cracked coriander.",
    isVeg: false,
    isSpicy: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    tags: ["Parotta Pair"]
  },
  {
    id: "curry-mutton-stew",
    name: "Travancore Mutton Stew",
    category: "curries",
    price: 270,
    description: "Tender pieces of mutton slow-cooked with potatoes, carrots, and whole spices in a velvety coconut milk broth.",
    isVeg: false,
    isSpicy: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=600&q=80",
    tags: ["Mild & Rich", "Traditional"]
  },
  {
    id: "curry-tharavu-roast",
    name: "Kuttanadan Tharavu Roast (Duck Roast)",
    category: "curries",
    price: 260,
    description: "Authentic backwater duck delicacy cooked with shallots, crushed garlic, and aromatic black pepper.",
    isVeg: false,
    isSpicy: true,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=600&q=80",
    tags: ["Rare Specialty"]
  },
  {
    id: "curry-paneer-makkani",
    name: "Kerala Style Paneer Masala",
    category: "curries",
    price: 180,
    description: "Fresh cottage cheese cubes simmered in a mildly spiced tomato-coconut reduction with roasted curry leaves.",
    isVeg: true,
    isSpicy: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
    tags: ["Vegetarian"]
  },

  // BIRYANI & RICE
  {
    id: "biryani-malabar-chicken",
    name: "Thalassery / Malabar Chicken Biryani",
    category: "biryani",
    price: 220,
    description: "Cooked with fragrant Khaima (Jeerakasala) small-grain rice, marinated chicken, fried shallots, cashews, and raisins. Served with raita and date pickle.",
    isVeg: false,
    isSpicy: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    tags: ["Bestseller", "Aromatic"]
  },
  {
    id: "biryani-mutton",
    name: "Malabar Mutton Biryani",
    category: "biryani",
    price: 290,
    description: "Slow-dum cooked tender mutton layered with aromatic Jeerakasala rice, Malabar spices, and mint. Served with raita.",
    isVeg: false,
    isSpicy: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80",
    tags: ["Weekend Favorite"]
  },
  {
    id: "rice-neychoru",
    name: "Neychoru (Kerala Ghee Rice)",
    category: "biryani",
    price: 120,
    description: "Fragrant rice tempered in pure desi ghee, cloves, cardamom, cinnamon, and garnished with crisp fried onions.",
    isVeg: true,
    isSpicy: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80",
    tags: ["Comfort Food"]
  },

  // KERALA BREADS
  {
    id: "bread-parotta",
    name: "Kerala Parotta (Layered)",
    category: "breads",
    price: 25,
    description: "Flaky, multi-layered spiral flatbread made with precision and cooked on a hot griddle until crisp on the outside and soft within.",
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80",
    tags: ["Classic", "Flaky"]
  },
  {
    id: "bread-palappam",
    name: "Palappam (Coconut Milk Appam)",
    category: "breads",
    price: 20,
    description: "Fermented rice pancake made with fresh coconut milk with a spongy fluffy center and crisp lacy rim.",
    isVeg: true,
    isSpicy: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    tags: ["Light & Fluffy"]
  },
  {
    id: "bread-wheat-parotta",
    name: "Kerala Wheat Parotta",
    category: "breads",
    price: 30,
    description: "Wholesome layered flatbread prepared with whole wheat flour.",
    isVeg: true,
    isSpicy: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80",
    tags: ["Healthy Option"]
  },

  // DESSERTS & BEVERAGES
  {
    id: "dessert-nei-payasam",
    name: "Nei Payasam (Ambalapuzha Style)",
    category: "desserts",
    price: 85,
    description: "Traditional Kerala temple-style rice dessert slow-cooked in rich dark jaggery, pure ghee, crushed cardamom, and fried coconut slices.",
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
    tags: ["Must Try Dessert", "Sweet"]
  },
  {
    id: "dessert-ada-pradhaman",
    name: "Ada Pradhaman",
    category: "desserts",
    price: 90,
    description: "Steamed rice flakes simmered in thick coconut milk, melted jaggery syrup, and dry ginger powder.",
    isVeg: true,
    isSpicy: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80",
    tags: ["Festival Special"]
  },
  {
    id: "drink-sulaimani",
    name: "Malabar Sulaimani Tea",
    category: "desserts",
    price: 30,
    description: "Spiced black tea brewed with fresh mint, a hint of cardamom, cloves, and freshly squeezed lemon juice. A perfect digestive.",
    isVeg: true,
    isSpicy: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    tags: ["Refreshing"]
  },
  {
    id: "drink-filter-coffee",
    name: "South Indian Filter Coffee",
    category: "desserts",
    price: 35,
    description: "Strong chicory-infused decoction frothed with boiling whole milk, served in a traditional brass dabarah.",
    isVeg: true,
    isSpicy: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    tags: ["Authentic"]
  }
];

