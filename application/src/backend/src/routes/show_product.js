/**
 * @file show_product.js
 * @description Express router for retrieving detailed product information.
 * Serves product details including description, price, and images.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

const express = require('express');
const db = require('../db');

const router = express.Router();

/**
 * GET /api/show_product/:productId
 * Retrieves detailed information for a specific product
 * @route GET /:productId
 * @param {number} req.params.productId - ID of the product to retrieve
 * @returns {Array} Product details
 * @throws {Error} Database query error with 500 status
 */
router.get('/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const [product] = await db.query(
      `SELECT 
         p.product_id,
         p.title,
         p.description,
         c.name AS category,
         p.price,
         p.images, 
         p.class_name
       FROM Product p
       JOIN Category c ON p.category_id = c.category_id
       WHERE p.product_id = ?`,
      [productId]
    );

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;
