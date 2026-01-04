const express = require('express');
const router = express.Router();
const {
    createOrder,
    createRazorpayOrder,
    verifyPayment,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createOrder);
router.route('/:id/create-razorpay-order').post(protect, createRazorpayOrder); // New route
router.route('/verify-payment').post(protect, verifyPayment); // New route

module.exports = router;