import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from './deletemodal';
import './style.css';

const Dashboard = () => {
    const [messages, setMessages] = useState([]);
    const [listings, setListings] = useState([]);
    const [activeTab, setActiveTab] = useState('messages');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listingToDelete, setListingToDelete] = useState(null);

    useEffect(() => {
        setMessages([
            { id: 1, from: 'Alice', text: 'Is your laptop still for sale?', contact: 'alice@example.com', date: '2025-04-15', item: 'MacBook Pro 2021' },
            { id: 2, from: 'John', text: 'Can you do local pickup for the book?', contact: 'john@example.com', date: '2025-04-16', item: 'Textbook for CSC 210' },
        ]);

        setListings([
            { id: 1, title: 'MacBook Pro 2021', price: '$100', status: 'Active', date: '2025-04-10', image: '/Images/home_example.jpg' },
            { id: 2, title: 'Textbook for CSC 210', price: '$30', status: 'Complete', date: '2025-04-12', image: '/Images/book_example.jpg' },
        ]);
    }, []);

    const handleDeleteListing = (id) => {
        setIsModalOpen(true); 
        setListingToDelete(id);
    };

    const confirmDelete = () => {
        setListings(prevListings => prevListings.filter(listing => listing.id !== listingToDelete)); // Delete the listing
        setIsModalOpen(false);
        setListingToDelete(null);
    };

    const closeModal = () => {
        setIsModalOpen(false); 
        setListingToDelete(null); 
    };

    return (
        <div>
           
            <div className="welcome-box">
                <h2>Dashboard</h2>
                <p>Welcome back User! Here's a summary of your activity..</p>
            </div>

            <div id="mainBody">
                {/* Stats Section */}
                <div className="stats-section">
                    <div className="stats-row">
                        <div className="stats-box">
                            <p><strong>Messages:</strong> {messages.length}</p>
                        </div>
                        <div className="stats-box">
                            <p><strong>Active Listings:</strong> {listings.length}</p>
                        </div>
                        <div className="sell-item-btn">
                            <Link to="/postitem">
                                <button>Sell an Item</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="tabs">
                    <button
                        className={activeTab === 'messages' ? 'active-tab' : ''}
                        onClick={() => setActiveTab('messages')}
                    >
                        Messages
                    </button>
                    <button
                        className={activeTab === 'listings' ? 'active-tab' : ''}
                        onClick={() => setActiveTab('listings')}
                    >
                        Listings
                    </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                    {activeTab === 'messages' && (
                        <div className="dashboard-section">
                            <h2>Messages</h2>
                            <div className="cards">
                                {messages.length === 0 ? (
                                    <p>No messages yet.</p>
                                ) : (
                                    messages.map(msg => (
                                        <div className="card" key={msg.id}>
                                            <div className="message-header">
                                                <span id="from"><strong>From:</strong> {msg.from}</span>
                                                <span><strong>Item:</strong> {msg.item}</span>
                                                <span><strong>Contact:</strong> {msg.contact}</span>
                                                <span><strong>Date:</strong> {msg.date}</span>
                                            </div>
                                            <p id="msgtext">{msg.text}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'listings' && (
                        <div className="dashboard-section">
                            <h2>Your Listings</h2>
                            <div className="cards">
                                {listings.length === 0 ? (
                                    <p>No listings yet.</p>
                                ) : (
                                    listings.map(listing => (
                                        <div className="card" key={listing.id}>
                                            <div className="listing-header">
                                                <h3>{listing.title}</h3>
                                                <span><strong>Date:</strong> {listing.date}</span>
                                                <button className="delete-button" onClick={() => handleDeleteListing(listing.id)}>
                                                    Delete
                                                </button>
                                            </div>
                                            <img src={listing.image} alt={listing.title} className="listing-image" />
                                            <p>Price: {listing.price}</p>
                                            <p>Status: {listing.status}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Popup for Delete Confirmation */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete this listing?"
            />

            <footer>
                <div id="footer">
                    <h5>Use cases</h5>
                    <h5>Explore</h5>
                    <h5>Resources</h5>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;