const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sree@123',
  database: 'book_list_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/books', (req, res) => {
  connection.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).send('Error fetching books');
      return;
    }
    res.json(results);
  });
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  connection.query('INSERT INTO books (title, author) VALUES (?, ?)', [title, author], (err, results) => {
    if (err) {
      console.error('Error adding book:', err);
      res.status(500).send('Error adding book');
      return;
    }
    res.json({ id: results.insertId, title, author });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
