const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const port = process.env.PORT || 5000;

// ✅ Middleware BEFORE routes
app.use(express.json());
app.use(cors());

// ✅ Register routes AFTER express.json
const categoriesRoutes = require('./routes/categories');
app.use('/api/categories', categoriesRoutes);

const searchRoutes = require('./routes/search');
app.use('/api/search', searchRoutes);

const recentPostsRoutes = require('./routes/recent-posts');
app.use('/api/recent-posts', recentPostsRoutes);

// ✅ Add test route here if needed
app.get('/api/test', (req, res) => {
    res.json({ msg: "Test works" });
});

// ✅ Catch-all to serve frontend last
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server running at :${port}`);
});
