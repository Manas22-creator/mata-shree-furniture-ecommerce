const dotenv = require('dotenv');
// Configure dotenv at the absolute top of your entry file.
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// --- Import ALL your route files in one clean block ---
const productRoutes = require('./routes/product.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const cartRoutes = require('./routes/cart.routes.js');
const orderRoutes = require('./routes/order.routes.js');

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Serve static files from the public directory
// This allows the frontend to access images at: /assets/products/royal-king-bed.jpg
app.use(express.static('public'));

// A simple test route
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/products', productRoutes);
app.use('/api/users', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));