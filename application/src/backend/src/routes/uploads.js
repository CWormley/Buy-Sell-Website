const express = require('express');
const router = express.Router();
const db = require('../db');
const path = require('path');
const fs = require('fs');

router.get('/:filename', async (req, res) => {

    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../../uploads/', filename);

    if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ message: 'File not found' });
    }

    res.sendFile(imagePath);
});

module.exports = router;