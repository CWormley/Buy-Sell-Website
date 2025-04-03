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
        c.name AS category,
        u.email AS seller
      FROM Product p
      JOIN Category c ON p.category_id = c.category_id
      JOIN User u ON p.user_id = u.user_id
    `);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Database query failed' });
    }
});

module.exports = router;
