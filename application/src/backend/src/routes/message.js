/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: message.js
*
* Description:: 
* 
**************************************************************/
const express = require('express');
const router = express.Router();
const db = require('../db');
router.post('/', async (req, res) => {
    const user_id = req.session.userId;
    const {productId, user_contact, content} = req.body;
    console.log('Received message:', {productId, user_contact, content});
  try {
      const [message] = await db.query(`
          INSERT INTO Message (product_id, user_id, user_contact, content) 
            VALUES (?, ?, ?, ?)
      `, [productId, user_id, user_contact, content]);

      res.json({success: true, message:'message sent:', message});
      console.log('message sent:', message);
  } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Database query failed' });
    }
});
module.exports = router;
