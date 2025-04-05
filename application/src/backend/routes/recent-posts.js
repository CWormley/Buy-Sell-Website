// products.js
const express = require('express');
const router = express.Router();
const db = require('../db');
router.get('/', async (req, res) => {
  try {
      const [recentPosts] = await db.query(`
          SELECT 
            p.product_id,
            p.title,
            p.description,
            p.price,
            p.category  -- Use the category column directly from the Product table
          FROM Product p
          ORDER BY p.product_id DESC  -- Ordering by product_id (or another column if available)
          LIMIT 4
      `);
      res.json(recentPosts);
  } catch (error) {
      console.error('Error fetching recent posts:', error);
      res.status(500).json({ error: 'Database query failed' });
  }
});
module.exports = router;
