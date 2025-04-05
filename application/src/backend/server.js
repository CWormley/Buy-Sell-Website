console.log('🔥🔥 server.js loaded 🔥🔥');

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const db = require('./db');
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
// Enable CORS
app.use(cors());

// DB Test - Check database connection
db.query('SELECT 1')
    .then(() => console.log('✅ DB connected!'))
    .catch(err => console.error('❌ DB connection failed:', err));


// API Routes (Must come before catch-all route)
const categoriesRoutes = require('./routes/categories');
app.use('/api/categories', categoriesRoutes); // API route for categories

const searchRoutes = require('./routes/search');
app.use('/api/search', searchRoutes);

const recentPostsRoutes = require('./routes/recent-posts');
app.use('/api/recent-posts', recentPostsRoutes);

// Test route to verify routing
app.get('/api/test', (req, res) => {
    res.json({ msg: "Test route works!" });
});

app.post('/api/debug', (req, res) => {
    console.log('🔧 Debug POST hit with:', req.body);
    res.json({ msg: 'Backend is working!' });
});

// Serve the frontend (Catch-all route, should be last)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server running at http://0.0.0.0:${port}`);
});
