import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import api from '../api';

// Helper function to load a script
const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

const PlaceOrderPage = () => {
    const navigate = useNavigate();
    const { userInfo } = useContext(AuthContext);
    const { cartItems, shippingAddress, clearCart } = useContext(CartContext);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect if cart or shipping address is missing
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        } else if (cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cartItems, shippingAddress, navigate]);

    // --- Price Calculations ---
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    const shippingPrice = itemsPrice > 750 ? 0 : 500;
    const taxPrice = 0; // Or your tax calculation
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    // --- Main Payment Handler ---
    const placeOrderHandler = async () => {
        setLoading(true);
        setError('');

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!res) {
            setError('Razorpay SDK failed to load. Are you online?');
            setLoading(false);
            return;
        }

        try {
            const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
            
            // 1. Create the order in our DB
            const orderItems = cartItems.map(item => ({ 
                name: item.product.name,
                quantity: item.quantity,
                image: item.product.image,
                price: item.product.price,
                product: item.product._id 
            }));
            
            const { data: createdOrder } = await api.post('/api/orders', {
                orderItems, shippingAddress, paymentMethod: 'Razorpay',
                itemsPrice, taxPrice, shippingPrice, totalPrice
            }, config);

            // 2. Create the Razorpay order
            const { data: razorpayOrder } = await api.post(
                `/api/orders/${createdOrder._id}/create-razorpay-order`, {}, config
            );

            // 3. Configure and open Razorpay checkout
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: razorpayOrder.amount,
                currency: "INR",
                name: "Mata Shree Furniture",
                description: `Order #${createdOrder._id}`,
                order_id: razorpayOrder.id,
                handler: async function (response) {
                    // This handler function has access to everything in scope
                    try {
                        await api.post('/api/orders/verify-payment', {
                            ...response,
                            order_id: createdOrder._id,
                        }, config); // getConfig is not needed here as config is in scope

                        clearCart();
                        navigate(`/order/${createdOrder._id}`);
                    } catch (err) {
                        setError('Payment verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name: userInfo.name,
                    email: userInfo.email,
                },
                theme: { color: '#85582f' }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function (response) {
                setError(`Payment Failed: ${response.error.description}`);
            });
            paymentObject.open();

        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            setError(`An error occurred: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1>Order Summary</h1>
                </div>
            </section>
            <div className="container" style={{padding: '2rem 15px'}}>
                {/* Your existing JSX for displaying order summary... */}
                <div className="order-summary-box">
                    <h2>Payment Details</h2>
                    <div className="summary-row">
                        <span>Items Total:</span>
                        <span>₹{itemsPrice.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping:</span>
                        <span>{shippingPrice === 0 ? 'Free' : `₹${shippingPrice.toFixed(2)}`}</span>
                    </div>
                    <div className="summary-row total-row">
                        <span>Total Amount:</span>
                        <span className="total-amount">₹{totalPrice.toFixed(2)}</span>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button 
                        className="btn btn-primary place-order-btn"
                        onClick={placeOrderHandler}
                        disabled={loading || cartItems.length === 0}
                    >
                        {loading ? 'Processing...' : 'Proceed to Payment'}
                    </button>
                    <p className="payment-note">You will be redirected to Razorpay for secure payment</p>
                </div>
            </div>
        </>
    );
};

export default PlaceOrderPage;