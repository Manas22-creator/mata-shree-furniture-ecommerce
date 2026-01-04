import React, { useContext, useState } from 'react'; // --- FIX IS HERE: Imported useState ---
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
    // You are correctly importing removeFromCart now.
    const { cartItems, loading, error, addToCart, removeFromCart } = useContext(CartContext);
    const [promoCode, setPromoCode] = useState('');

    if (loading && cartItems.length === 0) { // Only show full-page loading on initial load
        return <div className="container"><p>Loading your cart...</p></div>;
    }

    if (error) {
        return <div className="container error-message">{error}</div>;
    }

    // These functions are now correctly defined and will be used, removing the warnings.
    const handleIncreaseQuantity = (productId, currentQuantity) => {
        addToCart(productId, currentQuantity + 1);
    };

    const handleDecreaseQuantity = (productId, currentQuantity) => {
        if (currentQuantity > 1) {
            addToCart(productId, currentQuantity - 1);
        }
    };

    const handleRemoveItem = (productId) => {
        removeFromCart(productId);
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    const shipping = subtotal > 750 ? 0 : 500;
    const total = subtotal + shipping;
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1>Shopping Cart</h1>
                </div>
            </section>

            <section className="cart-page-section">
                <div className="container">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your cart is empty.</p>
                            <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
                        </div>
                    ) : (
                        <div className="cart-wrapper">
                            {/* Products List - Left Side */}
                            <div className="cart-items-container">
                                {cartItems.map((item) => (
                                    <div key={item.product._id} className="cart-item">
                                        <div className="cart-item-image">
                                            <img src={item.product.image} alt={item.product.name} />
                                        </div>
                                        <div className="cart-item-details">
                                            <h3>{item.product.name}</h3>
                                            <p className="item-category">{item.product.category}</p>
                                        </div>
                                        <div className="cart-item-quantity">
                                            <button 
                                                className="qty-btn"
                                                onClick={() => handleDecreaseQuantity(item.product._id, item.quantity)}
                                            >
                                                −
                                            </button>
                                            <input type="number" value={item.quantity} readOnly />
                                            <button 
                                                className="qty-btn"
                                                onClick={() => handleIncreaseQuantity(item.product._id, item.quantity)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="cart-item-price">
                                            <p className="price">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <button 
                                            className="remove-btn"
                                            onClick={() => handleRemoveItem(item.product._id)}
                                            title="Remove item"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary - Right Side */}
                            <div className="order-summary">
                                <h2>Order Summary</h2>
                                
                                <div className="promo-section">
                                    <label>Promo Code</label>
                                    <div className="promo-input-group">
                                        <input 
                                            type="text" 
                                            placeholder="Enter code" 
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                        />
                                        <button className="apply-btn">Apply</button>
                                    </div>
                                </div>

                                <div className="summary-details">
                                    <div className="summary-row">
                                        <span>Subtotal ({itemCount} items)</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                                    </div>
                                    {shipping > 0 && (
                                        <p className="free-shipping-msg">Add items worth ₹{(750 - subtotal).toFixed(2)} more for FREE shipping!</p>
                                    )}
                                </div>

                                <div className="summary-total">
                                    <span>Total</span>
                                    <span className="total-amount">₹{total.toFixed(2)}</span>
                                </div>

                                <Link to="/shipping" className="btn btn-primary checkout-btn">
                                    Proceed to Checkout
                                </Link>

                                <p className="taxes-note">Taxes calculated at checkout</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default CartPage;