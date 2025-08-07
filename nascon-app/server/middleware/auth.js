const jwt = require('jsonwebtoken');
const { getDB } = require('../config/database');
const { logger } = require('../utils/logger');

// Protect routes - require authentication
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database
      const db = getDB();
      const [users] = await db.execute(
        'SELECT UserID, Name, Email, RoleID, Status, LastLogin FROM Users WHERE UserID = ?',
        [decoded.id]
      );

      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          error: 'User not found'
        });
      }

      const user = users[0];

      // Check if user is active
      if (user.Status !== 'active') {
        return res.status(401).json({
          success: false,
          error: 'User account is not active'
        });
      }

      // Get user role
      const [roles] = await db.execute(
        'SELECT RoleName FROM Roles WHERE RoleID = ?',
        [user.RoleID]
      );

      req.user = {
        id: user.UserID,
        name: user.Name,
        email: user.Email,
        role: roles[0]?.RoleName || 'unknown',
        roleId: user.RoleID,
        status: user.Status
      };

      next();
    } catch (error) {
      logger.error('Token verification failed:', error.message);
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role '${req.user.role}' is not authorized to access this route`
      });
    }

    next();
  };
};

// Optional authentication - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const db = getDB();
      const [users] = await db.execute(
        'SELECT UserID, Name, Email, RoleID, Status FROM Users WHERE UserID = ?',
        [decoded.id]
      );

      if (users.length > 0 && users[0].Status === 'active') {
        const user = users[0];
        const [roles] = await db.execute(
          'SELECT RoleName FROM Roles WHERE RoleID = ?',
          [user.RoleID]
        );

        req.user = {
          id: user.UserID,
          name: user.Name,
          email: user.Email,
          role: roles[0]?.RoleName || 'unknown',
          roleId: user.RoleID,
          status: user.Status
        };
      }
    } catch (error) {
      // Token is invalid, but we don't fail the request
      logger.warn('Invalid token in optional auth:', error.message);
    }
  }

  next();
};

module.exports = {
  protect,
  authorize,
  optionalAuth
};
