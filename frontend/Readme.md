E-Commerce SPA Assignment

A single-page web application (SPA) for an e-commerce platform with JWT authentication, product CRUD, filters, and a persistent cart.

Features
Backend

Authentication with JWT

CRUD APIs for products (with filtering: price, categories, search)

Add to cart APIs

Seed route to initialize sample products

Frontend

Signup & Login pages

Product Listing page with filters:

Search by name

Filter by type (Top wear, Bottom wear, Accessories)

Price range filter

Cart page:

Add/remove products

Cart persists after logging out

Tech Stack

Backend: Node.js, Express, MongoDB, Mongoose, JWT, dotenv, CORS

Frontend: React, Vite, Tailwind CSS, React Router, Axios, Lucide Icons

API Endpoints
Auth
Method URL Description
POST /api/auth/signup Signup new user
POST /api/auth/login Login user
Products
Method URL Description
GET /api/products List all products (with query filters)
POST /api/products Create new product (auth required)
PUT /api/products/:id Update product (auth required)
DELETE /api/products/:id Delete product (auth required)
Cart
Method URL Description
GET /api/cart Get user cart
POST /api/cart Add product to cart
DELETE /api/cart/:id Remove product from cart
