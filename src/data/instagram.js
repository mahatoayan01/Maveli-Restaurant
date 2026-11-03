/**
 * Maveli Restaurant - Instagram Data & Feed Configuration
 * Set enabled: true to display the curated Instagram grid.
 * Customers and food vloggers frequently post under #MaveliRRNagar.
 * The owner can update post URLs and images here easily or provide VITE_INSTAGRAM_ACCESS_TOKEN in .env.
 */

export const INSTAGRAM_CONFIG = {
  enabled: true,
  handle: "mavelirrnagar",
  displayHandle: "#MaveliRRNagar",
  profileUrl: "https://www.instagram.com/explore/tags/mavelirrnagar/",
  followerCount: "Food Lovers Tagged",
  tagline: "Tag @mavelirrnagar or #MaveliRRNagar to get featured on our wall!",
  posts: [
    {
      id: "post-1",
      image: "https://images.unsplash.com/photo-1610057099433-2ba8c3664d95?auto=format&fit=crop&w=600&q=80",
      caption: "Nothing compares to a hearty Kerala banana leaf meal on a Sunday afternoon! Sambar, avial, and hot payasam. 🍃🍛 #MaveliRRNagar #KeralaMeals",
      likes: 342,
      comments: 28,
      postUrl: "https://www.instagram.com/explore/tags/mavelirrnagar/"
    },
    {
      id: "post-2",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
      caption: "Seer Fish Pollichathu in banana leaf! Sizzling with naadan spices and pure coconut oil. 🐟✨ #SeafoodLove #BengaluruFoodies",
      likes: 489,
      comments: 42,
      postUrl: "https://www.instagram.com/explore/tags/mavelirrnagar/"
    },
    {
      id: "post-3",
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80",
      caption: "Crispy, flaky Kerala Parottas paired with slow-cooked naadan chicken roast. What's your favorite pair? 🤤🔥",
      likes: 275,
      comments: 19,
      postUrl: "https://www.instagram.com/explore/tags/mavelirrnagar/"
    },
    {
      id: "post-4",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
      caption: "Weekend breakfast scenes! Fluffy appams, warm stew, and steaming filter coffee. Starts 7 AM every Sat & Sun! ☕🥞",
      likes: 512,
      comments: 34,
      postUrl: "https://www.instagram.com/explore/tags/mavelirrnagar/"
    },
    {
      id: "post-5",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
      caption: "Fragrant Thalassery Dum Biryani made with Jeerakasala rice and tender chicken pieces. Pure bliss! 🍗🍚",
      likes: 398,
      comments: 26,
      postUrl: "https://www.instagram.com/explore/tags/mavelirrnagar/"
    },
    {
      id: "post-6",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
      caption: "Sweet endings: Traditional temple-style Nei Payasam slow-cooked with ghee and jaggery. 🍯✨",
      likes: 421,
      comments: 31,
      postUrl: "https://www.instagram.com/explore/tags/mavelirrnagar/"
    }
  ]
};
