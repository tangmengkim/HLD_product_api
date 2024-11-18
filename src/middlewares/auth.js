const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access Denied', message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const isTokenExpired = err.name === 'TokenExpiredError';
      return res.status(403).json({
        error: 'Invalid Token',
        message: isTokenExpired ? 'Token has expired' : 'Token verification failed',
      });
    }
    req.user = user;
    next();
  });
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Permission Denied',
        message: `User role '${req.user.role}' does not have access.`,
      });
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRoles };
