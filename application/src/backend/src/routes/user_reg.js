
/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: user_reg.js
*
* Description:: This file contains the user registration route for the Gator Market application.
* It handles user registration by checking if the email already exists in the database,
* hashing the password, and inserting the new user into the database.
*
**************************************************************/
const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if email already exists
        const [existingUsers] = await db.query('SELECT * FROM User WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        // Hash password
        const hashedPassword = hash.substring(0, 8);

        // Insert new user into the database
        await db.query('INSERT INTO User (email, password, is_admin) VALUES (?, ?, ?)', [email, hashedPassword, 0]);

        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;

