/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: user_products.js
*
* Description:: 
* This file contains the server-side code for handling user products in the Gator Market application.
* It defines API routes for fetching user products.
*
**************************************************************/
const express = require('express');
const router = express.Router();
const db = require('../db');
router.get('/', async (req, res) => {
    const userId = req.session.userId; // Assuming you have user ID stored in session
  try {
      const [userPosts] = await db.query(`
          SELECT 
            p.product_id,
            p.title,
            p.price,
            p.created_at,
            p.images,
            p.approved 
          FROM Product p
          WHERE user_id = ?
          ORDER BY p.created_at DESC  
      `
      , [userId]);
      res.json(userPosts);
  } catch (error) {
      console.error('Error fetching user posts:', error);
      res.status(500).json({ error: 'Database query failed' });
  }
});

router.delete('/:productId', async (req, res) => {
    const userId = req.session.userId;
    const { productId } = req.params;
    console.log('DELETE route hit with productId:', productId, 'userId:', userId);

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const [result] = await db.query(`
            DELETE FROM Product
            WHERE product_id = ? AND user_id = ?
        `, [productId, userId]);

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
