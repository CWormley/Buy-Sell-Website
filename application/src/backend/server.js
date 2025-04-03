const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to serve static files like CSS, images, JS
app.use(express.static(path.join(__dirname, 'public')));

// Define a dynamic route
app.get('/', (req, res) => {
    // Here, you can render an HTML page dynamically using templates or data
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Static file
});

app.get('/about', (req, res) => {
    // Dynamically serve the about page
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Dynamic route example for API-like functionality
app.get('/api/user', (req, res) => {
    // Example of returning JSON data
    res.json({ name: 'John Doe', age: 30 });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

