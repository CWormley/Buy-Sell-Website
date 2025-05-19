/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: user_messages.js
*
* Description:: 
* 
*
**************************************************************/
const express = require('express');
const router = express.Router();
const db = require('../db');
router.get('/', async (req, res) => {
    const userId = req.session.userId; 
  try {
      const [userMessages] = await db.query(`
          SELECT 
            pr.title,
            m.user_contact,
            m.content,
            m.timestamp,
            u.email AS sender_email,
            pr.images
            FROM Message m
            JOIN Product pr ON m.product_id = pr.product_id
            JOIN User u ON m.user_id = u.user_id
            WHERE pr.user_id = ?
            ORDER BY m.timestamp DESC
      `, [userId]);
      res.json(userMessages);
  } catch (error) {
      console.error('Error fetching user messages:', error);
      res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;
