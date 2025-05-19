/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: search.js
*
* Description:: 
* This file contains the route handler for searching products in the database.
* It defines an Express router that handles POST requests to the '/api/search' endpoint.
* The handler receives a search term and an optional filter from the request body.
* It queries the database for products that match the search term in either the title or description.
* 
**************************************************************/
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    const { filter, searchText } = req.body;

    let query = `
        SELECT p.product_id, p.title, p.description, c.name AS category, p.price, p.created_at, p.images, p.class_name
        FROM Product p
        LEFT JOIN Category c ON p.category_id = c.category_id
        WHERE p.approved = 1
    `;
    const params = [];

    if (searchText && searchText.trim() !== '') {
    if (filter === 'Class Books') {
        query += ` AND (p.title LIKE ? OR p.description LIKE ? OR p.class_name LIKE ?)`;
        params.push(`%${searchText}%`, `%${searchText}%`, `%${searchText}%`);
    } else {
        query += ` AND (p.title LIKE ? OR p.description LIKE ?)`;
        params.push(`%${searchText}%`, `%${searchText}%`);
    }
}
    
    if (filter && filter !== 'All Categories') {
        query += ' AND c.name = ?';
        params.push(filter);
    }

    console.log("🔍 SQL Query:", query);
    console.log("🔍 Params:", params);

    try {
        const [results] = await db.query(query, params);
        console.log("📦 Results:", results);
        res.json(results);
    } catch (err) {
        console.error('❌ Search error:', err);
        res.status(500).json({ error: 'Database search failed' });
    }
  });
  module.exports = router;

