const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};


// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
  };
  
  // Middleware to check if the user is a Engineer
  const isEngineer = (req, res, next) => {
    if (req.user.role !== 'Engineer') {
      return res.status(403).json({ message: 'Access denied: Engineer only' });
    }
    next();
  };

module.exports = { authenticateToken, isAdmin, isEngineer };

