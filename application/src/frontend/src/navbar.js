import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './style.css';

const Navbar = ({ categories }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All Categories');

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (searchTerm.trim()) {
            params.append('search', searchTerm);
        }

        if (filter !== 'All Categories') {
            params.append('filter', filter);
        }

        const query = params.toString();
        navigate(query ? `/?${query}` : '/');
    };

    // Hide search on specific pages if needed
    const shouldHideSearch = location.pathname === '/skfhek';

    return (
        
        <nav className="navbar">
            <header>
                <h1>Gator Market</h1>
                <div className='notice'>SFSU Software Engineering Project CSC 648-848, Spring 2025. For Demonstration
                Only</div>
            </header>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/postitem">Sell an Item</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/map">Map</Link></li>
            </ul>

            {!shouldHideSearch && (
                <div className="search-container">
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="All Categories">All Categories</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat.category}>{cat.category}</option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '400px' }}
                    />

                    <button onClick={handleSearch}>Search</button>
                </div>
            )}

            <div className="auth-buttons">
                <Link to="/signin"><button className="auth-button">Sign In</button></Link>
                <Link to="/register"><button className="auth-button register">Register</button></Link>
            </div>
        </nav>
    );
};

export default Navbar;
