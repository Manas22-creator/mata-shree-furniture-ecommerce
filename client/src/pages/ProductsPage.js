import React, { useState, useEffect } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
    // State for the master list of products from the API
    const [products, setProducts] = useState([]);
    // State for the products that are actually displayed after filtering
    const [filteredProducts, setFilteredProducts] = useState([]);

    // State for the filter controls
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // State for loading and errors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // --- 1. Fetch all products from the API on initial component load ---
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/api/products');
                setProducts(data);
                setFilteredProducts(data); // Initially, show all products
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products. Please try again later.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array means this runs only once

    // --- 2. Apply filters whenever the filters or search term change ---
    useEffect(() => {
        let tempProducts = [...products];

        // Apply category filter
        if (activeFilter !== 'all') {
            tempProducts = tempProducts.filter(product => product.category.toLowerCase() === activeFilter);
        }

        // Apply search term filter
        if (searchTerm) {
            tempProducts = tempProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(tempProducts);
    }, [activeFilter, searchTerm, products]);


    const filterCategories = ['All', 'Beds', 'Sofas', 'Wardrobes', 'Chairs'];

    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1>Our Products</h1>
                    <p>Discover our extensive collection of premium furniture designed to transform your home.</p>
                </div>
            </section>

            <div className="container">
                <section className="products-section">
                    {/* Filter Bar */}
                    <div className="filter-bar">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <img src="/assets/icons/search-icon.svg" alt="Search" />
                        </div>
                        <div className="filter-buttons">
                            {filterCategories.map(category => (
                                <button
                                    key={category}
                                    className={`filter-btn ${activeFilter === category.toLowerCase() ? 'active' : ''}`}
                                    onClick={() => setActiveFilter(category.toLowerCase())}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Grid */}
                    {loading ? (
                        <p>Loading products...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        <div className="product-grid">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            ) : (
                                <p>No products found matching your criteria.</p>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
};

export default ProductsPage;