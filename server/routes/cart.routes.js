const express = require('express');
const router = express.Router();
const {
    getCartItems,
    addToCart,
    removeFromCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getCartItems).post(protect, addToCart);
router.route('/:productId').delete(protect, removeFromCart);

module.exports = router;