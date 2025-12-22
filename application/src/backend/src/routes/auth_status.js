/**
 * @file auth_status.js
 * @description Express router for checking user authentication status.
 * Returns current session information and user identification.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

const express = require('express');

const router = express.Router();

/**
 * GET /api/check-session
 * Checks if user is currently authenticated
 * @route GET /
 * @returns {Object} Authentication status and user ID if logged in
 */
router.get('/', (req, res) => {
  if (req.session.userId) {
    res.json({ loggedIn: true, userId: req.session.userId });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;