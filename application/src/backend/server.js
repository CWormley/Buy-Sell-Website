const express = require('express');
const path = require('path');
const db = require('./db'); // Assuming you have a db.js to handle DB connection
const app = express();
const port = process.env.PORT || 5000;

// Middleware
const cors = require('cors');
app.use(cors()); // Enable CORS for all origins (you can configure it more specifically if needed)
app.use(express.json()); // For parsing JSON request bodies

// Test DB connection
db.query('SELECT 1')
  .then(() => console.log('✅ DB connected!'))
  .catch(err => console.error('❌ DB connection failed:', err));


// API Routes
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');
const searchRoutes = require('./routes/search');
const recentPostsRoutes = require('./routes/recent-posts'); // Import recent-posts routes

// Mounting routes for categories, products, and search
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/recent-posts', recentPostsRoutes); // Adjusted endpoint for recent posts
app.use('/images', express.static('../frontend/public/Images')); // Serve images from public/images directory

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
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running at :${port}`);
});
