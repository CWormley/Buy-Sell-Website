/**
 * @file user_reg.js
 * @description Express router for user registration functionality.
 * Handles user registration with email validation and password hashing.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

const express = require('express');
const crypto = require('crypto');
const db = require('../db');

const router = express.Router();

/**
 * POST /api/user_reg
 * Registers a new user account
 * Validates email uniqueness and hashes password before storing
 * @route POST /
 * @param {string} req.body.email - User email address
 * @param {string} req.body.password - User password (will be hashed)
 * @returns {Object} Success message on successful registration
 * @throws {Error} 400 if email already exists, 500 for database error
 */
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email already exists
    const [existingUsers] = await db.query('SELECT * FROM User WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    const hashedPassword = passwordHash.substring(0, 8);

    // Insert new user into database
    await db.query(
      'INSERT INTO User (email, password, is_admin) VALUES (?, ?, ?)',
      [email, hashedPassword, 0]
    );

    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

