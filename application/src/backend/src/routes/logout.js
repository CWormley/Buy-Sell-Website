/**
 * @file logout.js
 * @description Express router for user logout functionality.
 * Handles session destruction and cookie clearing.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

const express = require('express');

const router = express.Router();

/**
 * POST /api/logout
 * Ends the user session and clears authentication cookies
 * @route POST /
 * @returns {Object} Success message on logout
 * @throws {Error} 500 if session destruction fails
 */
router.post('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Failed to destroy session:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }

    res.clearCookie('connect.sid');
    return res.status(200).json({ message: 'Logout successful' });
  });
});

module.exports = router;
