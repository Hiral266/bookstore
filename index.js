const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const books = require('./books');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_secret_key'; // Replace with env var in production

const users = {}; // In-memory users: { username: password }

app.use(bodyParser.json());
app.use(cors());

// ✅ Task 1: Get all books
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// ✅ Task 2: Get books by ISBN
app.get('/books/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// ✅ Task 3: Get books by author
app.get('/books/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();
  const booksByAuthor = [];

  for (const isbn in books) {
    if (books[isbn].author.toLowerCase() === author) {
      booksByAuthor.push({
        isbn: isbn,
        title: books[isbn].title,
        reviews: books[isbn].reviews
      });
    }
  }

  if (booksByAuthor.length > 0) {
    res.json(booksByAuthor);
  } else {
    res.status(404).json({ message: 'No books found by that author' });
  }
});

// ✅ Task 4: Get books by title
app.get('/books/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  const booksByTitle = [];

  for (const isbn in books) {
    if (books[isbn].title.toLowerCase() === title) {
      booksByTitle.push({
        isbn: isbn,
        author: books[isbn].author,
        reviews: books[isbn].reviews
      });
    }
  }

  if (booksByTitle.length > 0) {
    res.json(booksByTitle);
  } else {
    res.status(404).json({ message: 'No books found with that title' });
  }
});

// ✅ Task 5: Get a book review
app.get('/books/:isbn/review', (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book && book.reviews) {
    res.json(book.reviews);
  } else {
    res.status(404).json({ message: 'No reviews found for this book' });
  }
});

// ✅ Task 6: Register new user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users[username] = password;
  res.status(201).json({ message: 'User registered successfully' });
});

// ✅ Task 7: Login user and return JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!users[username] || users[username] !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful', token });
});

// ✅ Middleware to protect routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token missing' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// ✅ Task 8: Add or Modify a review (Protected)
app.put('/review/:isbn', authenticateToken, (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.user.username;

  const book = books[isbn];
  if (!book) return res.status(404).json({ message: 'Book not found' });

  if (!book.reviews) book.reviews = {};
  book.reviews[username] = review;

  res.status(200).json({ message: 'Review added/updated', reviews: book.reviews });
});

// ✅ Task 9: Delete review (Protected)
app.delete('/review/:isbn', authenticateToken, (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username;

  const book = books[isbn];
  if (!book || !book.reviews || !book.reviews[username]) {
    return res.status(404).json({ message: 'Review not found' });
  }

  delete book.reviews[username];
  res.status(200).json({ message: 'Review deleted', reviews: book.reviews });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
