const Order = require('../models/order.model.js');
const User = require('../models/user.model.js');
const Razorpay = require('razorpay');
const crypto = require('crypto'); // Built-in Node module

// Initialize Razorpay with better error checking
let razorpay;
try {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    console.log('✅ Razorpay initialized successfully');
} catch (error) {
    console.error('❌ Razorpay initialization error:', error.message);
    console.warn('⚠️  Razorpay keys may be missing. Check .env file');
}

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        // After creating the order, clear the user's cart
        const user = await User.findById(req.user._id);
        if (user) {
            user.cart = [];
            await user.save();
        }

        console.log('✅ Order created:', createdOrder._id);
        res.status(201).json(createdOrder);
    } catch (error) {
        console.error('❌ Error in createOrder:', error.message);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Create a Razorpay order
// @route   POST /api/orders/:id/create-razorpay-order
// @access  Private
const createRazorpayOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (!razorpay) {
            return res.status(500).json({ 
                message: 'Payment gateway not configured. Missing Razorpay credentials.' 
            });
        }

        const options = {
            amount: Math.round(order.totalPrice * 100), // amount in paise
            currency: "INR",
            receipt: order._id.toString(),
        };

        console.log('📝 Creating Razorpay order with amount:', options.amount);
        
        const razorpayOrder = await razorpay.orders.create(options);
        
        console.log('✅ Razorpay order created:', razorpayOrder.id);
        res.json(razorpayOrder);
    } catch (error) {
        console.error('❌ Error in createRazorpayOrder:', error.message);
        res.status(500).json({ 
            message: error.message || 'Failed to create Razorpay order',
            details: error.message 
        });
    }
};

// @desc    Verify Razorpay payment and update order
// @route   POST /api/orders/verify-payment
// @access  Private
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = req.body;

        // Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: 'Missing payment details' });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        console.log('🔐 Verifying signature...');
        console.log('Expected:', expectedSignature);
        console.log('Received:', razorpay_signature);

        if (expectedSignature === razorpay_signature) {
            // Signature is valid, update the order
            const order = await Order.findById(order_id);
            
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: razorpay_payment_id,
                status: 'COMPLETED',
                update_time: Date.now(),
                email_address: req.user.email,
            };
            
            await order.save();
            
            console.log('✅ Payment verified and order updated');
            res.json({ message: 'Payment verified successfully', order });
        } else {
            console.error('❌ Signature mismatch');
            res.status(400).json({ message: 'Payment verification failed - Invalid signature' });
        }
    } catch (error) {
        console.error('❌ Error in verifyPayment:', error.message);
        res.status(500).json({ 
            message: error.message || 'Payment verification error',
            details: error.message 
        });
    }
};

module.exports = { createOrder, createRazorpayOrder, verifyPayment };