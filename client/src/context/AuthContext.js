import React, { createContext, useReducer, useEffect } from 'react';
import api from '../api';

// --- Initial State ---
// Check localStorage to see if a user session already exists.
// This is how we keep the user logged in even after a page refresh.
const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
    userInfo: userInfoFromStorage,
    loading: false,
    error: null,
};

// --- Reducer Function ---
// The reducer handles state changes based on dispatched actions.
// We've combined request, success, and fail actions for both login and register
// to keep the code clean and reduce repetition.
const authReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
        case 'USER_REGISTER_REQUEST':
            return { ...state, loading: true, error: null }; // Start loading and clear any previous errors

        case 'USER_LOGIN_SUCCESS':
        case 'USER_REGISTER_SUCCESS':
            return { ...state, loading: false, userInfo: action.payload, error: null }; // Stop loading, set user info

        case 'USER_LOGIN_FAIL':
        case 'USER_REGISTER_FAIL':
            return { ...state, loading: false, error: action.payload }; // Stop loading, set the error message

        case 'USER_LOGOUT':
            return { ...state, userInfo: null }; // Clear user info from state

        default:
            return state;
    }
};

// --- Create Context ---
// This creates the context object that components will use to get the state.
export const AuthContext = createContext(initialState);

// --- Provider Component ---
// This component will wrap our entire application.
// It contains all the state logic and provides it to all children components.
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // --- Side Effect for localStorage ---
    // This `useEffect` hook runs whenever the `userInfo` state changes.
    // It updates localStorage to keep the user session in sync.
    useEffect(() => {
        if (state.userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        } else {
            localStorage.removeItem('userInfo');
        }
    }, [state.userInfo]);

    // --- ACTIONS ---
    // These are the functions our components will call to interact with the API.

    // Login Action
    const login = async (email, password) => {
        try {
            dispatch({ type: 'USER_LOGIN_REQUEST' });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await api.post('/api/users/login', { email, password }, config);

            dispatch({
                type: 'USER_LOGIN_SUCCESS',
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: 'USER_LOGIN_FAIL',
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

    // Register Action
    const register = async (name, email, password) => {
        try {
            dispatch({ type: 'USER_REGISTER_REQUEST' });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await api.post('/api/users/register', { name, email, password }, config);

            // On successful registration, we immediately log the user in.
            dispatch({
                type: 'USER_REGISTER_SUCCESS',
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: 'USER_REGISTER_FAIL',
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

    // Logout Action
    const logout = () => {
        dispatch({ type: 'USER_LOGOUT' });
    };

    // The value prop is what gets passed down to all consuming components.
    return (
        <AuthContext.Provider
            value={{
                userInfo: state.userInfo,
                loading: state.loading,
                error: state.error,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};