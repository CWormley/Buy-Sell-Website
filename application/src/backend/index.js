const express = require('express');
const path = require('path');
const mysql = require('mysql2');


const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Spring25team2',
  database: 'Team02CSC648'
});

//connect to the DB
db.connect((err) => {
  if (err){
    console.error('MySQL connection failed', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware to parse JSON
app.use(express.static(path.join(__dirname, '../'))); // Path to your static files

app.get('/', (req, res) => {
  res.send('Server is running without a database!');
});

//route to fetch users from DB
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err){
      console.error('Querry error:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




