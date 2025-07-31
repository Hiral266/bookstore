const axios = require('axios');
const BASE_URL = 'http://localhost:5000';

// Task 10: Get all books (Async/Await)
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    console.log('All Books:', response.data);
  } catch (error) {
    console.error('Error fetching all books:', error.message);
  }
}

// Task 11: Search by ISBN (Promises)
function getBookByISBN(isbn) {
  axios.get(`${BASE_URL}/books/${isbn}`)
    .then(response => {
      console.log(`Book with ISBN ${isbn}:`, response.data);
    })
    .catch(error => {
      console.error(`Error fetching book by ISBN ${isbn}:`, error.message);
    });
}

// Task 12: Search by Author (Async/Await)
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/books/author/${encodeURIComponent(author)}`);
    console.log(`Books by ${author}:`, response.data);
  } catch (error) {
    console.error(`Error fetching books by author ${author}:`, error.message);
  }
}

// Task 13: Search by Title (Async/Await)
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/books/title/${encodeURIComponent(title)}`);
    console.log(`Books with title "${title}":`, response.data);
  } catch (error) {
    console.error(`Error fetching books by title "${title}":`, error.message);
  }
}

// 🚀 Call functions here to test
getAllBooks();                  // Task 10
getBookByISBN('9780143127741'); // Task 11
getBooksByAuthor('Paulo Coelho'); // Task 12
getBooksByTitle('The Alchemist'); // Task 13
