import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <>
            <div className="container">
                {/* --- Hero Section --- */}
                <section className="hero-section">
                    <div className="hero-text">
                        <span className="tagline">Premium Quality</span>
                        <h1>Transform Your Home with Style</h1>
                        <p>Discover our exquisite collection of handcrafted furniture. Design that enhances your living space, quality that lasts generations.</p>
                        <div className="hero-buttons">
                            <Link to="/products" className="btn btn-primary">Explore Collection</Link>
                            <Link to="/contact" className="btn btn-secondary">Get Quote</Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src="/assets/images/hero-image.png" alt="Stylish handcrafted chairs" />
                    </div>
                </section>
            </div>

            {/* --- Stats Section --- */}
            <div className="stats-section">
                <div className="container stats-grid">
                    <div className="stat-item">
                        <h3>500+</h3>
                        <p>Happy Customers</p>
                    </div>
                    <div className="stat-item">
                        <h3>15+</h3>
                        <p>Years Experience</p>
                    </div>
                    <div className="stat-item">
                        <h3>100%</h3>
                        <p>Quality Assured</p>
                    </div>
                    <div className="stat-item">
                        <img src="/assets/icons/delivery-icon.svg" alt="Free Delivery" />
                        <p>Free Delivery & Installation</p>
                    </div>
                </div>
            </div>

            {/* --- Featured Categories Section --- */}
            <section className="categories-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Featured Categories</h2>
                        <p>Explore our carefully curated collection of premium furniture designed to enhance every corner of your home.</p>
                    </div>
                    <div className="category-grid">
                        <Link to="/products" className="category-card">
                            <img src="/assets/products/category-beds.jpg" alt="Stylish beds" />
                            <div className="card-content">
                                <div>
                                    <h3>Beds</h3>
                                    <p>Comfortable and stylish beds</p>
                                </div>
                                <span>View Collection &rarr;</span>
                            </div>
                        </Link>
                        <Link to="/products" className="category-card">
                            <img src="/assets/products/category-sofas.jpg" alt="Luxurious sofas" />
                            <div className="card-content">
                                <div>
                                    <h3>Sofas</h3>
                                    <p>Elegant sofas for your living room</p>
                                </div>
                                <span>View Collection &rarr;</span>
                            </div>
                        </Link>
                        <Link to="/products" className="category-card">
                            <img src="/assets/products/category-wardrobes.jpg" alt="Modern wardrobes" />
                            <div className="card-content">
                                <div>
                                    <h3>Wardrobes</h3>
                                    <p>Spacious wardrobes with modern designs</p>
                                </div>
                                <span>View Collection &rarr;</span>
                            </div>
                        </Link>
                        <Link to="/products" className="category-card">
                            <img src="/assets/products/category-chairs.jpg" alt="Ergonomic chairs" />
                            <div className="card-content">
                                <div>
                                    <h3>Chairs</h3>
                                    <p>Ergonomic chairs for comfort</p>
                                </div>
                                <span>View Collection &rarr;</span>
                            </div>
                        </Link>
                    </div>
                    <div className="section-footer">
                        <Link to="/products" className="btn btn-primary">View All Products</Link>
                    </div>
                </div>
            </section>

            {/* --- Crafting Dreams Section --- */}
            <section className="crafting-section">
                <div className="container crafting-content">
                    <div className="crafting-text">
                        <h2>Crafting Dreams Into Reality</h2>
                        <p>For over 15 years, Mata Shree Furniture has been synonymous with quality, craftsmanship, and trust. Our journey began with a simple vision: to provide families with furniture that is not just about functionality—it's about creating spaces that reflect your personality.</p>
                        <ul className="features-list">
                            <li><img src="/assets/icons/craft-icon.svg" alt="Handcrafted" /> Handcrafted using finest materials by skilled artisans.</li>
                            <li><img src="/assets/icons/delivery-icon-alt.svg" alt="Timely Delivery" /> Timely delivery with professional and careful handling.</li>
                            <li><img src="/assets/icons/warranty-icon.svg" alt="Warranty" /> Assured warranty coverage for peace of mind.</li>
                        </ul>
                    </div>
                    <div className="crafting-gallery">
                        {/* --- FIX IS HERE: More descriptive alt text --- */}
                        <img src="/assets/images/crafting-1.jpg" alt="A craftsman carefully sanding a wooden chair" />
                        <img src="/assets/images/crafting-2.jpg" alt="A modern living room with a comfortable sofa" />
                        <img src="/assets/images/crafting-3.jpg" alt="Close-up of a finished wood grain texture" />
                        <div className="experience-badge">
                            <strong>15+</strong>
                            <span>Years of<br />Excellence</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Get In Touch Section (Corrected to match Figma) --- */}
            <section className="home-contact-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Get In Touch</h2>
                        <p>Ready to transform your space? Contact us for a free consultation and personalized furniture solutions.</p>
                    </div>
                    <div className="home-contact-wrapper">
                        <div className="home-contact-details">
                            <h3>Let's Start a Conversation</h3>
                            <ul className="contact-info-list">
                                <li className="contact-info-item">
                                    <img src="/assets/icons/phone-icon-color.svg" alt="Phone" />
                                    <div>
                                        <h4>Phone</h4>
                                        <p>+91 98765 43210</p>
                                    </div>
                                </li>
                                <li className="contact-info-item">
                                    <img src="/assets/icons/email-icon-color.svg" alt="Email" />
                                    <div>
                                        <h4>Email</h4>
                                        <p>info@matashreefurniture.com</p>
                                    </div>
                                </li>
                                <li className="contact-info-item">
                                    <img src="/assets/icons/location-icon-color.svg" alt="Address" />
                                    <div>
                                        <h4>Address</h4>
                                        <p>123 Furniture Street, Design District</p>
                                    </div>
                                </li>
                                <li className="contact-info-item">
                                    <img src="/assets/icons/clock-icon-color.svg" alt="Business Hours" />
                                    <div>
                                        <h4>Business Hours</h4>
                                        <p>Mon - Sat: 10:00 AM - 8:00 PM</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="home-contact-form">
                            <h3>Send us a message</h3>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="home-name">Full Name *</label>
                                    <input type="text" id="home-name" placeholder="Enter your full name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="home-email">Email Address *</label>
                                    <input type="email" id="home-email" placeholder="Enter your email address" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="home-phone">Mobile Number *</label>
                                    <input type="tel" id="home-phone" placeholder="Enter your mobile number" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="home-message">Message *</label>
                                    <textarea id="home-message" rows="4" placeholder="Tell us about your furniture requirements..."></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary full-width">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;