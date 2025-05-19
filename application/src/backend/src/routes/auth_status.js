/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: auth_status.js
*
* Description:: This file contains the route for checking the authentication status of a user.
* It handles the GET request to check if a user is logged in and returns the user's information if they are.
*
**************************************************************/
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.userId) {
        res.json({ loggedIn: true, user: req.session.userId });
    } else {
        res.json({ loggedIn: false });
    }
});
module.exports = router;