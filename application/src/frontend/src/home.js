/**
 * @file home.js
 * @description Home page component displaying recent products and search functionality.
 * Fetches categories and recent posts from backend, handles search/filter via URL params.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Home component - Main landing page of the application
 * @component
 * @returns {React.ReactElement} Home page with product listings
 */
const Home = () => {
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [entries, setEntries] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All Categories');
  const [categories, setCategories] = useState([]);
  const [searchBool, setSearch] = useState(false);

  /**
   * Fetches image URLs for product posts
   * Creates object URLs for blob images from the backend
   * @async
   * @param {Array} posts - Array of post objects
   * @param {Array} objectURLs - Array to track created object URLs
   * @returns {Promise<Array>} Posts with imageURL property added
   */
  const fetchImagesForPosts = async (posts, objectURLs) => {
    return await Promise.all(
      posts.map(async (post) => {
        let imageObjectURL = null;

        if (post.images) {
          try {
            const imageRes = await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/api/protected-image/${post.images}`,
              { credentials: 'include' }
            );

            if (imageRes.ok) {
              const blob = await imageRes.blob();
              imageObjectURL = URL.createObjectURL(blob);
              objectURLs.push(imageObjectURL);
            }
          } catch (error) {
            console.error('Failed to fetch image for post:', post.product_id, error);
          }
        }

        return { ...post, imageURL: imageObjectURL };
      })
    );
  };

  /**
   * Initial data fetch - categories and recent posts
   * Runs once on component mount
   */
  useEffect(() => {
    let isMounted = true;
    const objectURLs = [];

    const fetchInitial = async () => {
      try {
        const [catRes, postRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/categories`),
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/recent-posts`, {
            credentials: 'include'
          })
        ]);

        if (!catRes.ok || !postRes.ok) {
          throw new Error('Failed to load categories or posts');
        }

        const [catData, postData] = await Promise.all([
          catRes.json(),
          postRes.json()
        ]);

        const postsWithImages = await fetchImagesForPosts(postData, objectURLs);

        if (isMounted) {
          setCategories(catData);
          setRecentPosts(postsWithImages);
          setEntries(postsWithImages);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) setError('Failed to load initial data.');
      }
    };

    fetchInitial();

    return () => {
      isMounted = false;
      objectURLs.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  /**
   * Handle search/filter changes from URL parameters
   */
  useEffect(() => {
    if (recentPosts.length === 0) return;

    const params = new URLSearchParams(location.search);
    const querySearch = params.get('search') || '';
    const queryFilter = params.get('filter') || '';
    const isFiltering = !(querySearch.trim() === '' && queryFilter.trim() === '');

    setSearch(isFiltering);
    setSearchTerm(querySearch);
    setFilter(queryFilter);

    const performSearch = async () => {
      if (!isFiltering) {
        setEntries(recentPosts);
        setNoResults(false);
        return;
      }

      setLoading(true);
      setNoResults(false);
      const objectURLs = [];

      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filter: queryFilter, searchText: querySearch })
        });

        if (!res.ok) throw new Error('Search failed');

        const data = await res.json();

        if (data.length === 0) {
          setNoResults(true);
          const fallbackWithImages = await fetchImagesForPosts(recentPosts, objectURLs);
          setEntries(fallbackWithImages);
        } else {
          const postsWithImages = await fetchImagesForPosts(data, objectURLs);
          setEntries(postsWithImages);
          setNoResults(false);
        }

        setError(null);
      } catch (error) {
        console.error(error);
        setError('Search failed');
      } finally {
        setLoading(false);
      }

      return () => {
        objectURLs.forEach(url => URL.revokeObjectURL(url));
      };
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
              {searchBool ? (
                !noResults ? 'Search Results' : 'No Results Found, showing recent items'
              ) : (
                'Recent Posts'
              )}
            </h2>
            <div className="section-underline"></div>
          </div>
        </div>

        {/* Product listing grid */}
        <div className="cards-wrapper" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(30px, 300px))',
          gap: '2rem',
          justifyContent: 'left',
          padding: '0 2rem',
          marginLeft: '2rem'
        }}>
          {(entries.length > 0 ? entries : recentPosts).map((entry) => (
            <a
              href={`/item/${entry.product_id}`}
              target="_blank"
              rel="noopener noreferrer"
              key={entry.product_id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{
                border: '1.2px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: '#f9f9f9',
                width: '300px',
                height: '500px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden'
              }}>
                <h3>{entry.title}</h3>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  height: '200px'
                }}>
                  <img
                    src={entry.imageURL}
                    alt={entry.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      marginBottom: '0.5rem'
                    }}
                  />
                </div>
                <p>{entry.description}</p>
                <p>
                  <strong>Category:</strong> {entry.category?.name || entry.category || 'Uncategorized'}
                </p>
                <button style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '12px',
                  border: '1.5px solid black',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  marginTop: '0.5rem'
                }}>
                  {searchBool ? 'Message' : 'Open Full Listing'}
                </button>
              </div>
            </a>
          ))}
        </div>
      </div>

      <hr />

      <footer>
        <div id="footer">
          <h5>Use cases</h5>
          <h5>Explore</h5>
          <h5>
            Logo credit: <a href="https://www.vecteezy.com/free-png/green">Green PNGs by Vecteezy</a>
          </h5>
        </div>
      </footer>
    </div>
  );
};

export default Home;
