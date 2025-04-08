// routes/search.js (or add to your existing file)
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    const { filter, searchText } = req.body;

    let query = `
        SELECT product_id, title, description, price, category, images
        FROM Product

        WHERE (title LIKE ? OR description LIKE ?)
    `;
    let recentCategoryProductsQuery = `
        SELECT product_id, title, description, price, category, images
        FROM Product
        ORDER BY p.created_at DESC
        LIMIT 4
    `;
    const params = [`%${searchText}%`, `%${searchText}%`];

    if (filter && filter !== 'All') {
        query += ' AND category = ?';
        recentCategoryProductsQuery += ' AND category = ?';
        params.push(filter);
    }

    console.log("🔍 SQL Query:", query);
    console.log("🔍 Params:", params);

    try {
        const [results] = await db.query(query, params);
        console.log("📦 Results:", results);

        if (results.length === 0) {
            const [recentResults] = await db.query(recentCategoryProductsQuery);
            res.json(recentResults);
        } else {
            res.json(results);
        }
    } catch (err) {
        console.error('❌ Search error:', err);
        res.status(500).json({ error: 'Database search failed' });
    }
  });
  module.exports = router;

