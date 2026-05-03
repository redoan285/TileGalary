# TileVista — Tile Gallery

A premium tile gallery web application to discover, browse, and explore handcrafted tiles from artisans across the world.

## 🌐 Live URL

[https://tile-vista.vercel.app](https://tile-vista.vercel.app)

> **JSON Server** must run separately: `npm run server` (port 5000)

---

## 📌 Project Purpose

TileVista is a single-page tile gallery application that allows users to:
- Browse a curated gallery of premium tiles (ceramic, marble, mosaic, terracotta, etc.)
- Search and filter tiles by name and category
- View detailed tile information (private route — login required)
- Register & login via email/password or Google OAuth
- Manage their profile (view and update name + image)

---

## ✨ Key Features

- 🏠 **Home Page** — Hero banner with Swiper carousel, animated marquee, featured tiles section, how-it-works section
- 🎨 **All Tiles Gallery** — Searchable, filterable tile grid with category tabs
- 🔍 **Tile Details** — Full details page (protected — login required)
- 🔐 **Authentication** — Email/password & Google OAuth via BetterAuth
- 👤 **My Profile** — View and update profile name & image URL
- 📱 **Fully Responsive** — Mobile, tablet, and desktop layouts
- 🚫 **404 Page** — Custom tile-mosaic themed not-found page
- ⏳ **Loading States** — Animated loaders during data fetch
- 🔒 **Private Routes** — Tile details and My Profile require login

---

## 🛠️ npm Packages Used

| Package | Purpose |
|---|---|
| `next` | App framework (App Router) |
| `better-auth` | Authentication (email + Google) |
| `mongoose` / `mongodb` | MongoDB database adapter |
| `react-hot-toast` | Toast notifications |
| `react-fast-marquee` | Scrolling marquee strip |
| `swiper` | Hero banner carousel |
| `animate.css` | CSS animations |
| `react-icons` | Icon library |
| `lucide-react` | Additional icons |
| `json-server` | Mock REST API for tiles |
| `tailwindcss` + `daisyui` | Styling & UI components |

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tile-gallery

BETTER_AUTH_SECRET=your-secret-key-min-32-chars
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret

NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start JSON server (tiles data) — port 5000
npm run server

# Start Next.js dev server — port 3000
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
tile-gallery/
├── data/
│   └── tiles.json            # JSON Server data (12 tiles)
├── src/
│   ├── app/
│   │   ├── (main)/           # Layout with Navbar + Footer
│   │   │   ├── page.js       # Home page
│   │   │   ├── all-tiles/    # Gallery page
│   │   │   ├── tile/[id]/    # Tile detail (private)
│   │   │   └── my-profile/   # Profile + update (private)
│   │   ├── auth/             # Login & Register pages
│   │   └── api/auth/         # BetterAuth API handler
│   ├── components/           # Reusable UI components
│   └── lib/
│       ├── auth.js           # BetterAuth server config
│       ├── auth-client.js    # BetterAuth client hooks
│       └── api.js            # JSON Server fetch helpers
├── .env.local                # Environment variables
└── README.md
```

---

## 🔒 Route Permissions

| Route | Access |
|---|---|
| `/` | Public |
| `/all-tiles` | Public |
| `/auth/login` | Public |
| `/auth/register` | Public |
| `/tile/[id]` | **Private** (login required) |
| `/my-profile` | **Private** (login required) |
| `/my-profile/update` | **Private** (login required) |

---

## 📦 Deployment

Deployed on **Vercel** (Next.js) + **MongoDB Atlas** (database).

For the JSON Server (tile data), deploy separately on **Render** or use a hosted JSON API service.

```bash
npm run build
```

> Ensure all environment variables are configured in Vercel project settings.
