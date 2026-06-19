# Project Design Phase - Problem-Solution Fit Deliverable

**Date:** 18 June 2026  
**Project Name:** OneCart-E commerce application  
**Team Member:** Baddam Anish Reddy (Full Stack Developer)  
**Deliverable Number:** 4 of 11

---

## 1. Introduction
To ensure that **OneCart** delivers maximum value to shoppers and administrators, we map each identified customer pain point and business challenge directly to a specific solution built into the MERN stack.

---

## 2. Problem-Solution Mapping Matrix

| Category | Customer/Merchant Pain Point | Proposed Tech Solution | Why it Fits |
| :--- | :--- | :--- | :--- |
| **Security** | Insecure login sessions exposing credentials and user purchase histories (XSS/CSRF). | Secure HttpOnly Cookie JWT Authentication. | Storing the JSON Web Token in an HttpOnly cookie prevents client-side scripts from reading the token, eliminating XSS token theft. |
| **UX & Speed** | High page reload times causing shoppers to lose context and abandon carts. | React Single Page Application (SPA) with Vite. | Only the modified components are re-rendered. Client-side state transitions happen in milliseconds, ensuring a highly responsive cart. |
| **Inventory** | Purchasing items that are actually out of stock due to delayed catalog sync. | Real-time MongoDB Inventory Decrementing. | As soon as an order is placed (`PlaceOrder.jsx`), the backend (`orderRoutes.js`) decrements the Mongoose product stock (`countInStock`) in MongoDB immediately. |
| **Checkout** | Tedious and complex checkout processes requiring multiple redirects. | Streamlined 3-step checkout funnel. | Guided wizard screens for Shipping details, Payment method, and Order Placement keep the transaction fast and clear. |
| **Operations** | Store admins lack a centralized tool to edit listings, track revenue, and update stock. | Unified Admin Panel and Dashboard. | Admin pages allow full CRUD operations on products, updating order delivery statuses, and viewing inventory warnings on one screen. |

---

## 3. Pain Relievers & Gain Creators

### 3.1 Pain Relievers
* **Authentication Middleware:** Route guards restrict user profile paths and administrator dashboards, relieving anxiety about unauthorized access.
* **Persistent Cart State:** The cart utilizes React Context API, relieving the pain of losing selected items upon refresh.
* **Mongoose Schema Validation:** Products cannot be ordered if the stock reaches 0, preventing accidental checkout of empty stock.

### 3.2 Gain Creators
* **Dynamic Stock Badges:** Shoppers immediately see "In Stock" or "Out of Stock" alerts on the Product Details page.
* **Order History Dashboard:** Users can review details of all their past orders, including receipt summaries.
* **Admin Stock Metrics:** Real-time dashboard figures show low-stock warnings, enabling immediate restocking orders.


