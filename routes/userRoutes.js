const express = require('express');
const {authenticateToken, isAdmin, isEngineer} = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const router = express.Router();

// User route
router.get('/profile', authenticateToken, isEngineer, userController.getUserProfile);
router.get('/dashboard', authenticateToken, isAdmin, userController.getUserProfile);

module.exports = router;