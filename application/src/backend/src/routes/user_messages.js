/**
 * @file user_messages.js
 * @description Express router for retrieving messages received by product sellers.
 * Displays all inquiries and messages about the authenticated user's products.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

const express = require('express');
const db = require('../db');

const router = express.Router();

/**
 * GET /api/user_messages
 * Retrieves all messages received for the authenticated user's products
 * Includes product details and sender information
 * @route GET /
 * @returns {Array} Messages received with product and sender details
 * @throws {Error} Database query error with 500 status
 */
router.get('/', async (req, res) => {
  const userId = req.session.userId;

  try {
    const [userMessages] = await db.query(
      `SELECT 
         pr.title,
         m.user_contact,
         m.content,
         m.timestamp,
         u.email AS sender_email,
         pr.images
       FROM Message m
       JOIN Product pr ON m.product_id = pr.product_id
       JOIN User u ON m.user_id = u.user_id
       WHERE pr.user_id = ?
       ORDER BY m.timestamp DESC`,
      [userId]
    );

    res.json(userMessages);
  } catch (error) {
    console.error('Error fetching user messages:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;
