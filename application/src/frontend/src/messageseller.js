/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: messageseller.js
*
* Description:: 
* This component displays a messaging form where users can contact
* the seller about a specific item. It shows the item's image, details,
* and provides inputs for contact information and a message.
* 
**************************************************************/
import React,  {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth_controller';

const MessageSeller = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const [product, setProduct] = useState(location.state?.product || null);
    const [userContact, setContactInfo] = useState('');
    const [messageContent, setMessage] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');



    useEffect(() => {
        if (!product) {
            const savedData = sessionStorage.getItem("messageDraft");
            if (savedData) {
                const { userContact,messageContent, product } = JSON.parse(savedData);
                setContactInfo(userContact);
                setMessage(messageContent);
                setProduct(product);
            }
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userContact.trim() || !messageContent.trim()) {
            setError('Please fill out both contact information and your message.');
            return;
        }else {
            setError('');
        }

        try {
           const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/message`, {
                method: 'POST',
                credentials: 'include', // Include credentials for session management
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.id,
                    user_contact: userContact,
                    content: messageContent
                }),
            });
            const result = await response.json();
            setSuccessMessage('Message sent to seller successfully!')
            sessionStorage.removeItem("postDraft");
            setTimeout(() => {
                navigate(`/item/${product.id}`);
            }, 2000);
        } catch (err) {
            console.error('Failed to send message:', err);
            setError('Failed to send message. Please try again later.');
        }
    };

    if (!product) {
        return <div>Loading product data...</div>;
    }
    
    return (
        <div>
            <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px'}}>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: 0 }}>{product.title}</p>
                        <img
                            src={product.image}
                            alt={product.title}
                            style={{
                                width: '100%',
                                maxWidth: '250px',
                                height: 'auto',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                            }}
                        />
                        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${product.price}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                        {product.class_name && (
                            <p><strong>Course:</strong> {product.class_name}</p>
                        )}
                    </div>

                    <div style={{ flex: 2, minWidth: '300px' }}>
                        

                        <label><strong>Enter Contact Info:</strong></label>
                        <input
                            type="text"
                            value={userContact}
                            onChange={(e) => setContactInfo(e.target.value)}
                            placeholder="Enter Phone or email for seller to contact you"
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '0.5rem',
                                margin: '0.5rem 0 1rem 0',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                            }}
                        />

                        <label><strong>Enter Your Message to the Seller:</strong></label>
                    
                        <p style={{ fontSize: '0.95rem', color: '#333', margin: '0.5rem' }}>
                            <strong>Please include an on-campus meeting spot</strong> from our designated 
                            <a href="/map" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.25rem', color: '#4a3c6a', textDecoration: 'underline' }}>
                                Safe Meetup Locations
                            </a>
                        </p>
                        <textarea
                            value={messageContent}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message here"
                            style={{
                                width: '100%',
                                height: '150px',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                resize: 'none',
                                marginBottom: '0.5rem',
                                marginTop: '0.5rem',
                            }}
                        />
                        


                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <a href={`/item/${product.id}`} style={{ textDecoration: 'none' }}>
                            <button style={{
                            padding: '0.6rem 1.2rem',
                            backgroundColor: '#4a3c6a',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            }}>
                            Cancel
                            </button>
                        </a>
                        {isLoggedIn ? (
                        <button 
                        type="submit"
                        onClick={handleSubmit}
                        style={{
                            padding: '0.6rem 1.2rem',
                            backgroundColor: '#4a3c6a',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}>
                            Send Message
                        </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => {
                                    sessionStorage.setItem("messageDraft", JSON.stringify({
                                        userContact,
                                        messageContent,
                                        product
                                    }));
                                    // Redirect to sign in
                                    navigate('/signin?redirect=/message');
                                }}
                            >
                                Sign In to Post
                            </button>
                        )}
                        
                        
                        </div>
                        {error && (
                            <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
                        )}
                        {successMessage && (
                            <div style={{
                                position: 'fixed',
                                top: '1.5rem',
                                right: '1.5rem',
                                backgroundColor: '#d4edda',
                                color: '#155724',
                                padding: '1rem 1.5rem',
                                borderRadius: '8px',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                zIndex: 1000,
                                fontWeight: 'bold',
                            }}>
                                {successMessage}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MessageSeller;
