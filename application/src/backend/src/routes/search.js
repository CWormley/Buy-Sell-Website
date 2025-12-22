/**
 * @file search.js
 * @description Express router for product search functionality.
 * Handles filtering and searching products by title, description, and category.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

const express = require('express');
const db = require('../db');

const router = express.Router();

/**
 * POST /api/search
 * Searches for products based on search term and category filter
 * @route POST /
 * @param {string} req.body.searchText - Search query string
 * @param {string} req.body.filter - Category filter ('All Categories' for no filter)
 * @returns {Array} Array of matching product objects
 * @throws {Error} Database query error with 500 status
 */
router.post('/', async (req, res) => {
  const { filter, searchText } = req.body;

  let query = `
    SELECT p.product_id, p.title, p.description, c.name AS category, p.price, 
           p.created_at, p.images, p.class_name
    FROM Product p
    LEFT JOIN Category c ON p.category_id = c.category_id
    WHERE p.approved = 1
  `;
  const params = [];

  // Add search term filter
  if (searchText && searchText.trim() !== '') {
    if (filter === 'Class Books') {
      query += ' AND (p.title LIKE ? OR p.description LIKE ? OR p.class_name LIKE ?)';
      params.push(`%${searchText}%`, `%${searchText}%`, `%${searchText}%`);
    } else {
      query += ' AND (p.title LIKE ? OR p.description LIKE ?)';
      params.push(`%${searchText}%`, `%${searchText}%`);
    }
  }

  // Add category filter
  if (filter && filter !== 'All Categories') {
    query += ' AND c.name = ?';
    params.push(filter);
  }

  console.log('🔍 SQL Query:', query);
  console.log('🔍 Parameters:', params);

  try {
    const [results] = await db.query(query, params);
    console.log('📦 Results found:', results.length);
    res.json(results);
  } catch (err) {
    console.error('❌ Search error:', err);
    res.status(500).json({ error: 'Database search failed' });
  }
});

module.exports = router;

