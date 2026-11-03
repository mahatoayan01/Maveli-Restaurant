# Maveli Restaurant - Official Production Website

A fast, responsive, and production-ready web application for **Maveli Restaurant**, Rajarajeshwari Nagar (RR Nagar), Bengaluru. Built with React, Tailwind CSS, Vite, and Firebase/Storage architecture with online ordering, Razorpay test mode payments, table reservations with WhatsApp confirmation, real customer reviews, and a private owner dashboard.

---

## 🎨 Color Palette & Design Direction

The color palette is directly inspired by traditional Kerala culinary heritage and the atmosphere of Maveli Restaurant:

| Token | Hex | Role | Inspiration |
|---|---|---|---|
| **Primary** | `#164E3D` (`kerala-900`) | Main brand, hero backgrounds, primary buttons | Fresh banana leaves (*Vazhayila*), lush Kerala coconut groves |
| **Secondary** | `#D99B26` (`gold-500`) | Accents, badges, highlights, CTA hover states | Traditional Kerala brass lamps (*Nilavilakku*) and Kasavu gold borders |
| **Accent** | `#D9532F` (`terracotta-500`) | Spicy indicators, alerts, counter badges | Slow-roasted shallot masalas, clay pot fish gravies (*Meen Chatti*) |
| **Background** | `#FDFBF7` (`cream-100`) | Main page canvas | Warm coconut milk, soft natural ivory |
| **Surface** | `#F7F3EB` (`cream-200`) | Cards, tables, highlights strip | Palm-thatched textures and warm hospitable dining spaces |
| **Text Primary** | `#1E2922` | Body and titles | Deep roasted espresso slate for WCAG AA readability |

### Typography
- **Headings / Display:** *Playfair Display* (Google Fonts) — classical, elegant heritage feel.
- **Body / Interface:** *Plus Jakarta Sans* (Google Fonts) — modern, clean, highly legible on mobile and desktop.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js `v18+` or `v20+` (tested on Node 24)
- npm or pnpm

### 2. Installation
```bash
cd maveli-restaurant
npm install
```

### 3. Run Locally
```bash
npm run dev
```
The site runs at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## ⚙️ Environment Variables & Configuration

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

| Variable | Description | Default / Example |
|---|---|---|
| `VITE_APP_ENV` | Application environment | `development` / `production` |
| `VITE_SITE_URL` | Canonical website domain | `https://mavelirestaurant.in` |
| `VITE_FIREBASE_API_KEY` | Firebase Web API key | (Optional in local mode; fallback store active) |
| `VITE_FIREBASE_PROJECT_ID`| Firebase project ID | `your-project-id` |
| `VITE_OWNER_EMAIL` | Designated owner admin account | `owner@mavelirestaurant.in` |
| `VITE_RAZORPAY_KEY_ID` | Razorpay Key ID | `rzp_test_MaveliDemoKey123` |
| `VITE_GOOGLE_PLACES_API_KEY`| Google Places API key (optional) | (Leave blank to use verified `src/data/reviews.js`) |
| `VITE_INSTAGRAM_ACCESS_TOKEN`| Instagram feed token (optional) | (Leave blank to use curated `src/data/instagram.js`) |

> **Note on Zero-Config Fallback:** If Firebase keys are not provided, the application automatically uses an embedded local database store in `localStorage`/`sessionStorage` so orders, table reservations, contact messages, and menu modifications work **instantly out-of-the-box** without any configuration block!

---

## 📂 Source of Truth & Content Customization

All restaurant details and data live in dedicated files inside `src/data/`:

| File | Content |
|---|---|
| `src/data/restaurant.js` | **Single source of truth**: Restaurant name, tagline, phone number, WhatsApp link, Google Maps link, full address, GPS coordinates, opening hours, pricing, and brand story. |
| `src/data/menu.js` | Complete food menu: categories, dishes, prices, descriptions, images, vegetarian flags, spicy flags, and bestseller tags. |
| `src/data/reviews.js` | Real verified customer reviews from Google Maps and Swiggy, rating breakdown, and direct links to Google review form. |
| `src/data/instagram.js` | Instagram handle (`#MaveliRRNagar`), post thumbnails, captions, like/comment counts, and post links. |
| `src/data/gallery.js` | Lightbox gallery images categorized into Food, Ambience, and Weekend Specials. |

