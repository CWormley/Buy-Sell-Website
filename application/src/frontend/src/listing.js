import React from 'react';
import { Link } from 'react-router-dom';

const Listing = () => {
    return (
        <div>
            <header>
                <h1>Gator Market</h1>
            </header>

            <div className="listing-detail" style={{ padding: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <Link to="/" style={{
                    display: 'inline-block',
                    margin: '1rem 2rem',
                    fontSize: '1.2rem',
                    color: '#4a3c6a',
                    textDecoration: 'none'
                }}>
                    ← Back to Home
                </Link>

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <img
                        src="/Images/book_example.jpg"
                        alt="CSC 648 Textbook"
                        style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }}
                    />
                </div>

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h2>CSC 648 Textbook</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>$45</p>
                    <p><strong>Category:</strong> Textbooks</p>
                    <p><strong>Course:</strong> CSC 648-848</p>

                    <div style={{ marginTop: '1rem' }}>
                        <p><strong>Description:</strong></p>
                        <textarea
                            readOnly
                            value="Great condition. Gently used. Covers all major course topics."
                            style={{
                                width: '100%',
                                minHeight: '120px',
                                border: '1px solid #aaa',
                                borderRadius: '6px',
                                padding: '0.5rem',
                                resize: 'none'
                            }}
                        />
                    </div>

                    <Link to="/message">
                        <button style={{
                            marginTop: '1.5rem',
                            padding: '0.6rem 1.2rem',
                            backgroundColor: '#4a3c6a',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}>
                            Message Seller
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Listing;
