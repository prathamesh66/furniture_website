# 🛋️ Furniture E-Commerce Website

A full-stack **Furniture E-Commerce Website** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.

This project provides a complete online furniture shopping experience where users can browse furniture products, search and filter products, manage their cart and wishlist, place orders, make payments, and manage their accounts.

The project also includes an **Admin Panel** for managing products, categories, users, orders, and other e-commerce operations.

---


# 🏠 About The Project

The **Furniture E-Commerce Website** is a modern full-stack web application designed for selling furniture products online.

Users can explore different furniture categories, search for products, apply filters, view detailed product information, add products to their cart or wishlist, and place orders.

The application is built with a separate frontend and backend architecture.

### Main Goals

* Build a real-world MERN stack application
* Implement complete e-commerce functionality
* Provide a user-friendly shopping experience
* Implement secure authentication
* Create an admin dashboard
* Manage products and categories dynamically
* Implement cart, wishlist and order functionality
* Integrate online payment functionality
* Practice REST API development
* Work with MongoDB and Mongoose

---

# ✨ Features

## 👤 User Features

* User Registration
* User Login
* User Logout
* Google Authentication
* User Profile
* Update User Profile
* Change Password
* Forgot Password
* Reset Password
* Email Verification
* Authentication using JWT
* Browse Products
* Search Products
* Product Filtering
* Product Sorting
* Product Details
* Product Reviews
* Add to Cart
* Update Cart Quantity
* Remove From Cart
* Wishlist
* Remove From Wishlist
* Product Categories
* Featured Products
* New Arrivals
* Best Selling Products
* Sale Products
* Upsell Products
* Checkout
* Address Management
* Order Placement
* Order History
* Order Details
* Payment Integration
* Responsive UI

---

# 👨‍💼 Admin Features

The application includes an Admin Panel for managing the e-commerce website.

### Admin Dashboard

Admin can manage:

* Products
* Categories
* Users
* Orders
* Product Inventory
* Product Pricing
* Product Images
* Featured Products
* Sale Products
* New Arrivals
* Best Selling Products
* Upsell Products

### Product Management

Admin can:

* Add Product
* Update Product
* Delete Product
* View Products
* Upload Product Images
* Set Product Price
* Set Discount Price
* Set Product Stock
* Assign Product Category
* Set Product Status
* Mark Product as Featured
* Mark Product as New Arrival
* Mark Product as Best Seller
* Mark Product as On Sale

### Category Management

Admin can:

* Create Categories
* Update Categories
* Delete Categories
* View Categories
* Manage Parent Categories
* Assign Products to Categories

### Order Management

Admin can:

* View All Orders
* View Order Details
* Update Order Status
* Track Order Information
* Manage Customer Orders

---

# 🛍️ Product Features

Products contain information such as:

* Product Name
* Product Description
* Product Images
* Product Price
* Discount Price
* Category
* Subcategory
* Stock
* Rating
* Reviews
* Product Status
* Featured Status
* Sale Status
* New Arrival Status
* Best Seller Status

---

# ⭐ Product Sections

The homepage can display products dynamically in different sections.

### Featured Products

Products specifically marked as featured by the administrator.

### New Arrivals

Recently added products.

### On Sale

Products currently available with discounts.

### Best Selling

Products identified as best-selling products.

### Upsell Products

Products displayed as additional recommendations to encourage customers to explore related products.

---

# 🔐 Authentication

The project uses secure authentication mechanisms.

### Authentication Methods

* Email/Password Authentication
* JWT Authentication
* Google Authentication

### Authentication Flow

```text
User
 │
 ▼
Login / Register
 │
 ▼
Backend Authentication
 │
 ▼
JWT Token
 │
 ▼
Authenticated User
 │
 ▼
Protected Routes
```

Protected routes prevent unauthorized users from accessing restricted functionality.

---



# 🧰 Technology Stack

## Frontend

* React.js
* React Router DOM
* JavaScript
* Tailwind CSS
* Axios
* React Icons
* HTML5
* CSS3

## Backend

* Node.js
* Express.js
* JavaScript
* REST APIs
* JWT
* bcrypt / bcryptjs
* Nodemailer

## Database

* MongoDB
* Mongoose

## Authentication

* JSON Web Token
* Google Authentication

## Payment

* Payment Gateway Integration

## File/Image Management

* Cloud-based image storage

---

# 🏗️ Project Architecture

The project follows a typical MERN full-stack architecture.

```text
                    ┌───────────────────┐
                    │      Client       │
                    │   React.js App    │
                    └─────────┬─────────┘
                              │
                              │ HTTP Requests
                              ▼
                    ┌───────────────────┐
                    │      Backend      │
                    │    Express.js     │
                    │      Node.js      │
                    └─────────┬─────────┘
                              │
                              │ Mongoose
                              ▼
                    ┌───────────────────┐
                    │     MongoDB       │
                    │     Database      │
                    └───────────────────┘
```

