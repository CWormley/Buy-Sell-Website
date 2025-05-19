/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: server.js
*
* Description:: 
* This file contains the server-side code for the Gator Market application.
* It sets up an Express server, connects to a MySQL database, and defines API routes for categories, products, search, and recent posts.
* The server listens on a specified port and serves static files from the frontend build directory.
* The server also includes middleware for CORS and JSON parsing.
* It has a test route to check the database connection and a catch-all route to serve the React app for any other routes.
*
**************************************************************/
const express = require('express');
const path = require('path');
const db = require('./db'); // Assuming you have a db.js to handle DB connection
const app = express();
const port = process.env.PORT || 5000;
const session = require('express-session');
const cors = require('cors');
app.use(cors({
  origin: `${process.env.FRONTEND_URL}`,
  credentials: true
}));

app.use(express.json()); // JSON body parser

app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000,
    httpOnly: true,
    secure: false,
    sameSite: 'lax'  // use 'lax' for local dev unless HTTPS is used
  }
}));


// Test DB connection
db.query('SELECT 1')
  .then(() => console.log('✅ DB connected!'))
  .catch(err => console.error('❌ DB connection failed:', err));


// API Routes
const categoriesRoutes = require('./routes/categories');
const searchRoutes = require('./routes/search');
const recentPostsRoutes = require('./routes/recent-posts'); // Import recent-posts routes
const userRegRoutes = require('./routes/user_reg'); // Import user registration routes
const userLoginRoutes = require('./routes/user_log'); // Import user login routes
const logoutRoute = require('./routes/logout');
const postRoutes = require('./routes/post'); // Import post routes
const checkSessionRoute = require('./routes/auth_status'); // Import check session route
const uploadsRoutes = require('./routes/uploads'); // Import user login routes
const userProductsRoutes = require('./routes/user_products'); // Import user products routes
const showProduct = require('./routes/show_product'); // Import show product routes
const messageRoute = require('./routes/message'); // Import message routes
const userMessagesRoute = require('./routes/user_messages'); // Import user messages routes

// Mounting routes for categories, products, and search
app.use('/api/categories', categoriesRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/recent-posts', recentPostsRoutes); // Adjusted endpoint for recent posts
app.use('/images', express.static(path.join(__dirname, '..', '..', 'frontend', 'public', 'Images'))); // Serve images from public/images directory
app.use('/api/user_reg', userRegRoutes); // Mount user registration routes
app.use('/api/user_log', userLoginRoutes); // Mount user login routes
app.use('/api/logout', logoutRoute);
app.use('/api/post', postRoutes); // Mount post routes
app.use('/api/check-session', checkSessionRoute); // Mount check session route
app.use('/api/protected-image', uploadsRoutes); // Mount uploads routes

app.use('/api/user_products', userProductsRoutes); // Mount user products routes
app.use('/api/show_product', showProduct); // Mount show product routes
app.use('/api/message', messageRoute); // Mount message routes
app.use('/api/user_messages', userMessagesRoute); // Mount user messages routes

// Test DB query route
app.get('/test-db', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT NOW()'); // Get current timestamp from DB
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('DB query error:', err);
    res.status(500).json({ success: false, message: 'Database query failed' });
  }
});

// Test route
app.get('/test', (req, res) => {
  console.log('Test route hit!');
  res.json({ message: 'Test successful!' });
});

// Catch-all route to serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running at :${port}`);
});
