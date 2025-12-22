/**
 * @file uploads.js
 * @description Express router for serving protected image files.
 * Handles secure delivery of uploaded product images to authenticated users.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('../db');

const router = express.Router();

/**
 * GET /api/protected-image/:filename
 * Serves product image files from the uploads directory
 * Validates file existence before sending
 * @route GET /:filename
 * @param {string} req.params.filename - Name of the image file to serve
 * @returns {File} Image file
 * @throws {Error} 404 if file not found
 */
router.get('/:filename', async (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, '../../uploads/', filename);

  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ message: 'File not found' });
  }

  res.sendFile(imagePath);
});

module.exports = router;