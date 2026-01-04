import React, { useState, useContext } from 'react'; // Import useState
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const { userInfo, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    
    // --- State for the mobile menu ---
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // SVG Icons
    const CartIcon = () => (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m10 0l2-8m0 0h3.6" />
        </svg>
    );

    const UserIcon = () => (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4a4 4 0 100 8 4 4 0 000-8zM4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
    );

    const SearchIcon = () => (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );

    return (
        <header className="header">
            <div className="container navbar-container">
                <nav className="navbar">
                    <Link to="/" className="nav-logo" onClick={closeMenu}>
                        <span>Mata Shree Enterprises</span>
                    </Link>
                    
                    {/* Main Navigation Menu */}
                    <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
                        <li><NavLink to="/" className="nav-link" onClick={closeMenu}>Home</NavLink></li>
                        <li><NavLink to="/products" className="nav-link" onClick={closeMenu}>Products</NavLink></li>
                        <li><NavLink to="/about" className="nav-link" onClick={closeMenu}>About</NavLink></li>
                        <li><NavLink to="/contact" className="nav-link" onClick={closeMenu}>Contact</NavLink></li>
                        
                        {/* Mobile Menu - Cart & User Section */}
                        <div className="mobile-menu-footer">
                            <Link to="/cart" className="mobile-menu-item" onClick={closeMenu}>
                                <CartIcon />
                                <span>Cart</span>
                                {cartItemCount > 0 && <span className="cart-badge-mobile">{cartItemCount}</span>}
                            </Link>

                            {userInfo ? (
                                <div className="mobile-user-section">
                                    <div className="mobile-menu-item">
                                        <UserIcon />
                                        <span>{userInfo.name.split(' ')[0]}</span>
                                    </div>
                                    <button onClick={() => { logout(); closeMenu(); }} className="logout-btn-mobile">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <NavLink to="/login" className="mobile-menu-item signup-link" onClick={closeMenu}>
                                    <UserIcon />
                                    <span>Sign In</span>
                                </NavLink>
                            )}
                        </div>
                    </ul>

                    {/* Desktop Right Section */}
                    <div className="nav-right">
                        <div className="nav-right-desktop">
                            <button className="nav-icon-btn" title="Search">
                                <SearchIcon />
                            </button>

                            <Link to="/cart" className="nav-icon-btn" title="Shopping Cart">
                                <CartIcon />
                                {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
                            </Link>

                            {userInfo ? (
                                <div className="nav-user-info">
                                    <span>{userInfo.name.split(' ')[0]}</span>
                                    <button className="nav-icon-btn" title="User Profile">
                                        <UserIcon />
                                    </button>
                                    <button onClick={logout} className="logout-btn">Logout</button>
                                </div>
                            ) : (
                                <NavLink to="/login" className="nav-icon-btn" title="Sign In">
                                    <UserIcon />
                                </NavLink>
                            )}
                        </div>

                        {/* Hamburger Icon */}
                        <div className={isMenuOpen ? "hamburger active" : "hamburger"} onClick={toggleMenu}>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};


export default Navbar;