import React, { useState, useEffect } from 'react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [error, setError] = useState(null);
  const [searchNotice, setSearchNotice] = useState('');


  // Fetch categories and recent posts in parallel
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [catRes, postRes] = await Promise.all([
          fetch('http://44.201.159.31/api/categories'),
          fetch('http://44.201.159.31/api/recent-posts')
        ]);
  
        console.log('Categories response:', catRes);
        console.log('Recent posts response:', postRes);
  
        if (!catRes.ok || !postRes.ok) {
          throw new Error('Failed fetching categories or recent posts');
        }
  
        const [catData, postData] = await Promise.all([
          catRes.json(),
          postRes.json()
        ]);
  
        console.log('Categories data:', catData);
        console.log('Recent posts data:', postData);
  
        setCategories(catData);
        setRecentPosts(postData);
        setEntries(postData);

      } catch (err) {
        setError('Error loading initial data');
        console.error('Initial data load error:', err);
      } finally {
        setLoadingCategories(false);
      }
    };
  
    fetchData();
  }, []);

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://44.201.159.31/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filter,
          searchText: searchTerm
        })
      });

      if (!response.ok) throw new Error('Search failed');
  
      const data = await response.json();
  
      // If no search results are found, fallback to recentPosts

      if (data.length === 0) {
        setEntries(recentPosts.length > 0 ? recentPosts : []);
        setSearchNotice('No matching results from search, showing recent posts');
      } else {
        setEntries(data);
        setSearchNotice('');
      }
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Search error');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
  
      <header>
        <h1>Welcome to Team 2's Web Page!</h1>
      </header>
  
      <div id="mainBody">
        {/* Search Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '0.5rem' }}
          >
            <option value="All">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat.category}>{cat.category}</option>
            ))}
          </select>
  
          <input
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '0.5rem', flex: 1 }}
          />
  
          <button onClick={handleSearch} style={{ padding: '0.5rem 1rem' }}>
            Enter
          </button>
        </div>
  
        {/* Loading and Error Feedback */}
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && entries.length === 0 && !error && !recentPosts.length && <p>No results found.</p>}
        {searchNotice && <p style={{ color: 'gray', fontStyle: 'italic' }}>{searchNotice}</p>}

        {/* Display Results */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {/* Ensure both entries and recentPosts are arrays */}
          {(Array.isArray(entries) ? entries : []).length > 0
            ? (Array.isArray(entries) ? entries : []).map((entry, index) => (
                <div key={index} style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '1rem',
                  backgroundColor: '#f9f9f9'
                }}>
                  <h3>{entry.title}</h3>
                  <p>{entry.description}</p>
                  <p><strong>Category:</strong> {entry.category || 'Uncategorized'}</p>
                </div>
              ))
            : (Array.isArray(recentPosts) ? recentPosts : []).map((entry, index) => (
                <div key={index} style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '1rem',
                  backgroundColor: '#f9f9f9'
                }}>
                  <h3>{entry.title}</h3>
                  <p>{entry.description}</p>
                  <p><strong>Category:</strong> {entry.category || 'Uncategorized'}</p>
                </div>
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