### 📝 TODO Placeholders to Update with Official Details:
- `src/data/restaurant.js` -> `contact.email`: `info@mavelirestaurant.in` (Placeholder marked with `isEmailPlaceholder: true` until the owner provides their preferred corporate inbox).
- `src/data/restaurant.js` -> `socials.instagram`: Set to the official Instagram handle when created (currently points to `#mavelirrnagar` where patrons post).

---

## 🔒 Owner Area & Management Portal

The customer-facing website contains no overt admin navigation, preserving a clean dining experience. A discreet **"Owner Login"** link is placed in the footer.

### Accessing the Dashboard:
1. Navigate to `/owner/login` (or click "Owner Login" in the footer).
2. Sign in with the owner email (`owner@mavelirestaurant.in`) and password.
3. For demonstration and testing, click the **"Fill Demo Owner Credentials"** button.

### Dashboard Features:
- **Summary Cards:** Real-time Today's Orders, Today's Revenue, Pending Orders, Total Lifetime Orders, and Total Revenue.
- **Orders Table:** Live order feed with search, status filters (`Pending`, `Confirmed`, `Preparing`, `Out for Delivery`, `Ready for Pickup`, `Completed`, `Cancelled`), and order detail modal.
- **Payments & CSV Export:** Complete payment logs with 1-click CSV export (`maveli_payments_YYYY-MM-DD.csv`).
- **Table Reservations Manager:** View guest details, date, time slot, party size, notes, and 1-click Confirm/Cancel actions.
- **Messages Inbox:** Customer contact form submissions with spam-filtered messages.
- **Menu Manager:** Add new dishes, adjust pricing, upload image URLs, toggle veg/spicy attributes, or remove dishes.
- **Settings:** Toggle online ordering on/off during peak kitchen rushes and view store settings.

### Enforcing Owner Security:
- Security rules are provided in `firestore.rules`.
- Only accounts matching `request.auth.token.email == "owner@mavelirestaurant.in"` (or custom claims) are authorized to read/modify admin collections.

---

## 💳 Online Ordering & Razorpay Payment Integration

The website supports online ordering with delivery fee calculations (free delivery for orders ₹500 and above) and 5% GST calculation.

### Test Mode vs. Live Mode:
1. In **Test Mode** (default):
   - `VITE_RAZORPAY_KEY_ID=rzp_test_...`
   - A realistic checkout simulator modal allows placing simulated orders without charging actual payment methods.
2. Switching to **Live Mode**:
   - Generate live API keys in your [Razorpay Dashboard](https://dashboard.razorpay.com).
   - Update `.env` with `VITE_RAZORPAY_KEY_ID=rzp_live_YourKey`.
   - Implement the server-side order creation and signature verification function using either:
     - `api/create-razorpay-order.js` (for Vercel or Netlify serverless functions)
     - `functions/index.js` (for Firebase Cloud Functions)
   - Store `RAZORPAY_KEY_SECRET` exclusively in your serverless environment variables.

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Push repository to GitHub.
2. In Vercel, click **Add New Project** and select the repository.
3. Framework Preset: **Vite**.
4. Root Directory: `./`.
5. Environment Variables: Add variables from `.env.example`.
6. Deploy! The included `vercel.json` ensures client-side routing works on all paths (`/menu`, `/cart`, `/owner`, etc.).

### Deploy to Netlify
1. Connect repository in Netlify.
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. The included `public/_redirects` file automatically handles SPA routing (`/* /index.html 200`).
5. Set environment variables under **Site configuration > Environment variables**.

---

## 🔍 SEO & Accessibility Features
- Full Open Graph and Twitter card meta tags for link previews.
- Valid Schema.org `Restaurant` JSON-LD structured data with opening hours, geo-coordinates, cuisine tags, and verified aggregate ratings.
- Semantic HTML tags (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<aside>`).
- High-contrast colors conforming to WCAG AA guidelines.
- Visible focus rings for keyboard navigation.
- Floating mobile action buttons for instant 1-tap calling and WhatsApp ordering.

