const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middlware');
const librarianMiddleware = require('../middlewares/librarian-middleware');

router.post('/signup', userController.addNewUser);
router.post('/login', userController.loginUser);
router.get('/logout',authMiddleware, userController.logoutUser);
router.get('/students', authMiddleware, librarianMiddleware, userController.getAllStudents);

module.exports = router;