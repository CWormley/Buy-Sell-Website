/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: post.js
*
* Description:: This file contains the route for creating a new post in the Gator Market application.
* It handles the POST request to create a new post, including uploading an image file.
* The image is temporarily stored in a specified directory, and the post details are saved in the database.
* The image file is renamed and moved to a new location, and the relative path is saved in the database.
*
**************************************************************/
const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const tempUploadPath = path.join(__dirname, '..' ,'..', 'uploads');
const upload = multer({ dest: tempUploadPath });


router.post('/', upload.single('image'), async (req, res) => {
    const {title, description, price, category, course} = req.body;
    const imageFile = req.file;
    const user_id = req.session.userId;
    try {
        // Insert the new product into the database
        const [result] = await db.query(
            `INSERT INTO Product (user_id, title, description, category_id, price, images, class_name) 
                VALUES (?, ?, ?, (SELECT category_id FROM Category WHERE name = ? LIMIT 1), ?, ?, ?)`,
            [user_id, title, description, category, price, 'pending', 
                course && course.trim() !== '' ? course : null]
        );
        const productId = result.insertId;
        let finalImagePath = null;
        if (imageFile) {
            const ext = path.extname(imageFile.originalname);
            const newFilename = `${productId}${ext}`;
            const newFilePath = path.join(tempUploadPath, newFilename);

            // Rename and move the file
            fs.renameSync(imageFile.path, newFilePath);

            // Save relative path (for frontend usage)
            finalImagePath = `${newFilename}`;

            // Update product with the image path
            await db.query(
                'UPDATE Product SET images = ? WHERE product_id = ?',
                [finalImagePath, productId]
            );
            res.status(201).json({ message: 'Product created successfully', productId });
        }
    } catch (error) {
        console.error('Error creating procuct:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;
