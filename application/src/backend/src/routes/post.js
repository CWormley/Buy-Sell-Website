/**
 * @file post.js
 * @description Express router for product creation endpoint.
 * Handles file uploads and stores product information in the database.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../db');

const router = express.Router();

const tempUploadPath = path.join(__dirname, '..', '..', 'uploads');
const upload = multer({ dest: tempUploadPath });

/**
 * POST /api/post
 * Creates a new product listing with optional image upload
 * @route POST /
 * @param {string} req.body.title - Product title
 * @param {string} req.body.description - Product description
 * @param {number} req.body.price - Product price
 * @param {string} req.body.category - Product category name
 * @param {string} req.body.course - (Optional) Associated course name
 * @param {File} req.file - (Optional) Product image file
 * @returns {Object} Success message with product ID
 * @throws {Error} Database or file system error with 500 status
 */
router.post('/', upload.single('image'), async (req, res) => {
  const { title, description, price, category, course } = req.body;
  const imageFile = req.file;
  const userId = req.session.userId;

  try {
    // Insert new product into database
    const [result] = await db.query(
      `INSERT INTO Product (user_id, title, description, category_id, price, images, class_name) 
       VALUES (?, ?, ?, (SELECT category_id FROM Category WHERE name = ? LIMIT 1), ?, ?, ?)`,
      [userId, title, description, category, price, 'pending', 
       course && course.trim() !== '' ? course : null]
    );

    const productId = result.insertId;

    // Process uploaded image if provided
    if (imageFile) {
      const fileExtension = path.extname(imageFile.originalname);
      const newFilename = `${productId}${fileExtension}`;
      const newFilePath = path.join(tempUploadPath, newFilename);

      // Rename and move uploaded file
      fs.renameSync(imageFile.path, newFilePath);

      // Update product with image path
      await db.query(
        'UPDATE Product SET images = ? WHERE product_id = ?',
        [newFilename, productId]
      );
    }

    res.status(201).json({ message: 'Product created successfully', productId });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
