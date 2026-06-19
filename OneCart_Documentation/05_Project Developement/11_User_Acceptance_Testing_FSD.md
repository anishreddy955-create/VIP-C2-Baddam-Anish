# Project Development - User Acceptance Testing (UAT) Deliverable

**Date:** 18 June 2026  
**Project Name:** OneCart-E commerce application  
**Team Member:** Baddam Anish Reddy (Full Stack Developer)  
**Deliverable Number:** 11 of 11

---

## 1. Project Overview
* **Project Name:** OneCart
* **Project Description:** A MERN-stack web application featuring secure JWT authentication via cookies, catalog search/filter, a reactive contextual cart, a shipping/payment checkout funnel, and a central administrator dashboard.
* **Project Version:** v1.0.0
* **Testing Period:** 15 June 2026 to 18 June 2026

---

## 2. Testing Scope
* **Authentication Flow:** User signup, login verification, profile editing, and administrator route protection.
* **Product Discovery:** Category filtering, live search queries, and dynamic out-of-stock badge displays.
* **Cart Transactions:** Context state increments, shipping address form persistence, simulated payment selection, and order creation.
* **Administrative Controls:** Adding products, editing prices, monitoring inventory alert pages.

---

## 3. Testing Environment
* **URL/Location:** Frontend running at `http://localhost:5173`, Backend running at `http://localhost:5000`
* **Test Credentials:**
  * *Standard Buyer:* `user@test.com` / `password123`
  * *Store Administrator:* `admin@test.com` / `admin123`

---

## 4. UAT Test Cases

| Test Case ID | Test Scenario | Test Steps | Expected Result | Actual Result | Pass/Fail |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-001** | User Account Creation | 1. Go to `/register` <br>2. Enter name, valid email, and matching passwords. <br>3. Submit form. | Account is created, user is redirected to `/login`, and profile is stored in MongoDB. | User successfully registered and redirected. | **Pass** |
| **TC-002** | Secure Admin Login | 1. Go to `/login` <br>2. Enter admin credentials. <br>3. Click Submit. | JWT token is returned inside an HttpOnly cookie, user state is set to isAdmin, dashboard button appears in navbar. | Admin logged in, token stored in cookie, dashboard visible. | **Pass** |
| **TC-003** | Catalog Search & Filter | 1. Go to `/` <br>2. Type "Shirt" in search box. <br>3. Select Category "Fashion". | Product list dynamically shrinks to show only items containing the name "Shirt". | Filtered product list is rendered instantly. | **Pass** |
| **TC-004** | Cart persistent addition | 1. Open a product card. <br>2. Click "Add to Cart" twice. <br>3. Check cart badge in header. | Cart count increments to 2, and number remains 2 even after browser page reload. | Context state holds value and cart badge shows 2. | **Pass** |
| **TC-005** | Place Order & Stock depletion | 1. Go to `/cart` and click Checkout. <br>2. Fill shipping details and place order. <br>3. Open Stock Alert as admin. | Checkout goes through, order receipt is created, and item's stock count is decremented by ordered count in MongoDB. | Transaction completed, database stock successfully decremented. | **Pass** |
| **TC-006** | Admin Dashboard Security Guard | 1. Log out. <br>2. Attempt to open `/admin/dashboard` in URL bar directly. | React Route Guard blocks transition and redirects browser to `/login`. | Route blocked, redirected to login page. | **Pass** |

---

## 5. Bug Tracking Log

| Bug ID | Bug Description | Steps to Reproduce | Severity | Status | Additional Feedback |
| :---: | :--- | :--- | :---: | :---: | :--- |
| **BG-001** | Cart is cleared when shopper logs out and logs in as a different user. | 1. Add items to cart as User A. <br>2. Log out. <br>3. Log in as User B. | Low | **Closed** | This is the expected security behavior; cart context state resets on auth token deletion. |
| **BG-002** | Product details page throws an undefined error if the product ID in URL does not exist in MongoDB. | 1. Manually enter `/product/999999` in browser address bar. | Medium | **Closed** | Fixed by adding error boundary middleware and redirecting invalid IDs to a 404 page. |

---

## 6. Sign-off
* **Tester Name:** Baddam Anish Reddy
* **Tester Role:** Full Stack Developer & Lead QA
* **Date of Test Completion:** 18 June 2026
* **Approval Status:** Approved for Deployment


