const express = require('express');
const path = require('path');
const db = require('./db'); // Assuming you have a db.js to handle DB connection
const app = express();
const port = process.env.PORT || 5000;

// Test DB connection
db.query('SELECT 1')
  .then(() => console.log('✅ DB connected!'))
  .catch(err => console.error('❌ DB connection failed:', err));

// Middleware
app.use(express.json()); // For parsing JSON request bodies
app.use(express.static(path.join(__dirname, '../frontend/build'))); // Serve React build

// API Routes
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');
const searchRoutes = require('./routes/search');
const recentPostsRoutesRoutes = require('./routes/recent-posts'); // Import recent-posts routes

// Mounting routes for categories, products, and search
app.use('/api/categories', categoriesRoutes);  // Adjusted endpoint for categories
app.use('/api/products', productsRoutes);      // Adjusted endpoint for products
app.use('/api/products', productsRoutes);      // Adjusted endpoint for products
app.use('/api/search', searchRoutes);          // Adjusted endpoint for search
app.use('/api/recent-posts', recentPostsRoutesRoutes); // Adjusted endpoint for recent posts

// Catch-all route to serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

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

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
