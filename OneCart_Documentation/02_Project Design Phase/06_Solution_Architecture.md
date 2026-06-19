# Project Design Phase - Solution Architecture Deliverable

**Date:** 18 June 2026  
**Project Name:** OneCart-E commerce application  
**Team Member:** Baddam Anish Reddy (Full Stack Developer)  
**Deliverable Number:** 6 of 11

---

## 1. System Architecture Overview
The OneCart platform utilizes a standard 3-tier decoupling model (Client, Application Server, and Database) to isolate responsibilities, maximize system throughput, and ensure security boundaries are maintained. 

```mermaid
graph TD
    A["React Client (Vite SPA)"] -->|HTTPS Requests / HttpOnly Cookies| B["API Gateway / Express Server"]
    B -->|Mongoose ODM Queries| C[("MongoDB Database (Atlas)")]
    B -->|Session Token Verification| D["JWT Cookie Middleware"]
    B -->|Logs & Auditing| E["Morgan logger"]
```

---

## 2. Frontend Component Architecture (React Client)
The client-side application is built using React with Vite. It features standard single-page routing and contextual state management.

```
frontend/src/
â”œâ”€â”€ main.jsx (Renders App)
â”œâ”€â”€ App.jsx (Defines Pages & Route Guards)
â”œâ”€â”€ index.css (Global design styling)
â”œâ”€â”€ context/
â”‚   â””â”€â”€ ShopContext.jsx (Global cart, login, and catalog state management)
â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ Navbar.jsx (Header with dynamic cart counter)
â”‚   â”œâ”€â”€ Footer.jsx (Copyright & links)
â”‚   â”œâ”€â”€ ProductItem.jsx (Catalog product cards)
â”‚   â””â”€â”€ ProtectedRoute.jsx (Route guard checking auth state)
â”œâ”€â”€ pages/
â”‚   â”œâ”€â”€ Home.jsx (Catalog display)
â”‚   â”œâ”€â”€ ProductDetail.jsx (Single product info & stock badges)
â”‚   â”œâ”€â”€ Cart.jsx (Cart summary & item quantity updates)
â”‚   â”œâ”€â”€ Shipping.jsx (Address form)
â”‚   â”œâ”€â”€ Payment.jsx (Simulated gateway selector)
â”‚   â”œâ”€â”€ PlaceOrder.jsx (Order layout and checkout creation)
â”‚   â”œâ”€â”€ Profile.jsx (User detail editor & purchase lists)
â”‚   â””â”€â”€ admin/
â”‚       â”œâ”€â”€ Dashboard.jsx (Central admin stats panel)
â”‚       â””â”€â”€ StockDetail.jsx (Live stock control lists)
```

---

## 3. Backend Component Architecture (Express Server)
The server-side application is built using Node.js and Express. It is stateless and exposes REST APIs.

```
backend/
â”œâ”€â”€ server.js (Server entry point & route registration)
â”œâ”€â”€ config/
â”‚   â””â”€â”€ db.js (MongoDB Atlas Mongoose connection)
â”œâ”€â”€ routes/
â”‚   â”œâ”€â”€ authRoutes.js (Authentication endpoints)
â”‚   â”œâ”€â”€ productRoutes.js (Catalog endpoints)
â”‚   â””â”€â”€ orderRoutes.js (Order & checkout endpoints)
â”œâ”€â”€ controllers/
â”‚   â”œâ”€â”€ authController.js (User signup, login, cookie deletion, profile update)
â”‚   â”œâ”€â”€ productController.js (Admin additions/deletions, catalog loading)
â”‚   â””â”€â”€ orderController.js (Order placements, payment verification)
â”œâ”€â”€ models/
â”‚   â”œâ”€â”€ userModel.js (Mongoose User Schema & Bcrypt password methods)
â”‚   â”œâ”€â”€ productModel.js (Mongoose Product Schema)
â”‚   â””â”€â”€ orderModel.js (Mongoose Order Schema referencing User/Products)
â””â”€â”€ middleware/
    â”œâ”€â”€ authMiddleware.js (Admin/User token validator)
    â””â”€â”€ errorMiddleware.js (Express global exception handlers)
```

---

## 4. Mongoose Database Models & Relationships
MongoDB stores e-commerce collections as documents with Mongoose providing rigid schema compliance and validation.

```mermaid
erDiagram
    USER {
        ObjectId _id PK
        String name
        String email
        String password
        Boolean isAdmin
    }
    PRODUCT {
        ObjectId _id PK
        String name
        String image
        String category
        String description
        Number price
        Number countInStock
        Number rating
    }
    ORDER {
        ObjectId _id PK
        ObjectId user FK
        Array orderItems
        Object shippingAddress
        String paymentMethod
        Number totalPrice
        Boolean isPaid
        Date paidAt
    }
    USER ||--o{ ORDER : places
    ORDER ||--|{ PRODUCT : contains
```

---

## 5. Security Architecture
* **Session Protection:** Upon login, the backend signs a JSON Web Token (JWT) with the user ID. This is sent back via a Cookie set to `httpOnly: true`, `secure: true`, and `sameSite: 'strict'`, preventing reading by malicious Javascript.
* **Password Hashing:** Passwords are never stored as plain text. The Mongoose pre-save hook runs the password through `bcryptjs` with a salt factor of 10.
* **CORS Policy:** Cross-Origin Resource Sharing is locked down to the frontend domain with credentials flag enabled to allow secure cookie transmission.


