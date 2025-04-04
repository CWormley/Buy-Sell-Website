const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/categories', async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT DISTINCT name FROM Category`);
        const categories = rows.map(row => row.name);
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to load categories' });
    }
});

module.exports = router;
