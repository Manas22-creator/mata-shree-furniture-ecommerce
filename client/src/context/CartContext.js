import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

// --- Action Types ---
const CART_REQUEST = 'CART_REQUEST';
const CART_SUCCESS = 'CART_SUCCESS';
const CART_FAIL = 'CART_FAIL';
const CART_CLEAR = 'CART_CLEAR'; // For clearing cart after order
const SET_SHIPPING_ADDRESS = 'SET_SHIPPING_ADDRESS'; // For shipping address

const initialState = {
    cartItems: [],
    loading: false,
    error: null,
    shippingAddress: {
        address: '',
        city: '',
        postalCode: '',
        country: '',
    },
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case CART_REQUEST:
            return { ...state, loading: true };
        case CART_SUCCESS:
            return { ...state, loading: false, cartItems: action.payload, error: null };
        case CART_FAIL:
            return { ...state, loading: false, error: action.payload };
        case CART_CLEAR:
            return { ...state, cartItems: [] };
        case SET_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: action.payload };
        default:
            return state;
    }
};

export const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const { userInfo } = useContext(AuthContext);

    const getConfig = useCallback(() => {
        if (!userInfo || !userInfo.token) {
            return null;
        }
        return {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
    }, [userInfo]);

    const getCart = useCallback(async () => {
        const config = getConfig();
        if (!config) return;

        try {
            dispatch({ type: CART_REQUEST });
            const { data } = await axios.get('/api/cart', config);
            dispatch({ type: CART_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: CART_FAIL, payload: error.response?.data.message || error.message });
        }
    }, [getConfig]);

    // Use this for adding new items or updating quantity
    const addToCart = useCallback(async (productId, quantity) => {
        const config = getConfig();
        if (!config) return;

        try {
            dispatch({ type: CART_REQUEST });
            const { data } = await axios.post('/api/cart', { productId, quantity }, config);
            dispatch({ type: CART_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: CART_FAIL, payload: error.response?.data.message || error.message });
        }
    }, [getConfig]);

    // --- FIX IS HERE ---
    // The `removeFromCart` function in the backend returns the updated cart.
    const removeFromCart = useCallback(async (productId) => {
        const config = getConfig();
        if (!config) return;

        try {
            dispatch({ type: CART_REQUEST });
            // The DELETE request now returns the updated cart array from the server.
            const { data } = await axios.delete(`/api/cart/${productId}`, config);
            // We dispatch this new array to update the state.
            dispatch({ type: CART_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: CART_FAIL, payload: error.response?.data.message || error.message });
        }
    }, [getConfig]);
    
    // Action to clear the cart locally after placing an order
    const clearCart = () => {
        dispatch({ type: CART_CLEAR });
    };

    // Action to set shipping address
    const setShippingAddress = (address) => {
        dispatch({ type: SET_SHIPPING_ADDRESS, payload: address });
    };

    useEffect(() => {
        if (userInfo) {
            getCart();
        } else {
            // If user logs out, clear the cart from the state
            dispatch({ type: CART_CLEAR });
        }
    }, [userInfo, getCart]);

    return (
        <CartContext.Provider value={{
            cartItems: state.cartItems,
            loading: state.loading,
            error: state.error,
            shippingAddress: state.shippingAddress,
            addToCart, // Used for both adding and updating quantity
            removeFromCart,
            clearCart, // We will need this for the PlaceOrderPage
            setShippingAddress, // New function for shipping address
            getCart,
        }}>
            {children}
        </CartContext.Provider>
    );
};