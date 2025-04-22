import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
    const location = useLocation();


    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All Categories');
    const [entries, setEntries] = useState([]);
    const [categories, setCategories] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [error, setError] = useState(null);

    // Fetch categories and recent posts once
    useEffect(() => {
        const fetchInitial = async () => {
            try {
                const [catRes, postRes] = await Promise.all([
                    fetch('http://44.201.159.31/api/categories'),
                    fetch('http://44.201.159.31/api/recent-posts'),
                ]);

                if (!catRes.ok || !postRes.ok) throw new Error('Failed to load categories or posts');

                const [catData, postData] = await Promise.all([
                    catRes.json(),
                    postRes.json(),
                ]);


                setCategories(catData);
                setRecentPosts(postData);
                setEntries(postData);
            } catch (err) {
                console.error(err);
                setError('Failed to load initial data.');
            }
        };

        fetchInitial();
    }, []);

    // React to search/filter changes from URL
    useEffect(() => {
        if (recentPosts.length === 0) return; // Wait for recentPosts to be fetched
    
        const params = new URLSearchParams(location.search);
        const querySearch = params.get('search') || '';
        const queryFilter = params.get('filter') || 'All Categories';
    
        setSearchTerm(querySearch);
        setFilter(queryFilter);
    
        const performSearch = async () => {
            if (!querySearch && queryFilter === 'All Categories') {
                setEntries(recentPosts);
                setNoResults(false);
                return;
            }
    
            setLoading(true);
            setNoResults(false);
    
            try {
                const res = await fetch('http://44.201.159.31/api/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        filter: queryFilter,
                        searchText: querySearch,
                    }),
                });
    
                if (!res.ok) throw new Error('Search failed');
                const data = await res.json();
    
                if (data.length === 0) {
                    setNoResults(true);
                    setEntries(recentPosts);
                } else {
                    setNoResults(false);
                    setEntries(data);
                }
    
                setError(null);
            } catch (err) {
                console.error(err);
                setError('Search failed');
            } finally {
                setLoading(false);
            }
        };
    
        performSearch();
    }, [location.search, recentPosts]);
    

    return (
        <div>

            <div className="welcome-box">
                <h2>Welcome to Gator Market!</h2>
                <p>
                    A community marketplace for SFSU students to buy and sell textbooks, supplies, and more.
                    <br /><br />
                    Find what you need or list your items for other students - all in one convenient place.
                </p>
            </div>

            <div id="mainBody">

                <div className="latest-header-wrapper">
                    <div className="section-header">
                    <h2>
                    {(searchTerm || filter !== 'All Categories') ? (
                        (Array.isArray(entries) && entries.length > 0)
                        ? 'Search Results'
                        : 'No Results Found, showing recent items'
                    ) : (
                        'Recent Posts'
                    )}
                    </h2>
                        <div className="section-underline"></div>
                    </div>
                </div>

                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {noResults && !loading && (
                    <p style={{ fontStyle: 'italic' }}>No results found. Showing recent items.</p>
                )}

                {/* Display entries */}

                <div className="cards-wrapper" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem',
                    justifyContent: 'center',
                    padding: '0 2rem'
                }}>
                    {(Array.isArray(entries) ? entries : []).length > 0
                   ? (Array.isArray(entries) ? entries : []).map((entry) => (
                        <Link to={`/item/${entry._id}`} key={entry._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{
                                border: '1.2px solid #ccc',
                                borderRadius: '8px',
                                padding: '1rem',
                                backgroundColor: '#f9f9f9',
                            }}>
                                <h3>{entry.title}</h3>
                                <img
                                    src={`/Images/${entry.images}`}
                                    alt={entry.title}
                                    style={{

                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '8px',
                                        marginBottom: '0.5rem'
                                    }}
                                />
                                <p>{entry.description}</p>
                                <p><strong>Category:</strong> {entry.category || 'Uncategorized'}</p>
                                <button style={{
                                    padding: '0.4rem 1rem',
                                    borderRadius: '12px',
                                    border: '1.5px solid black',
                                    backgroundColor: 'white',
                                    cursor: 'pointer',
                                    marginTop: '0.5rem'
                                }}>
                                    Message
                                </button>
                            </div>
                        </Link>
                    )) 
                    :(Array.isArray(recentPosts) ? recentPosts : []).map((entry) => (
                        <Link to={`/item/${entry._id}`} key={entry._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <div style={{
                            border: '1.2px solid #ccc',
                            borderRadius: '8px',
                            padding: '1rem',
                            backgroundColor: '#f9f9f9',
                          }}>
                            <h3>{entry.title}</h3>
                            <img
                              src={`/Images/${entry.images}`}
                              alt={entry.title}
                              style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                                marginBottom: '0.5rem'
                              }}
                            />
                            <p>{entry.description}</p>
                            <p><strong>Category:</strong> {entry.category || 'Uncategorized'}</p>
                            <button style={{
                              padding: '0.4rem 1rem',
                              borderRadius: '12px',
                              border: '1.5px solid black',
                              backgroundColor: 'white',
                              cursor: 'pointer',
                              marginTop: '0.5rem'
                            }}>
                              Message
                            </button>
                          </div>
                        </Link>
                      ))
                }
                </div>
                    
            </div>

            <hr />


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

export default Home;
