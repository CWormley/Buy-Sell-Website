// routes/search.js (or add to your existing file)
const express = require('express');
const router = express.Router();
const db = require('../db');
router.post('/search', async (req, res) => {
    const { filter, searchText } = req.body;
  
    // Sanitize or process searchText if necessary
  
    let query = `
      SELECT product_id, title, description, price, category, images
      FROM Product
      WHERE title LIKE ? OR description LIKE ?
    `;
    const params = [`%${searchText}%`, `%${searchText}%`];
  
    if (filter && filter !== 'All') {
      query += ' AND category = ?';
      params.push(filter);
    }
  
    try {
      const [results] = await db.query(query, params);
  
      // Check if there are results or if we should return a "no matches" message
      if (results.length === 0) {
        // If no results found, return a clear response indicating it
        res.json({ message: 'No products found matching your search. Showing recent posts.', results: [] });
      } else {
        // Return the search results
        res.json(results);
      }
    } catch (err) {
      console.error('Search error:', err);
      res.status(500).json({ error: 'Database search failed' });
    }
  });
  module.exports = router;
