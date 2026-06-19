# Requirement Analysis - Technology Stack Selection Deliverable

**Date:** 18 June 2026  
**Project Name:** OneCart-E commerce application  
**Team Member:** Baddam Anish Reddy (Full Stack Developer)  
**Deliverable Number:** 9 of 11

---

## 1. MERN Technology Stack Overview
The OneCart platform is built using the MERN stack, an architecture consisting of MongoDB, Express.js, React, and Node.js. This stack provides a unified JavaScript development workflow from database querying to client-side page rendering.

```
       +-------------------------------------------------+
       |         Frontend Client: React & Vite           |
       |  - Fast SPA rendering, component reuse.          |
       +-----------------------+-------------------------+
                               |
                               | REST Requests / JWT Cookies
                               v
       +-----------------------+-------------------------+
       |       API Application Server: Node & Express    |
       |  - Decoupled REST routes, auth middleware.      |
       +-----------------------+-------------------------+
                               |
                               | Mongoose ODM Queries
                               v
       +-----------------------+-------------------------+
       |         Database Storage: MongoDB (MDB)         |
       |  - Document-oriented, scalable aggregation.    |
       +-------------------------------------------------+
```

---

## 2. Stack Components Selection & Justification

### 2.1 Database Layer: MongoDB & Mongoose
* **Reason for Selection:** E-commerce catalogs involve diverse product items with attributes that change dynamically. MongoDB's document model stores records as BSON (JSON-like) objects, enabling easy modifications of product structures without migrations.
* **Mongoose ODM:** Mongoose provides schema validation (enforcing data types like required fields, string lengths, numerical checks) on top of MongoDB's schemaless model.
* **Alternatives Considered:** PostgreSQL or MySQL (Relational DBs). MongoDB was selected because of faster prototyping and JSON compatibility with JavaScript.

### 2.2 Backend Web Framework: Express.js & Node.js
* **Reason for Selection:** Express is a minimal, fast framework built on top of Node.js. Node's non-blocking, event-driven I/O model handles high-concurrency connections efficiently, which is crucial for handling large shopper transaction counts.
* **Alternatives Considered:** Django (Python) or Spring Boot (Java). Express was chosen because it allows writing both backend APIs and frontend components in JavaScript, improving development speed.

### 2.3 Frontend client: React with Vite & Context API
* **Reason for Selection:** React utilizes a virtual DOM to only update components that change, preventing full page reloads. Vite was selected as the build tool because it is faster than Webpack (undergoing rapid Hot Module Replacement).
* **State Management:** React Context API was selected over Redux to manage global cart items and authenticated sessions without adding external package complexity.
* **Alternatives Considered:** Angular or Vue. React's modular ecosystem and massive open-source library support made it the ideal option.

---

## 3. Libraries & Supporting Packages

| Package Name | Purpose | Security / Utility Rationale |
| :--- | :--- | :--- |
| **`jsonwebtoken` (JWT)** | Authentication Token | Signs and verifies user identity tokens. |
| **`bcryptjs`** | Password Hashing | Secures credentials using one-way cryptographic hashing before storage. |
| **`cookie-parser`** | Middleware Parser | Extracts cookie credentials, enabling HttpOnly token readings on incoming requests. |
| **`dotenv`** | Config Management | Separates environmental variables (like DB URIs and JWT secrets) from code. |
| **`cors`** | Request Sharing | Restricts API resource access to specified frontend domains, blocking external scrapers. |
| **`morgan`** | Logging | Log incoming HTTP queries, essential for backend bug tracking and diagnostics. |


