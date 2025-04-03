const express = require('express');
const cors = require('cors');
const productsRoutes = require('./routes/products');

const app = express();
const port = 3000;



// Middleware
app.use(cors());
app.use(express.json());

// Example API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

//product route
app.use('/api/products', productsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


