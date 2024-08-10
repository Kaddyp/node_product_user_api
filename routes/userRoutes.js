const express = require('express');
const authenticateTokenAndRole = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const router = express.Router();

// User route
router.get('/profile', authenticateTokenAndRole, (req, res) => {
    const { role } = req.user;
  
    if (role === 'Admin') {
      return res.status(200).json({ message: 'Redirecting to Admin Profile', url: '/admin', data: req.user });
    } else if (role === 'Engineer') {
      return res.status(200).json({ message: 'Redirecting to User Profile', url: '/engineer', data: req.user });
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
});
router.get('/profile/admin', authenticateTokenAndRole, userController.getUserProfile);
//router.get('/engineer', authenticateTokenAndRole, userController.getUserProfile);
module.exports = router;