/**
 * @file categories.js
 * @description Express router for category-related endpoints.
 * Handles fetching all product categories from the database.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

const express = require('express');
const db = require('../db');

const router = express.Router();

/**
 * GET /api/categories
 * Retrieves all product categories from the database
 * @route GET /
 * @returns {Array} Array of category objects {category_id, name, ...}
 * @throws {Error} Database query error with 500 status
 */
router.get('/', async (req, res) => {
  console.log('Fetching categories...');
  const startTime = Date.now();

  try {
    const [categories] = await db.query('SELECT * FROM Category');
    const queryTime = Date.now() - startTime;
    console.log(`Query executed in ${queryTime}ms`);
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;