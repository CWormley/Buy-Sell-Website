/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: Navbar.js
*
* Description:: 
* This component renders the site-wide navigation bar for Gator Market.
* It includes:
* - Logo, branding header, and site notice
* - Links to core pages (Post Item, Dashboard, About, Map)
* - Category filter and keyword search bar
* - Auth navigation (Sign In / Register)
*
* Props:
* - categories: array of category objects used in the dropdown filter
*
**************************************************************/
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './style.css';
import { useAuth } from './auth_controller';

const Navbar = ({ categories }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All Categories');
    const { isLoggedIn, logout } = useAuth();


    // Sync search term and filter from URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const querySearch = params.get('search') || '';
        const queryFilter = params.get('filter') || 'All Categories';
        setSearchTerm(querySearch);
        setFilter(queryFilter);
    }, [location.search]);

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (searchTerm.trim()) {
            params.append('search', searchTerm);
        }

        params.append('filter', filter);
        
        navigate(`/?${params.toString()}`);
    };

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
