# ✦ AuraCart — Premium MERN E-Commerce

A modern, glassmorphic e-commerce platform built with **MongoDB · Express · React · Node.js**.

---

## 📁 Project Structure

```
AuraCart/
├── backend/
│   ├── config/db.js              # MongoDB connection + graceful fallback
│   ├── controllers/
│   │   ├── userController.js     # Register, login, profile, admin list
│   │   ├── productController.js  # CRUD + category filter
│   │   └── orderController.js    # Place, list, update status, stats
│   ├── middleware/auth.js        # JWT protect + adminOnly
│   ├── models/
│   │   ├── User.js               # Mongoose schema w/ bcrypt hook
│   │   ├── Product.js            # brand/name/category/sizes/stock
│   │   └── Order.js              # items[], status, address
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── utils/
│   │   ├── memStore.js           # In-memory fallback (48 products + admin)
│   │   └── seedData.js           # MongoDB seed script
│   ├── server.js                 # Express entry point
│   └── .env                      # PORT, MONGO_URI, JWT_SECRET
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx         # Fixed top bar with cart badge
    │   │   ├── Sidebar.jsx        # Left-docked category navigator
    │   │   └── ProductCard.jsx    # Glass card with size pills + add to cart
    │   ├── context/
    │   │   ├── AuthContext.jsx    # Global user state (localStorage)
    │   │   └── CartContext.jsx    # Cart state with localStorage persistence
    │   ├── pages/
    │   │   ├── Home.jsx           # Hero + product grid + category filtering
    │   │   ├── Login.jsx          # Auth form
    │   │   ├── Register.jsx       # Registration form
    │   │   ├── Cart.jsx           # Cart + order placement + success state
    │   │   ├── Profile.jsx        # Account info + order history
    │   │   └── AdminDashboard.jsx # Stats / orders / products / add product
    │   ├── utils/api.js           # Fetch wrapper with auth headers
    │   ├── App.jsx                # Routes + layout guards
    │   └── index.css              # CSS variables, glassmorphic design system
    ├── index.html
    └── vite.config.js             # Dev proxy → localhost:5000
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (optional — app works without it via in-memory store)

### 1. Backend

```bash
cd backend
npm install
# (Optional) edit .env to set your MONGO_URI
npm run dev          # nodemon server on :5000
# (Optional) seed MongoDB:
npm run seed
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev          # Vite dev server on :3000
```

Open **http://localhost:3000**

---

## 🔐 Admin Credentials

| Field    | Value              |
|----------|--------------------|
| Email    | admin@aura.com     |
| Password | admin123           |

---

## 🛍️ Features

| Feature | Detail |
|---------|--------|
| **48 products** | 12 per category, brand + product name |
| **4 categories** | Fashion · Shoes · Electronics · Home & Living |
| **Size selector** | Fashion → S/M/L/XL/XXL · Shoes → 6–10 · Others → none |
| **Category filter** | Sidebar click → URL param → API query |
| **Cart** | Persist to localStorage, qty controls, free shipping logic |
| **Orders** | Place order, view history with status badges |
| **Admin panel** | Revenue stats, order status updates, product CRUD |
| **Glassmorphic UI** | Dark indigo/violet theme, hover glow effects |
| **No-MongoDB mode** | In-memory store auto-activated if Mongo is unavailable |

---

## 📡 API Endpoints

### Users
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/users/register` | Public |
| POST | `/api/users/login` | Public |
| GET  | `/api/users/profile` | Auth |
| GET  | `/api/users/` | Admin |

### Products
| Method | Endpoint | Access |
|--------|----------|--------|
| GET  | `/api/products?category=Fashion` | Public |
| GET  | `/api/products/:id` | Public |
| POST | `/api/products` | Admin |
| PUT  | `/api/products/:id` | Admin |
| DELETE | `/api/products/:id` | Admin |

### Orders
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/orders` | Auth |
| GET  | `/api/orders/myorders` | Auth |
| GET  | `/api/orders` | Admin |
| GET  | `/api/orders/stats` | Admin |
| PUT  | `/api/orders/:id/status` | Admin |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| `--bg-base` | `#080b14` |
| `--accent` | `#7c3aed` (indigo-violet) |
| `--accent-bright` | `#a78bfa` |
| `--accent-neon` | `#c084fc` |
| Display font | Syne 700/800 |
| Body font | Inter 400/500/600 |

# VIP-C2-Baddam-Anish
