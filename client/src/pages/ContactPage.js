import React, { useState } from 'react';

const ContactPage = () => {
    // State to manage form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the form submission,
        // e.g., send the data to a backend endpoint or an email service.
        console.log({ name, email, phone, subject, message });
        alert('Thank you for your message! We will get back to you shortly.');
        // Clear form after submission
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
    };

    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>Get in touch with us for personalized furniture solutions and expert consultation.</p>
                </div>
            </section>

            <div className="container">
                {/* Main Contact Section */}
                <section className="contact-page-section">
                    <div className="contact-page-wrapper">
                        {/* Left Column: Get In Touch */}
                        <div className="get-in-touch">
                            <h2>Get In Touch</h2>
                            <p>We're here to help you create the perfect space. Whether you have questions, need design advice, or want to discuss a custom project, our team is ready to assist you.</p>
                            <ul className="contact-info-list">
                                <li className="contact-info-item">
                                    <img src="/assets/icons/phone-icon-color.svg" alt="Phone" />
                                    <div>
                                        <h4>Phone Numbers</h4>
                                        <p>+91 98765 43210</p>
                                        <span>Call us for immediate assistance</span>
                                    </div>
                                </li>
                                <li className="contact-info-item">
                                    <img src="/assets/icons/email-icon-color.svg" alt="Email" />
                                    <div>
                                        <h4>Email Addresses</h4>
                                        <p>info@matashreefurniture.com</p>
                                        <span>We'll respond within 24 hours</span>
                                    </div>
                                </li>
                                <li className="contact-info-item">
                                    <img src="/assets/icons/location-icon-color.svg" alt="Address" />
                                    <div>
                                        <h4>Visit Our Showroom</h4>
                                        <p>123 Furniture Street, Design District</p>
                                        <span>See our collection in person</span>
                                    </div>
                                </li>
                                <li className="contact-info-item">
                                    <img src="/assets/icons/clock-icon-color.svg" alt="Clock" />
                                    <div>
                                        <h4>Business Hours</h4>
                                        <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                                        <p>Sunday: 10:00 AM - 6:00 PM</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="contact-buttons">
                                <a href="https://wa.me/917304549106" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">WhatsApp Chat</a>
                                <a href="tel:+917304549106" className="btn btn-call">Call Now</a>
                            </div>
                        </div>

                        {/* Right Column: Send us a Message */}
                        <div className="contact-form-container">
                            <h2>Send us a Message</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="contact-name">Full Name *</label>
                                        <input type="text" id="contact-name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contact-email">Email Address *</label>
                                        <input type="email" id="contact-email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="contact-phone">Mobile Number *</label>
                                        <input type="tel" id="contact-phone" placeholder="Enter your mobile number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contact-subject">Subject</label>
                                        <select id="contact-subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
                                            <option value="">Select a subject</option>
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Product Question">Product Question</option>
                                            <option value="Custom Order">Custom Order</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-message">Message *</label>
                                    <textarea id="contact-message" rows="5" placeholder="Tell us about your requirements..." value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary full-width">Send Message</button>
                            </form>
                            <div className="response-guarantee">
                                <img src="/assets/icons/guarantee-icon.svg" alt="Quick Response" />
                                <p><strong>Quick Response Guarantee:</strong> We respond to all inquiries within 2 hours during business hours.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Showroom Map Section */}
            <section className="showroom-map-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Find Our Showroom</h2>
                        <p>Visit us to experience our collection firsthand.</p>
                    </div>
                    {/* For a real project, you would embed a Google Map here. This is a styled placeholder. */}
                    <div className="map-placeholder">
                         <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.250498696841!2d-122.4211153846812!3d37.78310897975815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4d3d%3A0x4a501367f076adff!2sSan%20Francisco%20City%20Hall!5e0!3m2!1sen!2sus!4v1616000000000!5m2!1sen!2sus" 
                            width="100%" 
                            height="450" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy"
                            title="Google Maps Showroom Location"
                        ></iframe>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactPage;
