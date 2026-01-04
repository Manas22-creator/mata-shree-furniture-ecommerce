const User = require('../models/user.model.js');
const Product = require('../models/product.model.js'); // Import the Product model

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCartItems = async (req, res) => {
    try {
        // Use .populate() to replace the product ObjectId with the actual product data
        const user = await User.findById(req.user._id).populate('cart.product');
        if (user) {
            res.json(user.cart);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error in getCartItems:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        // First, ensure the product actually exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const user = await User.findById(req.user._id);

        if (user) {
            const itemIndex = user.cart.findIndex(
                (item) => item.product && item.product.toString() === productId
            );

            if (itemIndex > -1) {
                // Product exists in cart, update quantity
                user.cart[itemIndex].quantity = quantity;
            } else {
                // Product does not exist in cart, add new item
                user.cart.push({ product: productId, quantity });
            }

            const updatedUser = await user.save();
            
            // Populate the cart after saving to send the full product details back to the client
            await updatedUser.populate('cart.product');

            res.status(201).json(updatedUser.cart);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // Add detailed error logging for better debugging
        console.error('Error in addToCart:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            // Filter out the item to be removed
            user.cart = user.cart.filter(
                (item) => item.product.toString() !== req.params.productId
            );
            await user.save();
            
            // --- FIX IS HERE ---
            // Populate the remaining items and send back the updated cart array.
            await user.populate('cart.product');
            res.json(user.cart); 
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error in removeFromCart:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getCartItems, addToCart, removeFromCart };