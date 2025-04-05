const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to get categories
router.get('/', async (req, res) => {
    console.log('🔥 /api/categories route hit');
    try {
        const [rows] = await db.query('SELECT DISTINCT category FROM Filters');
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No categories found' });
        }

        const categories = rows.map(row => row.category);
        console.log('Categories fetched:', categories);
        res.json(categories); // Send the categories as a JSON response
    } catch (error) {
        console.error('❌ Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to load categories' });
    }
});

module.exports = router;
