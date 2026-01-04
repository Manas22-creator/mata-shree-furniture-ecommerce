import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    /**
     * Handles the click event for the "Add to Cart" button.
     * If a user is logged in, it adds the item (quantity 1) to the cart.
     * If the user is not logged in, it redirects them to the login page.
     */
    const handleAddToCart = () => {
        if (!userInfo) {
            // Redirect to login page if the user is not authenticated
            navigate('/login');
        } else {
            // Add the product to the cart
            addToCart(product._id, 1);
            // Provide feedback to the user
            alert(`"${product.name}" has been added to your cart.`);
        }
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <Link to={`/product/${product._id}`}>
                    <img src={product.image} alt={product.name} />
                </Link>
                <span className="product-tag">{product.category}</span>
            </div>
            <div className="product-card-content">
                <Link to={`/product/${product._id}`}>
                    <h3>{product.name}</h3>
                </Link>
                <p>{product.description}</p>
                <div className="product-card-footer">
                    <span className="product-price">₹{product.price.toFixed(2)}</span>
                    <button onClick={handleAddToCart} className="btn-add-to-cart">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;