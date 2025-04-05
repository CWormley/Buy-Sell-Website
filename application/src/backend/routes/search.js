// routes/search.js
const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/search', async (req, res) => {
    const { filter, searchText } = req.body;

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

        if (results.length === 0) {
            res.json({ message: 'No products found matching your search. Showing recent posts.', results: [] });
        } else {
            res.json(results);
        }
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ error: 'Database search failed' });
    }
});

module.exports = router; // ✅ <- This was missing
