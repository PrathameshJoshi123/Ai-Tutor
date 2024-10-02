const jwt = require('jsonwebtoken');
const path = require('path')
const dotenv = require('dotenv');

// Set the path to the .env file
const envPath = path.resolve(__dirname, '../.env');

// Load environment variables from .env file
dotenv.config({ path: envPath });

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.student = decoded.studentId;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
