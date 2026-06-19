# Project Planning Phase - Product Backlog & Sprint Schedule

**Date:** 18 June 2026  
**Project Name:** OneCart-E commerce application  
**Team Member:** Baddam Anish Reddy (Full Stack Developer)  
**Deliverable Number:** 10 of 11

---

## 1. Product Backlog & Sprint Schedule
We used standard Agile Scrum methodologies to break down our Product Backlog into 4 distinct Sprints, estimating story points using the Fibonacci sequence (1, 2, 3, 5).

| Sprint | Functional Requirement (Epic) | User Story Number | User Story / Task | Story Points | Priority | Team Members |
| :---: | :--- | :---: | :--- | :---: | :---: | :--- |
| **Sprint-1** | User Authentication | **USN-1** | As a shopper, I can register for a OneCart account using my email and password. | 3 | High | Baddam Anish Reddy |
| **Sprint-1** | User Authentication | **USN-2** | As a user, I can log into the site and receive a secure HTTP-Only cookie containing my JWT token. | 2 | High | Baddam Anish Reddy |
| **Sprint-1** | Database Setup | **USN-3** | As a developer, I can initialize the MongoDB database and seed initial products using a seed script. | 3 | High | Baddam Anish Reddy |
| **Sprint-2** | Product Browsing | **USN-4** | As a user, I can view products, search by keyword, and filter by category on the home page. | 3 | High | Baddam Anish Reddy |
| **Sprint-2** | Product Details | **USN-5** | As a user, I can open a product details page to view descriptions, prices, ratings, and stock status. | 2 | Medium | Baddam Anish Reddy |
| **Sprint-2** | Shopping Cart | **USN-6** | As a user, I can add items to the cart, edit quantities, and delete items from my cart. | 3 | High | Baddam Anish Reddy |
| **Sprint-3** | Shipping & Checkout | **USN-7** | As a shopper, I can enter shipping address coordinates and select my preferred simulated payment option. | 3 | High | Baddam Anish Reddy |
| **Sprint-3** | Place Order | **USN-8** | As a shopper, I can review my final checkout calculations and place my order, decrementing product stock. | 5 | High | Baddam Anish Reddy |
| **Sprint-4** | User Profile | **USN-9** | As a user, I can view my profile details and review lists of my past completed orders. | 2 | Medium | Baddam Anish Reddy |
| **Sprint-4** | Admin Dashboard | **USN-10** | As an admin, I can view overall store revenue, list user databases, and delete products. | 5 | High | Baddam Anish Reddy |
| **Sprint-4** | Admin Stock Alerts | **USN-11** | As an admin, I can view stock detail pages and see low-stock flags when item counts fall below 5. | 2 | Medium | Baddam Anish Reddy |

---

## 2. Project Tracker, Velocity & Burndown Metrics

### 2.1 Project Tracker Table
The project is scheduled over a 4-week window (6 development days per sprint iteration).

| Sprint | Total Story Points | Duration | Sprint Start Date | Sprint End Date (Planned) | Story Points Completed | Sprint Release Date (Actual) |
| :---: | :---: | :---: | :--- | :--- | :---: | :--- |
| **Sprint-1** | 8 | 6 Days | 01 June 2026 | 07 June 2026 | 8 | 07 June 2026 |
| **Sprint-2** | 8 | 6 Days | 08 June 2026 | 14 June 2026 | 8 | 14 June 2026 |
| **Sprint-3** | 8 | 6 Days | 15 June 2026 | 21 June 2026 | 8 | 21 June 2026 (Est.) |
| **Sprint-4** | 9 | 6 Days | 22 June 2026 | 28 June 2026 | 9 | 28 June 2026 (Est.) |

### 2.2 Velocity Calculation
* **Total Story Points:** 33 points.
* **Total Duration:** 24 development days.
* **Average Team Velocity:** ~8.25 story points per sprint iteration.
* **Story Points Per Day:** ~1.37 story points completed per active development day.

### 2.3 Burndown Chart Data
The burndown chart maps the remaining story points over the course of the project schedule:
* **Day 0 (Planned):** 33 story points remaining.
* **End of Sprint 1 (Day 6):** 25 story points remaining (Registration, Login, MongoDB setups completed).
* **End of Sprint 2 (Day 12):** 17 story points remaining (Catalog lists, Detail cards, Cart states completed).
* **End of Sprint 3 (Day 18):** 9 story points remaining (Shipping details, payment gateways, PlaceOrder flows completed).
* **End of Sprint 4 (Day 24):** 0 story points remaining (Profiles, Admin dashboards, Stock Alerts completed).


