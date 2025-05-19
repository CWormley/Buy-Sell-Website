/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: db.js
*
* Description:: 
* This file establishes a connection to the MySQL database using the mysql2 library.
* It uses environment variables to configure the database connection parameters.
* The connection pool is created with a maximum of 10 connections and is exported for use in other modules.
* The pool allows for efficient management of multiple database connections.
* 
**************************************************************/
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
