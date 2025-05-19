/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: logout.js
*
* Description:: This file contains the logout route for the Gator Market application.
* It handles user logout by destroying the session and clearing the session cookie.
*
**************************************************************/
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Failed to destroy session:', err);
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid'); // If using default cookie name
        return res.status(200).json({ message: 'Logout successful' });
    });
});

module.exports = router;
