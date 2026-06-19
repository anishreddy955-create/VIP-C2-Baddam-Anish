# Requirement Analysis - Data Flow Diagrams & User Stories

**Date:** 18 June 2026  
**Project Name:** OneCart-E commerce application  
**Team Member:** Baddam Anish Reddy (Full Stack Developer)  
**Deliverable Number:** 7 of 11

---

## 1. Data Flow Diagrams (DFD)

### 1.1 DFD Level 0 (Context Diagram)
The Context Diagram represents the outer boundaries of the OneCart system. It shows the entities (Shopper and Administrator) and the data flows to and from the centralized application.

```
                  +-----------------------------------+
                  |           SHOPPER (Buyer)         |
                  +-----+-----------------------^-----+
                        |                       |
           1. Registration Details     5. Catalog Listings
           2. Login Credentials        6. Cart Update Summaries
           3. Search Queries           7. Order Success Statuses
           4. Checkout Shipping/Pay    8. Past Order History
                        |                       |
                  +-----v-----------------------+-----+
                  |   OneCart E-Commerce App      |
                  +-----^-----------------------+-----+
                        |                       |
           10. Product CRUD Data       11. Sales Aggregate Charts
           9. Status Updates           12. Low-Stock Alerts
           13. Order Confirmations     14. User Account Lists
                        |                       |
                  +-----+-----------------------^-----+
                  |        STORE ADMINISTRATOR        |
                  +-----------------------------------+
```

### 1.2 DFD Level 1 (Process Decomposition)
The Level 1 DFD decomposes the system into the five core processes (Authentication, Catalog Browse, Cart/Checkout, Order processing, and Admin stock controls) and details interactions with the Mongo database.

```
 Shopper ----> [ 1.0 Auth Process ] <===========> [ Users Collection ]
   |                                                    ^
   |---------> [ 2.0 Catalog Browse ] <==> [ Products Collection ]
   |                                                    ^
   |---------> [ 3.0 Cart & Checkout ]                  |
                     |                                  |
                     v                                  |
               [ 4.0 Order Process ] ===> [ Orders Collection ]
                     ^
 Admin ------> [ 5.0 Admin Control ] ===> [ Stock Updates / CRUD ]
```

---

## 2. Agile User Stories & Acceptance Criteria

### US-001: Secure Account Registration
* **User Story:** As an unregistered shopper, I want to create an account by providing my name, email, and password, so that I can save my cart items and view order status.
* **Acceptance Criteria:**
  1. Frontend must validate that the email is a valid format and passwords match.
  2. Backend must check for duplicate email registrations and return a `400 Bad Request` if duplicate exists.
  3. Passwords must be hashed using bcrypt before MongoDB storage.

### US-002: Dynamic Product Catalog Search
* **User Story:** As a shopper, I want to search and filter products by category or keywords, so that I can quickly find the items I wish to purchase.
* **Acceptance Criteria:**
  1. A search text box must dynamically filter the product grid list based on matching names.
  2. Clicking on category buttons must instantly narrow the list.
  3. Products that have `countInStock` equal to 0 must display an "Out of Stock" badge.

### US-003: Persisted Shopping Cart
* **User Story:** As a shopper, I want to add products to a cart and adjust quantities, so that I can keep track of my purchases without losing data on page refreshes.
* **Acceptance Criteria:**
  1. Cart state must be maintained globally via React Context API.
  2. Adding an item must increment the navbar cart counter.
  3. Shoppers must be able to remove items or modify quantities directly in the Cart view.

### US-004: Multi-Step Checkout & Placement
* **User Story:** As a logged-in shopper, I want to enter my shipping address, select a payment option, and place my order, so that I can get my products delivered.
* **Acceptance Criteria:**
  1. Shipping page form values must be persisted in Context state.
  2. Mock payment options (e.g. Stripe, PayPal, Cash) must be selectable.
  3. Placing an order must create an order document in MongoDB and immediately decrement the purchased product counts in the database.

### US-005: Admin Inventory CRUD & Stock alerts
* **User Story:** As a store administrator, I want to create, read, update, and delete product listings and view stock levels, so that my online shop accurately represents my stock.
* **Acceptance Criteria:**
  1. Admin routes must verify the `isAdmin` boolean claim inside the decoded JWT token.
  2. Admins must have forms to change prices, product descriptions, images, and inventory quantities.
  3. Dashboard must list products whose stock is below a threshold (e.g., 5 items) as an alert.


