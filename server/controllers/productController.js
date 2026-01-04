const Product = require('../models/product.model.js');

// Helper function to construct full image URL
const getFullImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise, prepend the API base URL
    const apiUrl = process.env.API_BASE_URL || 'https://mata-shree-furniture-ecommerce.onrender.com';
    return `${apiUrl}${imagePath}`;
};

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        // Transform products to include full image URLs
        const productsWithFullUrls = products.map(product => ({
            ...product.toObject(),
            image: getFullImageUrl(product.image)
        }));
        res.json(productsWithFullUrls);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            const productWithFullUrl = {
                ...product.toObject(),
                image: getFullImageUrl(product.image)
            };
            res.json(productWithFullUrl);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getProducts, getProductById };