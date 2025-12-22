/**
 * @file user_log.js
 * @description Express router for user login functionality.
 * Handles user authentication with email and password verification.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

const express = require('express');
const crypto = require('crypto');
const db = require('../db');

const router = express.Router();

/**
 * POST /api/user_log
 * Authenticates a user and establishes a session
 * Verifies email exists and password matches stored hash
 * @route POST /
 * @param {string} req.body.email - User email address
 * @param {string} req.body.password - User password
 * @returns {Object} Success message on successful login
 * @throws {Error} 400 if credentials invalid, 500 for database error
 */
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email exists
    const [users] = await db.query('SELECT * FROM User WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = users[0];

    // Verify password
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    const hashedPassword = passwordHash.substring(0, 8);

    if (hashedPassword !== user.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Establish session
    req.session.userId = user.user_id;
    console.log('Session established for user:', req.session.userId);

    res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;