/**
 * @file db.js
 * @description Establishes and exports MySQL database connection pool.
 * Uses environment variables for secure credential management.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Connection pool configuration for MySQL database
 * Provides efficient connection management and reuse
 */
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
