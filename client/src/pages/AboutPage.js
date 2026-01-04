import React from 'react';

const AboutPage = () => {
    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>About Us</h1>
                    <p>Discover the story behind Mata Shree Furniture and our commitment to excellence.</p>
                </div>
            </section>

            <div className="container">
                {/* Our Story Section */}
                <section className="story-section">
                    <div className="story-content">
                        <div className="story-text">
                            <h2>Our Story</h2>
                            <p>Mata Shree Furniture began as a small family business with a simple dream: to create beautiful, high-quality furniture that brings comfort and joy to every home. Over the last 15 years, we've grown into one of the region's most trusted furniture brands.</p>
                            <p>Our journey has been one of passion and dedication. We blend ideas from across generations, combining time-honored craftsmanship with contemporary design. Today, we're proud to have served over 500 families, helping them create spaces that reflect their personality with our commitment to quality, durability, and timeless design.</p>
                        </div>
                        <div className="story-image">
                            <img src="/assets/images/our-story-image.jpg" alt="Interior of a modern, well-furnished living room" />
                            <div className="story-badge">
                                <span>15+ Years <br /> of Excellence</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Our Values Section */}
            <section className="values-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Values</h2>
                        <p>The principles that guide everything we do.</p>
                    </div>
                    <div className="values-grid">
                        <div className="value-card">
                            <img src="/assets/icons/quality-icon.svg" alt="Quality First" />
                            <h3>Quality First</h3>
                            <p>We never compromise on the quality of our materials or craftsmanship.</p>
                        </div>
                        <div className="value-card">
                            <img src="/assets/icons/customer-icon.svg" alt="Customer Satisfaction" />
                            <h3>Customer Satisfaction</h3>
                            <p>Your happiness is our success. We strive to exceed expectations for every customer.</p>
                        </div>
                        <div className="value-card">
                            <img src="/assets/icons/trust-icon.svg" alt="Trust & Reliability" />
                            <h3>Trust & Reliability</h3>
                            <p>Building lasting relationships through honesty and transparent business practices.</p>
                        </div>
                        <div className="value-card">
                            <img src="/assets/icons/innovation-icon.svg" alt="Innovation" />
                            <h3>Innovation</h3>
                            <p>Constantly evolving our designs to bring you the best in furniture trends.</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container">
                 {/* Our Journey (Timeline) Section */}
                <section className="journey-section">
                    <div className="section-header">
                        <h2>Our Journey</h2>
                        <p>Key milestones in our 15-year journey.</p>
                    </div>
                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-content">
                                <h3>2009 - Company Founded</h3>
                                <p>Started with a vision to create quality furniture.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-content">
                                <h3>2012 - First Showroom</h3>
                                <p>Opened our first retail showroom.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-content">
                                <h3>2016 - 500+ Customers</h3>
                                <p>Reached milestone of 500 satisfied customers.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-content">
                                <h3>2020 - Online Presence</h3>
                                <p>Launched digital platform for wider reach.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-content">
                                <h3>2024 - 15 Years Strong</h3>
                                <p>Celebrating 15 years of excellence.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Meet Our Team Section */}
            <section className="team-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Meet Our Team</h2>
                        <p>The skilled craftsmen and dedicated professionals behind our success.</p>
                    </div>
                    <div className="team-grid">
                        <div className="team-card">
                            <img src="/assets/images/team-rajesh.png" alt="Rajesh Kumar" />
                            <h3>Rajesh Kumar</h3>
                            <p>Founder & Master Craftsman</p>
                        </div>
                        <div className="team-card">
                            <img src="/assets/images/team-priya.png" alt="Priya Sharma" />
                            <h3>Priya Sharma</h3>
                            <p>Design Director</p>
                        </div>
                        <div className="team-card">
                            <img src="/assets/images/team-amit.png" alt="Amit Singh" />
                            <h3>Amit Singh</h3>
                            <p>Production Manager</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutPage;