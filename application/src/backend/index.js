const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.static(path.join(__dirname, '../'))); // Path to your static files

app.get('/', (req, res) => {
  res.send('Server is running without a database!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




