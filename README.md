🪑 Mata Shree Furniture – Full-Stack E-commerce Platform

🌐 Live Demo
(Add your live deployment link here once deployed)

A modern, full-featured e-commerce web application built from scratch using the MERN stack (MongoDB, Express.js, React, Node.js).
This project transforms a static furniture design into a dynamic online store with user authentication, persistent cart, multi-step checkout, and secure payment integration.

📌 Project Overview

Mata Shree Furniture allows customers to:

Browse a dynamic catalog of furniture products with real-time search and category filters  
Register and log in securely with hashed passwords and JWT-based authentication  
Maintain a persistent shopping cart across sessions and devices  
Complete a multi-step checkout, including shipping details  
Make secure online payments via Razorpay integration  
Access a fully responsive UI optimized for mobile, tablet, and desktop  

This project demonstrates end-to-end full-stack development skills, including database modeling, RESTful API design, secure authentication, state management, and pixel-perfect responsive UI.

🚀 Core Features
Front-End Features

✅ Dynamic Product Catalog – Fetches products from MongoDB and displays them with filtering and search  
✅ Responsive Design – Mobile-first, modern layouts using CSS Flexbox and Grid  
✅ Protected Routes – Shipping and checkout pages accessible only to logged-in users  
✅ Multi-Step Checkout – Cart → Shipping → Order Summary → Payment  
✅ Reusable Components – Navbar, Footer, ProductCard, ProtectedRoute, etc.  
✅ State Management – AuthContext & CartContext for global state across the app  

Back-End Features

✅ Secure User Authentication – JWT tokens & bcrypt.js password hashing  
✅ Persistent Shopping Cart – Server-side cart stored in MongoDB  
✅ Order Management – Creates orders and updates status after payment verification  
✅ Payment Gateway Integration – Razorpay checkout modal and server-side verification  
✅ RESTful API – Organized, secure endpoints for users, products, cart, and orders  
✅ Middleware – Custom authentication middleware protects sensitive routes  

🛠️ Technology Stack
Frontend

⚛ React.js – Component-based UI

🧠 JavaScript (ES6+) – Interactive UI logic

💨 CSS3 – Custom responsive styling

🔗 React Router – Client-side routing

📡 Axios – API requests to backend

🔒 React Context API – Global state management

Backend

⚡ Node.js & Express.js – RESTful API development

🗄 MongoDB & Mongoose – Database modeling & storage

🔐 bcrypt.js – Password hashing

📝 jsonwebtoken (JWT) – Secure user authentication

🛡 Custom middleware – Route protection

💳 Razorpay – Payment gateway integration

Tools & Deployment

🖥 VS Code – Development IDE

📦 npm – Package management

🌐 dotenv – Secure environment variable management

🚀 Ready for production build and deployment
```
📂 Project Structure
mata-shree-furniture-ecommerce/
├── client/                 # React front-end
│   ├── public/             # Static assets & HTML shell
│   └── src/
│       ├── assets/         # Images, icons, products
│       ├── components/     # Reusable UI components
│       ├── context/        # Global state (Auth & Cart)
│       ├── pages/          # Main pages (Home, Products, Cart, etc.)
│       ├── App.js          # Main React component with routing
│       └── index.js        # React entry point
├── server/                 # Node.js + Express back-end
│   ├── config/             # DB connection, Stripe config
│   ├── controllers/        # API route logic
│   ├── models/             # Mongoose schemas (User, Product, Order)
│   ├── routes/             # Express routes
│   ├── middleware/         # Auth middleware
│   └── server.js           # Express server entry point
├── .gitignore
└── README.md
```
💻 Installation & Development
Prerequisites

Node.js & npm

MongoDB Atlas account (or local MongoDB)

VS Code (or preferred IDE)

Backend Setup

Clone the repository:
```
git clone https://github.com/Manas22-creator/mata-shree-furniture-ecommerce.git
cd mata-shree-furniture-ecommerce/server
```

Install dependencies:
```
npm install
```

Create a .env file in /server:

MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
RAZORPAY_KEY_ID=<your_razorpay_key_id>
RAZORPAY_KEY_SECRET=<your_razorpay_key_secret>
PORT=5000


Start the backend server:

```npm start```


Server runs at: http://localhost:5000

Frontend Setup

Navigate to client folder:

```cd ../client```


Install dependencies:

```npm install```


Start the React development server:

```npm start```


Frontend runs at: http://localhost:3000

🔮 Future Enhancements

Deploy frontend on Netlify/Vercel and backend on Render/Heroku

Implement admin panel for product management

Add user order history and profile management

Implement discount codes & offers

Optimize performance for large product catalogs

📷 Screenshots

(Add screenshots here: product catalog, cart, checkout, responsive views)

🙌 Credits

This project is built by Manas Pandey to showcase full-stack MERN development skills.
It demonstrates a real-world e-commerce workflow including authentication, cart management, multi-step checkout, and payment gateway integration.
