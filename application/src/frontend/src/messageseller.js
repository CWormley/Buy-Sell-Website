import React from 'react';
import { Link } from 'react-router-dom';

const MessageSeller = () => {
    return (
        <div>
            <header>
                <h1>Gator Market</h1>
            </header>

            <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <img
                            src="/Images/book_example.jpg"
                            alt="Book Cover"
                            style={{
                                width: '100%',
                                maxWidth: '250px',
                                height: 'auto',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                            }}
                        />
                        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>$45</p>
                        <p><strong>Category:</strong> Textbooks</p>
                        <p><strong>Course:</strong> CSC 648-848</p>
                    </div>

                    <div style={{ flex: 2, minWidth: '300px' }}>
                        <h2>CSC 648 Textbook</h2>

                        <label><strong>Contact Info:</strong></label>
                        <input
                            type="text"
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

                        <label><strong>Message:</strong></label>
                        <textarea
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

                        <button
                            style={{
                                padding: '0.6rem 1.2rem',
                                backgroundColor: '#4a3c6a',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                            }}
                        >
                            Send Message
                        </button>
                    </div>
                </div>

                <Link to="/" style={{ display: 'block', marginTop: '2rem', textDecoration: 'underline' }}>
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
};

export default MessageSeller;
