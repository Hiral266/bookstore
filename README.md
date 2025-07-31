# bookstore
Node.js project involving a bookstore API with user authentication, review management, and various book retrieval methods using both async/await and Promises.

To help you effectively, I can guide you with:

📚 Express server setup with routes for each task

🔐 User registration and login with JWT/token-based auth

🛠 Book review add/edit/delete with user ownership validation

🔁 Axios-based client-side functions using async/await & Promises

💾 Mock data or database (JSON or MongoDB)

📦 Required dependencies: express, axios, jsonwebtoken, body-parser, cors, fs (if using JSON)

#Endpoint
GET /books - Get all books
GET /books/isbn/:isbn - Get book by ISBN
GET /books/author/:author - Get books by author
GET /books/title/:title - Get books by title
GET /books/review/:isbn - Get reviews for a book
POST /register - Register user
POST /login - Login user (returns JWT token)
POST /review/:isbn - Add or modify review (requires token)
DELETE /review/:isbn - Delete your review (requires token)
