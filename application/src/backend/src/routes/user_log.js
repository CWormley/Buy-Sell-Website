/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: user_log.js
*
* Description:: This file contains the user login route for the Gator Market application.
* It handles user login by checking if the email exists in the database,
* verifying the password, and returning a success message if the login is successful.
*
**************************************************************/
const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if email exists
        const [users] = await db.query('SELECT * FROM User WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const user = users[0];
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        // Verify password
        const hashedPassword = hash.substring(0, 8);
        //print email and password
        if (hashedPassword !== user.password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        req.session.userId = user.user_id;
        console.log('Session set userId:', req.session.userId);
        res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;