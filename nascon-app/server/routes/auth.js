const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { getDB } = require('../config/database');
const { protect } = require('../middleware/auth');
const { logger } = require('../utils/logger');

const router = express.Router();

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('roleId').isInt({ min: 1 }).withMessage('Please select a valid role')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, password, username, roleId, contact, university, city } = req.body;
    const db = getDB();

    // Check if user already exists
    const [existingUsers] = await db.execute(
      'SELECT UserID FROM Users WHERE Email = ? OR Username = ?',
      [email, username]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'User with this email or username already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const [result] = await db.execute(
      `INSERT INTO Users (Name, Email, Password, Username, RoleID, Contact, University, City, Status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
      [name, email, hashedPassword, username, roleId, contact || null, university || null, city || null]
    );

    // Get the created user
    const [users] = await db.execute(
      'SELECT UserID, Name, Email, Username, RoleID, Status FROM Users WHERE UserID = ?',
      [result.insertId]
    );

    const user = users[0];

    // Get user role
    const [roles] = await db.execute(
      'SELECT RoleName FROM Roles WHERE RoleID = ?',
      [user.RoleID]
    );

    // Create token
    const token = jwt.sign(
      { id: user.UserID },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    logger.info(`New user registered: ${user.Email} with role: ${roles[0]?.RoleName}`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.UserID,
          name: user.Name,
          email: user.Email,
          username: user.Username,
          role: roles[0]?.RoleName,
          status: user.Status
        },
        token
      }
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during registration'
    });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    const db = getDB();

    // Check for user
    const [users] = await db.execute(
      `SELECT u.UserID, u.Name, u.Email, u.Password, u.Username, u.RoleID, u.Status, u.LastLogin, r.RoleName 
       FROM Users u 
       JOIN Roles r ON u.RoleID = r.RoleID 
       WHERE u.Email = ?`,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const user = users[0];

    // Check if user is active
    if (user.Status !== 'active') {
      return res.status(401).json({
        success: false,
        error: 'Account is not active. Please contact administrator.'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Update last login
    await db.execute(
      'UPDATE Users SET LastLogin = CURRENT_TIMESTAMP WHERE UserID = ?',
      [user.UserID]
    );

    // Create token
    const token = jwt.sign(
      { id: user.UserID },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    logger.info(`User logged in: ${user.Email}`);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.UserID,
          name: user.Name,
          email: user.Email,
          username: user.Username,
          role: user.RoleName,
          status: user.Status,
          lastLogin: user.LastLogin
        },
        token
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during login'
    });
  }
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const db = getDB();
    
    const [users] = await db.execute(
      `SELECT u.UserID, u.Name, u.Email, u.Username, u.Contact, u.University, u.City, u.Status, u.LastLogin, r.RoleName 
       FROM Users u 
       JOIN Roles r ON u.RoleID = r.RoleID 
       WHERE u.UserID = ?`,
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: users[0].UserID,
          name: users[0].Name,
          email: users[0].Email,
          username: users[0].Username,
          contact: users[0].Contact,
          university: users[0].University,
          city: users[0].City,
          role: users[0].RoleName,
          status: users[0].Status,
          lastLogin: users[0].LastLogin
        }
      }
    });
  } catch (error) {
    logger.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Get available roles
// @route   GET /api/auth/roles
// @access  Public
router.get('/roles', async (req, res) => {
  try {
    const db = getDB();
    
    const [roles] = await db.execute(
      'SELECT RoleID, RoleName FROM Roles ORDER BY RoleID'
    );

    res.json({
      success: true,
      data: { roles }
    });
  } catch (error) {
    logger.error('Get roles error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

module.exports = router;
