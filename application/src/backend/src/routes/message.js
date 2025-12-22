/**
 * @file message.js
 * @description Express router for product inquiry message handling.
 * Allows users to send messages to product sellers.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

const express = require('express');
const db = require('../db');

const router = express.Router();

/**
 * POST /api/message
 * Creates a new inquiry message for a product
 * Stores message in database with user contact info
 * @route POST /
 * @param {number} req.body.productId - ID of the product being inquired about
 * @param {string} req.body.user_contact - Buyer's contact information
 * @param {string} req.body.content - Message content
 * @returns {Object} Success message with message ID
 * @throws {Error} Database insert error with 500 status
 */
router.post('/', async (req, res) => {
  const userId = req.session.userId;
  const { productId, user_contact, content } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO Message (product_id, user_id, user_contact, content) 
       VALUES (?, ?, ?, ?)`,
      [productId, userId, user_contact, content]
    );

    res.json({ success: true, message: 'Message sent successfully', messageId: result.insertId });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;
