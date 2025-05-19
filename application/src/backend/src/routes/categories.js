/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: categories.js
*
* Description:: 
* This file contains the route handler for fetching categories from the database.
* It defines an Express router that handles GET requests to the '/api/categories' endpoint.
* The handler queries the database for all categories and returns them as a JSON response.
* If an error occurs during the database query, it logs the error and returns a 500 status with an error message.
* The router is then exported for use in the main server file.
*
**************************************************************/
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  console.log('Fetching categories...');
  const start = Date.now();

  try {
    const [categories] = await db.query('SELECT * FROM Category');
    console.log('Query executed in', Date.now() - start, 'ms');
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Database error' });
  }
});
module.exports = router;