---

# 📂 Project Structure

```text
ecom-project/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   │
│   ├── config/
│   │   ├── db.js
│   │   ├── Mail.js
│   │   └── ...
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── ...
│   │
│   ├── models/
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   ├── categoryModel.js
│   │   ├── cartModel.js
│   │   ├── orderModel.js
│   │   └── ...
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── ...
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── ...
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

> The exact folder names may vary depending on the final project implementation.

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/prathamesh66/ecom-project.git
```

Navigate into the project:

```bash
cd ecom-project
```

---

# 📦 Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

# 📦 Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=8000

MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret



EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password


PAYMENT_KEY=your_payment_key
PAYMENT_SECRET=your_payment_secret
```

### ⚠️ Important

Never upload your `.env` file to GitHub.

Add this to `.gitignore`:

```gitignore
.env
node_modules
```

---

# ▶️ Running The Project

## Start Backend

```bash
cd backend
npm run dev
```

Backend will run on:

```text
http://localhost:8000
```

---

## Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

# 🔄 Application Flow

```text
User
 │
 ▼
Homepage
 │
 ├── Categories
 │
 ├── Featured Products
 │
 ├── New Arrivals
 │
 ├── Best Sellers
 │
 └── Sale Products
 │
 ▼
Product Listing
 │
 ▼
Product Details
 │
 ├── Add To Cart
 │
 ├── Add To Wishlist
 │
 └── Buy Now
 │
 ▼
Cart
 │
 ▼
Checkout
 │
 ▼
Payment
 │
 ▼
Order Created
 │
 ▼
Order History
```

---

# 🔌 API Overview

The backend provides REST APIs for frontend communication.

## Authentication APIs

```text
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/profile
```

---

## Product APIs

```text
GET      /api/products
GET      /api/products/:id
POST     /api/products
PUT      /api/products/:id
DELETE   /api/products/:id
```

---

## Category APIs

```text
GET      /api/categories
POST     /api/categories
PUT      /api/categories/:id
DELETE   /api/categories/:id
```

---

## Cart APIs

```text
GET      /api/cart
POST     /api/cart
PUT      /api/cart/:id
DELETE   /api/cart/:id
```

---

## Wishlist APIs

```text
GET      /api/wishlist
POST     /api/wishlist
DELETE   /api/wishlist/:id
```

---

## Order APIs

```text
POST     /api/orders
GET      /api/orders
GET      /api/orders/:id
PUT      /api/orders/:id
```

> API endpoint names may differ slightly depending on the final backend implementation.

---

# 🗄️ Database

The application uses **MongoDB** as the primary database.

Mongoose is used for:

* Schema creation
* Data validation
* Database queries
* Relationships
* CRUD operations

### Main Collections

```text
Users
Products
Categories
Cart
Orders
Reviews
Wishlist
```

---

# 👤 User Data

A user can have information such as:

```text
User
├── name
├── email
├── password
├── role
├── profile
├── address
├── wishlist
├── cart
└── orders
```

Roles can include:

```text
user
admin
```

---

# 🛋️ Product Data

Example product structure:

```text
Product
├── productName
├── description
├── price
├── discountPrice
├── images
├── parentCategory
├── category
├── stock
├── rating
├── reviews
├── featured
├── onSale
├── newArrival
└── bestSeller
```

---

# 🗂️ Product Categories

The furniture store can support categories such as:

### Living Room

* Sofas
* Coffee Tables
* TV Units
* Recliners
* Side Tables

### Bedroom

* Beds
* Wardrobes
* Bedside Tables
* Dressers

### Dining Room

* Dining Tables
* Dining Chairs
* Cabinets

### Office

* Office Chairs
* Office Tables
* Bookshelves
* Storage Units

### Decor

* Lamps
* Mirrors
* Wall Decor
* Accessories

---

# 🛒 Shopping Cart

Users can add products to their shopping cart.

Cart functionality includes:

* Add Product
* Remove Product
* Increase Quantity
* Decrease Quantity
* Calculate Total
* Calculate Subtotal
* Product Availability
* Checkout

Example:

```text
Product Price       ₹10,000
Quantity                 2
---------------------------
Subtotal            ₹20,000
Discount             ₹2,000
---------------------------
Total               ₹18,000
```

---

# ❤️ Wishlist

Users can save products for future purchases.

Wishlist functionality:

```text
Add Product
     │
     ▼
Wishlist
     │
     ├── View Product
     ├── Remove Product
     └── Move/Add To Cart
