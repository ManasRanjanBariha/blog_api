const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

module.exports = generateToken;
