import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ShippingPage = () => {
    const { shippingAddress, setShippingAddress } = useContext(CartContext);
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');
    const [error, setError] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (!address || !city || !postalCode || !country) {
            setError('All fields are required');
            return;
        }

        setShippingAddress({ address, city, postalCode, country });
        navigate('/placeorder');
    };

    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1>Shipping Address</h1>
                </div>
            </section>

            <section className="shipping-page-section">
                <div className="container">
                    <div className="shipping-form-wrapper">
                        <form onSubmit={submitHandler} className="shipping-form">
                            <h2>Enter Your Shipping Address</h2>
                            
                            {error && <p className="error-message">{error}</p>}

                            <div className="form-group">
                                <label htmlFor="address">Street Address</label>
                                <input 
                                    id="address"
                                    type="text"
                                    value={address} 
                                    onChange={(e) => setAddress(e.target.value)} 
                                    placeholder="Enter your street address" 
                                    required 
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input 
                                        id="city"
                                        type="text"
                                        value={city} 
                                        onChange={(e) => setCity(e.target.value)} 
                                        placeholder="Enter your city" 
                                        required 
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="postalCode">Postal Code</label>
                                    <input 
                                        id="postalCode"
                                        type="text"
                                        value={postalCode} 
                                        onChange={(e) => setPostalCode(e.target.value)} 
                                        placeholder="Enter postal code" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <input 
                                    id="country"
                                    type="text"
                                    value={country} 
                                    onChange={(e) => setCountry(e.target.value)} 
                                    placeholder="Enter your country" 
                                    required 
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Continue to Payment
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShippingPage;