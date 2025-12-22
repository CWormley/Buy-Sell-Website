/**
 * @file server.js
 * @description Express server for Gator Market application.
 * Sets up middleware, configures routes, and initializes database connection.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 5000;

// ==================== Middleware Configuration ====================

/**
 * Configure CORS to allow requests from frontend with credentials
 */
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

/**
 * Parse incoming JSON request bodies
 */
app.use(express.json());

/**
 * Configure session management
 */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000,      // 1 hour in milliseconds
    httpOnly: true,       // Prevent client-side JS access
    secure: false,        // Set to true for HTTPS in production
    sameSite: 'lax'       // CSRF protection
  }
}));

// ==================== Database Connection ====================

/**
 * Test database connection on server startup
 */
db.query('SELECT 1')
  .then(() => console.log('✅ Database connected'))
  .catch(err => console.error('❌ Database connection failed:', err));

// ==================== Route Imports ====================

const categoriesRoutes = require('./routes/categories');
const searchRoutes = require('./routes/search');
const recentPostsRoutes = require('./routes/recent-posts');
const userRegRoutes = require('./routes/user_reg');
const userLoginRoutes = require('./routes/user_log');
const logoutRoute = require('./routes/logout');
const postRoutes = require('./routes/post');
const checkSessionRoute = require('./routes/auth_status');
const uploadsRoutes = require('./routes/uploads');
const userProductsRoutes = require('./routes/user_products');
const showProduct = require('./routes/show_product');
const messageRoute = require('./routes/message');
const userMessagesRoute = require('./routes/user_messages');

// ==================== Route Configuration ====================

app.use('/api/categories', categoriesRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/recent-posts', recentPostsRoutes);
app.use('/api/user_reg', userRegRoutes);
app.use('/api/user_log', userLoginRoutes);
app.use('/api/logout', logoutRoute);
app.use('/api/post', postRoutes);
app.use('/api/check-session', checkSessionRoute);
app.use('/api/protected-image', uploadsRoutes);
app.use('/api/user_products', userProductsRoutes);
app.use('/api/show_product', showProduct);
app.use('/api/message', messageRoute);
app.use('/api/user_messages', userMessagesRoute);

// Serve static images
app.use('/images', express.static(path.join(__dirname, '..', '..', 'frontend', 'public', 'Images')));

// ==================== Utility Routes ====================

/**
 * Health check endpoint for database connectivity
 * @route GET /test-db
 * @returns {Object} Success status with current database timestamp
 */
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT NOW()');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ success: false, message: 'Database query failed' });
  }
});

/**
 * Server health check endpoint
 * @route GET /test
 * @returns {Object} Simple success message
 */
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

// ==================== Fallback Route ====================

/**
 * Serve React application for all unmatched routes (SPA fallback)
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

// ==================== Server Startup ====================

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
});
