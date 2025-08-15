const express = require('express');
const router = express.Router();
const bookIssuedController = require('../controllers/book-issue-controller');
const authMiddleware = require('../middlewares/auth-middlware');
const librarianMiddleware = require('../middlewares/librarian-middleware');

router.post("/add", authMiddleware, librarianMiddleware, bookIssuedController.addBookIssue);
router.get("/by-student", authMiddleware, bookIssuedController.getBookIssuedByStudent);
router.get("/get-all", authMiddleware, librarianMiddleware, bookIssuedController.geAlltBookIssued);

module.exports = router;