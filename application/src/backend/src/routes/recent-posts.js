/**
 * @file recent-posts.js
 * @description Express router for retrieving recently created product listings.
 * Returns the most recent approved products ordered by creation date.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

const express = require('express');
const db = require('../db');

const router = express.Router();

/**
 * GET /api/recent-posts
 * Retrieves the 4 most recently created approved products
 * @route GET /
 * @returns {Array} Array of recent product objects
 * @throws {Error} Database query error with 500 status
 */
router.get('/', async (req, res) => {
  try {
    const [recentPosts] = await db.query(`
      SELECT 
        p.product_id,
        p.title,
        p.description,
        c.name AS category,
        p.price,
        p.created_at,
        p.images, 
        p.class_name
      FROM Product p
      JOIN Category c ON p.category_id = c.category_id
      WHERE p.approved = 1
      ORDER BY p.created_at DESC  
      LIMIT 4
    `);

    res.json(recentPosts);
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;
