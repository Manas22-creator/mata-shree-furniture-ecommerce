import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailPage';

// Import the global stylesheet. This is crucial for the design.
import './App.css';
import './responsiveness.css'; 

// Import Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Page Components
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';     // You will create this file
import ContactPage from './pages/ContactPage';   // You will create this file
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import ShippingPage from './pages/ShippingPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
// import OrderPage from './pages/OrderPage';    // A future page for viewing order details

// Import Utility Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      {/* The Navbar will appear on every page */}
      <Navbar />

      {/* The <main> tag wraps the content that will change on each page */}
      <main>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          
          {/* --- Protected Routes (Only accessible when logged in) --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            {/* Example of a future route for viewing a specific order */}
            {/* <Route path='/order/:id' element={<OrderPage />} /> */}
          </Route>
        </Routes>
      </main>

      {/* The Footer will appear on every page */}
      <Footer />
    </Router>
  );
}

export default App;
