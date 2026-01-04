const Product = require('../models/product.model.js');

// Helper function to construct full image URL
const getFullImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) return imagePath;
    
    // Otherwise, prepend the API base URL
    const apiUrl = process.env.API_BASE_URL || 'https://mata-shree-furniture-ecommerce.onrender.com';
    
    // Ensure imagePath starts with / for proper URL formation
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    
    return `${apiUrl}${cleanPath}`;
};

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        
        // Transform products to include full image URLs and validate data
        const productsWithFullUrls = products.map(product => {
            const productObj = product.toObject();
            return {
                ...productObj,
                image: getFullImageUrl(productObj.image),
                // Add validation for required fields
                name: productObj.name || 'Unknown Product',
                price: productObj.price || 0,
                description: productObj.description || 'No description available',
                category: productObj.category || 'Uncategorized'
            };
        });
        
        res.json(productsWithFullUrls);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Fetch a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (product) {
            const productObj = product.toObject();
            const productWithFullUrl = {
                ...productObj,
                image: getFullImageUrl(productObj.image),
                // Add validation for required fields
                name: productObj.name || 'Unknown Product',
                price: productObj.price || 0,
                description: productObj.description || 'No description available',
                category: productObj.category || 'Uncategorized'
            };
            res.json(productWithFullUrl);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getProducts, getProductById };