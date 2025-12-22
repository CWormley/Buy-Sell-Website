/**
 * @file user_products.js
 * @description Express router for user product management.
 * Handles retrieving and deleting products owned by the authenticated user.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

const express = require('express');
const db = require('../db');

const router = express.Router();

/**
 * GET /api/user_products
 * Retrieves all products created by the authenticated user
 * @route GET /
 * @returns {Array} User's product listings
 * @throws {Error} Database query error with 500 status
 */
router.get('/', async (req, res) => {
  const userId = req.session.userId;

  try {
    const [userProducts] = await db.query(
      `SELECT 
         p.product_id,
         p.title,
         p.price,
         p.created_at,
         p.images,
         p.approved 
       FROM Product p
       WHERE user_id = ?
       ORDER BY p.created_at DESC`,
      [userId]
    );

    res.json(userProducts);
  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

/**
 * DELETE /api/user_products/:productId
 * Deletes a product owned by the authenticated user
 * @route DELETE /:productId
 * @param {number} req.params.productId - ID of the product to delete
 * @returns {Object} Success message
 * @throws {Error} 401 if unauthorized, 404 if product not found, 500 for database error
 */
router.delete('/:productId', async (req, res) => {
  const userId = req.session.userId;
  const { productId } = req.params;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const [result] = await db.query(
      `DELETE FROM Product
       WHERE product_id = ? AND user_id = ?`,
      [productId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Database delete failed' });
  }
});

module.exports = router;
