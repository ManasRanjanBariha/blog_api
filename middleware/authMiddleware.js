const jwt = require('jsonwebtoken');
const responseFormatter =require('../utils/responseFormatter')


const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';


const authenticateToken = (req, res, next) => {

  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json(responseFormatter(401, false, 'Access denied. No token provided.'));
  }

  
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json(responseFormatter(403, false, 'Invalid or expired token.'));
    }


    req.user = decoded;
    
    next();
  });
};

module.exports = authenticateToken;
