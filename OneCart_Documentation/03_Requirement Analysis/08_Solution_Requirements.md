# Requirement Analysis - Solution Requirements Deliverable

**Date:** 18 June 2026  
**Project Name:** OneCart-E commerce application  
**Team Member:** Baddam Anish Reddy (Full Stack Developer)  
**Deliverable Number:** 8 of 11

---

## 1. Functional Requirements (FR)
Functional Requirements define the specific behaviors, services, and tasks that the OneCart MERN application must perform.

| FR No. | Functional Requirement (Epic) | Sub-Requirement (Story / Sub-Task) |
| :--- | :--- | :--- |
| **FR-1** | **User Account & Session Management** | * Register new accounts with fields (name, email, password). <br>* Log in with password verification, generating HttpOnly cookie session token. <br>* Read and modify profile details and password hashes. |
| **FR-2** | **Product Browsing & Discovery** | * Fetch and render all catalog products inside a responsive grid list. <br>* Detail pages showing ratings, category labels, descriptions, and stock counts. <br>* Query filters enabling category selectors and live text filtering. |
| **FR-3** | **Cart & Checkout Processing** | * Add to cart and persistent quantity adjustments. <br>* Shipping address form validation and browser persistence. <br>* Place order page that creates a transaction log and reduces DB product stock. |
| **FR-4** | **Admin Operations & Dashboards** | * Protected admin routes for stock management. <br>* CRUD operations (creation, editing details, updating stock levels, deletion of products). <br>* Sales charts aggregates showing total earnings, user counts, and order statistics. |

---

## 2. Non-Functional Requirements (NFR)
Non-Functional Requirements define the quality attributes, operational limits, security protocols, and system standards of the OneCart platform.

### NFR-1: Usability (User Experience)
* **Design Standards:** Interface must follow modern CSS guidelines (harmonious color palettes, clear typography, responsive layouts for mobile and desktop viewports).
* **Feedback loops:** Hover micro-animations on savings/action buttons and visual loaders during AJAX data fetches.

### NFR-2: Security (Data Protection)
* **JWT Storage:** Session cookies must have attributes `httpOnly`, `secure`, and `sameSite` set to prevent script access.
* **Encryption:** User passwords must be encrypted using `bcryptjs` with a cost factor of 10.
* **API Protection:** Backend controllers must filter out sensitive data (like password hashes) before sending JSON back to the client.

### NFR-3: Reliability & Error Tolerance
* **Error Handling:** Client-side form submissions must show clear error messages (e.g. "Passwords do not match").
* **API Exceptions:** Server-side crashes are caught by global Express exception handlers (`errorMiddleware.js`) and returned as JSON objects with stacks displayed only in development mode.

### NFR-4: Performance & Latency
* **Initial Page Load:** Vite build packaging must be optimized to ensure client loads in under 1.5 seconds on a standard 3G connection.
* **API Response Time:** MongoDB queries must return response payloads within 200ms.

### NFR-5: Availability
* **Database Hosting:** DB must utilize MongoDB Atlas cross-region replication for 99.9% uptime.
* **Server Resilience:** Node server process must use a process manager (like PM2) to automatically restart in case of unexpected memory issues.

### NFR-6: Scalability
* **Stateless API:** Node server does not store session memory, allowing instances to be clustered across container engines behind load balancers.


