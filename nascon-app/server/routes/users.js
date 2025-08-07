const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getDB } = require('../config/database');
const { logger } = require('../utils/logger');

const router = express.Router();

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get('/', protect, authorize('super_admin', 'admin'), async (req, res) => {
  try {
    const db = getDB();
    const { page = 1, limit = 10, role, status, search } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT u.UserID, u.Name, u.Email, u.Username, u.Contact, u.University, u.City, 
             u.Status, u.LastLogin, u.CreatedAt, r.RoleName
      FROM Users u
      JOIN Roles r ON u.RoleID = r.RoleID
      WHERE 1=1
    `;
    const queryParams = [];

    if (role) {
      query += ' AND r.RoleName = ?';
      queryParams.push(role);
    }

    if (status) {
      query += ' AND u.Status = ?';
      queryParams.push(status);
    }

    if (search) {
      query += ' AND (u.Name LIKE ? OR u.Email LIKE ? OR u.Username LIKE ?)';
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm);
    }

    query += ' ORDER BY u.CreatedAt DESC LIMIT ? OFFSET ?';
    queryParams.push(parseInt(limit), offset);

    const [users] = await db.execute(query, queryParams);

    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total
      FROM Users u
      JOIN Roles r ON u.RoleID = r.RoleID
      WHERE 1=1
    `;
    const countParams = [];

    if (role) {
      countQuery += ' AND r.RoleName = ?';
      countParams.push(role);
    }

    if (status) {
      countQuery += ' AND u.Status = ?';
      countParams.push(status);
    }

    if (search) {
      countQuery += ' AND (u.Name LIKE ? OR u.Email LIKE ? OR u.Username LIKE ?)';
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm, searchTerm);
    }

    const [countResult] = await db.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get users error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
router.get('/:id', protect, authorize('super_admin', 'admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();

    const [users] = await db.execute(
      `SELECT u.UserID, u.Name, u.Email, u.Username, u.Contact, u.University, u.City, 
              u.Status, u.LastLogin, u.CreatedAt, r.RoleName
       FROM Users u
       JOIN Roles r ON u.RoleID = r.RoleID
       WHERE u.UserID = ?`,
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { user: users[0] }
    });
  } catch (error) {
    logger.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Update user status
// @route   PATCH /api/users/:id/status
// @access  Private/Admin
router.patch('/:id/status', protect, authorize('super_admin', 'admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const db = getDB();

    if (!['active', 'inactive', 'suspended'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value'
      });
    }

    const [result] = await db.execute(
      'UPDATE Users SET Status = ? WHERE UserID = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    logger.info(`User ${id} status updated to ${status} by admin ${req.user.id}`);

    res.json({
      success: true,
      message: 'User status updated successfully'
    });
  } catch (error) {
    logger.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

module.exports = router;
