/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: dashboard.js
*
* Description:: 
* This component displays a user dashboard with tabs to view messages and listings.
* Users can switch between messages and active listings, post new items, and delete existing listings.
* Includes a confirmation modal for deleting listings.
* 
**************************************************************/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from './deletemodal';
import './style.css';
import { useAuth } from './auth_controller';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const { isLoggedIn } = useAuth();
    const [messages, setMessages] = useState([]);
    const [listings, setListings] = useState([]);
    const [activeTab, setActiveTab] = useState('messages');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listingToDelete, setListingToDelete] = useState(null);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) return;
    
        let isMounted = true;
        const objectURLs = [];
    
        const fetchData = async () => {
            const email = localStorage.getItem('userEmail');
            if (email) {
                const userName = email.split('@')[0];
                setUsername(userName);
            }
    
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user_products`, {
                    credentials: 'include',
                });
                if (!res.ok) throw new Error('Failed to fetch listings');
                const data = await res.json();
    
                const formatted = await Promise.all(data.map(async (product) => {
                    let imageObjectURL = null;
    
                    if (product.images) {
                        try {
                            const imageRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/protected-image/${product.images}`, {
                                credentials: 'include',
                            });
    
                            if (imageRes.ok) {
                                const blob = await imageRes.blob();
                                imageObjectURL = URL.createObjectURL(blob);
                                objectURLs.push(imageObjectURL); // Track it for cleanup
                            }
                        } catch (imgErr) {
                            console.error('Image fetch error:', imgErr);
                        }
                    }
    
                    return {
                        id: product.product_id,
                        title: product.title,
                        price: `$${product.price}`,
                        status: product.approved === 1 ? 'Approved' : 'Pending Approval',
                        date: new Date(product.created_at).toLocaleDateString(),
                        image: imageObjectURL,
                    };
                }));
    
                if (isMounted) setListings(formatted);
    
                // Messages fetch
                const msgRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user_messages`, {
                    credentials: 'include',
                });
    
                if (!msgRes.ok) throw new Error('Failed to fetch messages');
                const msgData = await msgRes.json();
    
                const formattedMessages = await Promise.all(msgData.map(async msg => {
                    let imageObjectURL = null;
                
                    if (msg.images) {
                        try {
                            const imgRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/protected-image/${msg.images}`, {
                                credentials: 'include',
                            });
                
                            if (imgRes.ok) {
                                const blob = await imgRes.blob();
                                imageObjectURL = URL.createObjectURL(blob);
                                objectURLs.push(imageObjectURL); // track for cleanup
                            }
                        } catch (imgErr) {
                            console.error('Message image fetch error:', imgErr);
                        }
                    }
                
                    return {
                        sender: msg.sender_email.split('@')[0],
                        title: msg.title,
                        contact: msg.user_contact,
                        date: new Date(msg.timestamp).toLocaleDateString(),
                        content: msg.content,
                        image: imageObjectURL,
                    };
                }));                
    
                if (isMounted) setMessages(formattedMessages);
    
            } catch (err) {
                console.error('Error loading dashboard:', err);
            }
        };
    
        fetchData();
    
        // Cleanup: revoke object URLs and prevent state updates if unmounted
        return () => {
            isMounted = false;
            objectURLs.forEach(url => URL.revokeObjectURL(url));
        };
    
    }, [isLoggedIn]);    

    const handleDeleteListing = (id) => {
        setIsModalOpen(true); 
        setListingToDelete(id);
    };

    const confirmDelete = async () => {
        try {
        // Make API call to delete the product
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user_products/${listingToDelete}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            // If successful, remove the item from the UI
            setListings(prevListings =>
                prevListings.filter(listing => listing.id !== listingToDelete)
            );
        } else {
            console.error('Failed to delete listing');
            // Optionally, show an error message to the user
        }
    } catch (error) {
        console.error('Error deleting listing:', error);
        // Optionally, show an error message to the user
    }
        setListings(prevListings => prevListings.filter(listing => listing.id !== listingToDelete));
        setIsModalOpen(false);
        setListingToDelete(null);
    };

    const closeModal = () => {
        setIsModalOpen(false); 
        setListingToDelete(null); 
    };

    if (!isLoggedIn) {
        return (
            <div className="welcome-box">
                <h2>Dashboard</h2>
                <p>Please sign in to view your dashboard.</p>
                <button onClick={() => navigate('/signin')}>Go to Sign In</button>
            </div>
        );
    }

    return (
        <div>
           
            <div className="welcome-box">
                <h2>Dashboard</h2>
                <p>Welcome back {username ? username : 'user'}! Here's a summary of your activity..</p>
            </div>

            <div id="mainBody">
                {/* Stats Section */}
                <div className="stats-section">
                    <div className="stats-row">
                        <div className="stats-box">
                            <p><strong>Messages:</strong> {messages.length}</p>
                        </div>
                        <div className="stats-box">
                            <p><strong> Total Listings:</strong> {listings.length}</p>
                        </div>
                        <div className="post-item-btn">
                            <Link to="/postitem">
                                <button>Post an Item</button>
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
                            <div className="message-cards">
                                {messages.length === 0 ? (
                                    <p>No messages yet.</p>
                                ) : (
                                    messages.map(msg => (
                                        <div className="message-card" key={msg.id}>
                                            <div className="message-header">
                                                <span><strong>Item:</strong> {msg.title}</span>
                                                <span id="from"><strong>From:</strong> {msg.sender}</span>
                                                <span><strong>Contact:</strong> {msg.contact}</span>
                                                <span><strong>Date:</strong> {msg.date}</span>
                                            </div>
                                            <div className="message-row">
                                                <img src={msg.image} alt={msg.title} className="message-image" />
                                                <p id="msgtext">{msg.content}</p>
                                                </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'listings' && (
                        <div className="dashboard-section">
                            <h2>Your Listings</h2>
                            <div className="listing-cards">
                                {listings.length === 0 ? (
                                    <p>No listings yet.</p>
                                ) : (
                                    listings.map(listing => (
                                        <div className="listing-card" key={listing.id}>
                                            <div className="listing-header">
                                                <h3><strong>Date:</strong> {listing.date}</h3>
                                                <span>{listing.title}</span>
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
                    <h5>Logo credit: <a href="https://www.vecteezy.com/free-png/green">Green PNGs by Vecteezy</a></h5>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;