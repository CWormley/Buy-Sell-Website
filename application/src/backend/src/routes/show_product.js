/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: show_products.js
*
* Description:: This file contains the server-side code for handling product details in the Gator Market application.
* It defines an API route for fetching product details based on the product ID.
* 
**************************************************************/
const express = require('express');
const router = express.Router();
const db = require('../db');
router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    console.log('Product ID:', productId);
  try {
      const [product] = await db.query(`
          SELECT 
            p.product_id,
            p.title,
            p.description,
            c.name AS category,
            p.price,
            p.images, 
            p.class_name
          FROM Product p
          JOIN Category c ON p.category_id = c.category_id
          WHERE p.product_id = ?
          ORDER BY p.created_at DESC  
          LIMIT 4
      `, [productId]);
      res.json(product);
      console.log('Product fetched:', product);
  } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Database query failed' });
  }
});
module.exports = router;
