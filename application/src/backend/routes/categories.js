// filters.js (or whatever file is appropriate for the filters functionality)
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    console.log('Fetching categories...');
    const start = Date.now();
  
    try {
      const [categories] = await db.query('SELECT * FROM Filters');
      console.log('Query executed in', Date.now() - start, 'ms');
      res.json(categories);
    } catch (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });

module.exports = router;