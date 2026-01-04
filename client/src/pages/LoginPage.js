import React, { useState, useContext, useEffect } from 'react';
// Import 'Link' alongside 'useNavigate'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { login, userInfo, loading, error } = useContext(AuthContext);

    // Redirect if already logged in
    useEffect(() => {
        if (userInfo) {
            navigate('/'); // Redirect to homepage
        }
    }, [userInfo, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="form-container">
            <h1>Sign In</h1>
            {error && <p className="error-message">{error}</p>}
            {loading && <p>Loading...</p>}
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading} className="btn-submit">
                    Sign In
                </button>
            </form>
            <div className="form-redirect">
                New Customer? <Link to="/register">Register</Link>
            </div>
        </div>
    );
};

export default LoginPage;