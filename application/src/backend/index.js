const express = require('express');
const path = require('path');
const cors = require('cors');
const productsRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const recentPostsRoutes = require('./routes/recent-posts');  // Import recent-posts routes


const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (e.g., CSS, images, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Define routes for static HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Static index.html
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html')); // Static about.html
});

// Example API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Register API routes for products, categories, and recent posts
app.use('/api/products', productsRoutes);    // All routes from productsRoutes will be prefixed with '/api/products'
app.use('/api/categories', categoryRoutes);  // All routes from categoryRoutes will be prefixed with '/api/categories'
app.use('/api/recent-posts', recentPostsRoutes);          // Register recent-posts routes under '/api'


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
