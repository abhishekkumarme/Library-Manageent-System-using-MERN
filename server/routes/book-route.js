const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book-controller');
const authMiddleware = require('../middlewares/auth-middlware');
const librarianMiddleware = require('../middlewares/librarian-middleware');

router.post("/add",authMiddleware, librarianMiddleware, bookController.addBook);
router.get("/all",authMiddleware,  bookController.getAllBooks);

module.exports = router;
