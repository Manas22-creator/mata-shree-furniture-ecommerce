// client/src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-about">
                        <Link to="/" className="footer-logo-link">
                            <img src="/assets/images/logo-white.png" alt="Mata Shree Furniture Logo" className="footer-logo-img" />
                        </Link>
                        <p>Crafting beautiful furniture for over 15 years. We believe in quality, craftsmanship, and creating spaces that reflect your personality.</p>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <img src="/assets/icons/facebook.svg" alt="Facebook" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <img src="/assets/icons/instagram.svg" alt="Instagram" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <img src="/assets/icons/twitter.svg" alt="Twitter" />
                            </a>
                        </div>
                    </div>
                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h4>Categories</h4>
                        <ul>
                            <li><Link to="/products">Beds</Link></li>
                            <li><Link to="/products">Sofas</Link></li>
                            <li><Link to="/products">Wardrobes</Link></li>
                            <li><Link to="/products">Chairs</Link></li>
                        </ul>
                    </div>
                    <div className="footer-contact">
                        <h4>Contact Info</h4>
                        <ul>
                            <li>
                                <img src="/assets/icons/phone-white.svg" alt="Phone" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li>
                                <img src="/assets/icons/email-white.svg" alt="Email" />
                                <span>info@matashreefurniture.com</span>
                            </li>
                            <li>
                                <img src="/assets/icons/location-white.svg" alt="Address" />
                                <span>123 Furniture Street, Design District</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Mata Shree Furniture. All rights reserved.</p>
                    <div>
                        <Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;