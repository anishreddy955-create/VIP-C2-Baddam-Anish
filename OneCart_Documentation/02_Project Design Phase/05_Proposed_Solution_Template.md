# Project Design Phase - Proposed Solution Deliverable

**Date:** 18 June 2026  
**Project Name:** OneCart-E commerce application  
**Team Member:** Baddam Anish Reddy (Full Stack Developer)  
**Deliverable Number:** 5 of 11

---

## 1. Overview
The Proposed Solution Deliverable outlines the structural, business, and operational parameters of the **OneCart** e-commerce system.

---

## 2. Proposed Solution Parameters

| S.No. | Parameter | Description |
| :---: | :--- | :--- |
| **1** | **Problem Statement** | Customers face insecure session management, high latency in product discovery, and inaccurate stock details during checkout. Meanwhile, administrators spend hours manually verifying transactions and adjusting stock without a centralized reporting tool. |
| **2** | **Idea / Solution Description** | A responsive, secure MERN stack web application (MongoDB, Express, React, Node) called **OneCart**. Buyers can register, log in securely with JWT cookies, search and filter dynamic products, save items in a persistent cart, check out with a simulated payment system, and monitor order history. Administrators are provided a dashboard for inventory CRUD, order tracking, and stock alerting. |
| **3** | **Novelty / Uniqueness** | Unlike simple templates, OneCart utilizes HttpOnly cookie-based session tokens for advanced defense-in-depth security. The state management uses React Context API to ensure real-time catalog syncing, and the backend leverages MongoDB aggregation pipelines for efficient stock and sales statistics. |
| **4** | **Social Impact / Customer Satisfaction** | **Social Impact:** Democratizes online sales capabilities for small retail businesses, giving them enterprise-level tools for free.  <br>**Customer Satisfaction:** Achieves high retention by providing instant load times, a zero-friction checkout funnel, and accurate "In Stock" indicators. |
| **5** | **Business Model (Revenue Model)** | * **Transaction Commissions:** Platform handles payments and takes a 2-3% transaction fee per completed sale. <br>* **Subscription for Merchants:** Advanced admin features (automated invoice emailing, monthly PDF sales reports) are unlocked via a subscription tier. <br>* **Direct Retail Sales:** Direct profit from self-stocked fashion and lifestyle items sold on the portal. |
| **6** | **Scalability of the Solution** | * **Database Layer:** MongoDB can be sharded and partitioned across clusters to manage millions of products. <br>* **Backend Layer:** Express api routes are stateless, allowing the Node server to scale horizontally behind a load balancer. <br>* **Frontend Layer:** React client assets can be hosted on Content Delivery Networks (CDNs) for global low-latency access. |