```

---

# 📦 Order Management

After successful checkout, an order is created.

Order information can include:

```text
Order
├── User
├── Products
├── Quantity
├── Total Amount
├── Shipping Address
├── Payment Status
├── Order Status
├── Order Date
└── Delivery Information
```

### Order Status

```text
Pending
   ↓
Confirmed
   ↓
Processing
   ↓
Shipped
   ↓
Out For Delivery
   ↓
Delivered
```

Orders can also be cancelled depending on the application's business rules.

---

# 💳 Payment Integration

The project supports online payment integration through a payment gateway.

General payment flow:

```text
Cart
 │
 ▼
Checkout
 │
 ▼
Create Order
 │
 ▼
Payment Gateway
 │
 ▼
Payment Verification
 │
 ▼
Payment Successful
 │
 ▼
Order Confirmed
```

Payment credentials should always be stored securely in environment variables.

---

# 🔎 Search & Filtering

Users can search and filter furniture products.

### Search

Users can search by:

* Product Name
* Category
* Furniture Type
* Keywords

### Filters

Possible filters include:

* Category
* Price Range
* Availability
* Rating
* Product Type
* Sale
* New Arrival

### Sorting

Users can sort products by:

* Price: Low to High
* Price: High to Low
* Newest
* Popularity
* Rating

---

# 📱 Responsive Design

The website is designed to work across different screen sizes.

### Supported Devices

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📱 Tablet

Responsive UI is implemented using modern CSS and Tailwind CSS utility classes.

---

# 🔒 Security

The application follows several security practices.

### Authentication

JWT-based authentication is used for protected APIs.

### Password Security

Passwords are hashed before being stored in the database.

### Environment Variables

Sensitive information is stored inside `.env`.

### Authorization

Admin-only functionality is protected using role-based authorization.

Example:

```text
User
 │
 ├── Normal User
 │      └── Shopping Features
 │
 └── Admin
        ├── Product Management
        ├── Category Management
        ├── User Management
        └── Order Management
```

---

# 🧪 Testing

The project can be tested manually using:

* Browser
* Postman
* MongoDB Compass
* Developer Tools

API testing can be performed using Postman.

Example:

```text
POST /api/auth/login
```

Request:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

---

# 🚀 Future Improvements

Possible future improvements include:

* Advanced AI product recommendations
* Furniture image search
* AR furniture preview
* Product comparison
* Advanced analytics dashboard
* Customer reviews with images
* Real-time order tracking
* Coupon management
* Discount management
* Inventory alerts
* Multiple payment gateways
* Email order notifications
* SMS notifications
* Recently viewed products
* Personalized recommendations
* Progressive Web App support
* Performance optimization
* Automated testing

---

# 🎯 Learning Outcomes

This project helped demonstrate practical knowledge of:

### Frontend Development

* React.js
* React Hooks
* React Router
* Component Architecture
* State Management
* API Integration
* Form Handling
* Responsive Design
* Tailwind CSS

### Backend Development

* Node.js
* Express.js
* REST APIs
* Middleware
* Authentication
* Authorization
* Error Handling

### Database

* MongoDB
* Mongoose
* CRUD Operations
* Schema Design
* Database Relationships

### Full Stack

* Frontend ↔ Backend communication
* REST API integration
* Authentication flow
* File/Image upload
* E-commerce architecture
* Payment workflow
* Deployment concepts

---

# 🌐 Deployment

The project can be deployed using services such as:

### Frontend

* Vercel
* Netlify

### Backend

* Render
* Railway
* AWS

### Database

* MongoDB Atlas

### Image Storage

* Cloudinary

---

# 📌 Git Commands

Clone the project:

```bash
git clone <repository-url>
```

Check status:

```bash
git status
```

Add files:

```bash
git add .
```

Commit:

```bash
git commit -m "Initial commit"
```

Push:

```bash
git push origin main
```

---

# 🧑‍💻 Author

## Prathamesh Deshmukh

MCA Student | MERN Stack Developer 

### Skills

* React.js
* JavaScript
* Node.js
* Express.js
* MongoDB
* Mongoose
* Tailwind CSS
* REST API
* Git & GitHub

---

# ⭐ Project Highlights

```text
✅ MERN Stack E-Commerce Application
✅ Responsive Furniture Store
✅ User Authentication
✅ Google Authentication
✅ JWT Authorization
✅ Admin Panel
✅ Product Management
✅ Category Management
✅ Cart Management
✅ Wishlist
✅ Product Search
✅ Product Filtering
✅ Featured Products
✅ New Arrivals
✅ Best Sellers
✅ Sale Products
✅ Upsell Products
✅ AI Search
✅ Order Management
✅ Payment Integration
✅ MongoDB Database
✅ REST APIs
```

---

## Made with ❤️ using the MERN Stack

**React.js + Node.js + Express.js + MongoDB**
