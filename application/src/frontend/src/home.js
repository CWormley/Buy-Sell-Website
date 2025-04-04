import React, { useState, useEffect } from 'react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  // Fetch categories on first render
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data); // Assuming data is an array of strings
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };

    const fetchRecentPosts = async () => {
      try {
        const res = await fetch('/api/recent-posts');
        if (!res.ok) throw new Error('Failed to fetch recent posts');
        const data = await res.json();
        setRecentPosts(data); // Assuming data is an array of the 4 most recent posts
        setEntries(data); // Set the recent posts as the default entries
      } catch (err) {
        console.error('Error loading recent posts:', err);
      }
    };

    fetchCategories();
    fetchRecentPosts();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch('/api/search', {
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
      if (data.length === 0) {
        // If no results are found, show the recent posts
        setEntries(recentPosts);
      } else {
        setEntries(data);
      }
    } catch (err) {
      console.error('Search error:', err);
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
              <option key={idx} value={cat}>{cat}</option>
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

        {/* Display Results */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {entries.map((entry, index) => (
            <div key={index} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: '#f9f9f9'
            }}>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
              <p><strong>Category:</strong> {entry.category}</p>
            </div>
          ))}
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
