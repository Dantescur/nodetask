// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    try {
      // Verify the token
      const decodedToken = jwt.verify(token, 'your-secret-key');

      // Attach the user object to the request
      req.user = decodedToken;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'Authorization header missing' });
  }
}

module.exports = authMiddleware;
