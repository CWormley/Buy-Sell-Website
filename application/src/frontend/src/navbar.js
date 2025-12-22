/**
 * @file navbar.js
 * @description Site-wide navigation bar component with search and category filtering.
 * Provides navigation links, search functionality, and user authentication controls.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.css';
import { useAuth } from './auth_controller';

/**
 * Navbar component - Main navigation bar
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.categories - Array of category objects for filtering
 * @returns {React.ReactElement} Navigation bar with search and links
 */
const Navbar = ({ categories }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All Categories');
  const { isLoggedIn, logout } = useAuth();

  /**
   * Sync search term and filter from URL parameters
   */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const querySearch = params.get('search') || '';
    const queryFilter = params.get('filter') || 'All Categories';
    setSearchTerm(querySearch);
    setFilter(queryFilter);
  }, [location.search]);

  /**
   * Handle search submission
   */
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.append('search', searchTerm);
    }

    params.append('filter', filter);
    navigate(`/?${params.toString()}`);
  };

  /**
   * Handle user logout
   */
  const handleLogout = async () => {
    await logout();
    navigate('/');
    };

    // Hide search on specific pages if needed
    const shouldHideSearch = location.pathname === '/skfhek';

    return (

        <nav className="navbar">
            <header>
                <div className='notice'>SFSU Software Engineering Project CSC 648-848, Spring 2025. For Demonstration
                Only</div>
            </header>

            <Link to="/" id="logo">
                <img src="/Images/gator.png" alt="Gator Logo" className="gator-logo" />
            </Link>
            <div className="left-links">
                <ul>
                    <li><button onClick={() => navigate("/postitem")}>Post Item</button></li>
                    <li><button onClick={() => navigate("/dashboard")}>Dashboard</button></li>
                </ul>
            </div>
            {!shouldHideSearch && (
                <div className="search-container">
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="All Categories">All Categories</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder={
                            filter === 'Class Books'
                                ? 'Search for book or class...'
                                : 'Search...'
                        }
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <button onClick={handleSearch}>Search</button>
                </div>
            )}
            <div className="right-links">
                <ul><li><button onClick={() => navigate("/about")}>About</button></li>
                    <li><button onClick={() => navigate("/map")}>Map</button></li>
                </ul>
            </div>
            <div className="auth-buttons">
                {isLoggedIn ? (
                    <button className="auth-button logout" onClick={handleLogout}>
                        Log Out
                    </button>
                ) : (
                    <>
                <Link to="/signin"><button className="auth-button">Sign In</button></Link>
                <Link to="/register"><button className="auth-button register">Register</button></Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
