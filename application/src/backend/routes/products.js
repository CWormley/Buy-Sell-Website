// products.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
        const [products] = await db.query(`
      SELECT 
        p.product_id,
        p.title,
        p.description,
        p.price,
        p.category AS category,  -- Directly fetching category from Product table
        p.images                -- Images (file paths)
      FROM Product p
    `);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Database query failed' });
    }
});

module.exports = router;
