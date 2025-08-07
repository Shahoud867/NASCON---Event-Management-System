const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getDB } = require('../config/database');
const { logger } = require('../utils/logger');

const router = express.Router();

// @desc    Get all events
// @route   GET /api/events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const { page = 1, limit = 10, category, status, search } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT e.EventID, e.Name, e.Date, e.Time, e.Reg_Fee, e.Max_Participants, 
             e.Status, e.CreatedAt, ec.CategoryName, v.Name as VenueName
      FROM Events e
      LEFT JOIN EventCategories ec ON e.CategoryID = ec.CategoryID
      LEFT JOIN Venues v ON e.VenueID = v.VenueID
      WHERE 1=1
    `;
    const queryParams = [];

    if (category) {
      query += ' AND ec.CategoryID = ?';
      queryParams.push(category);
    }

    if (status) {
      query += ' AND e.Status = ?';
      queryParams.push(status);
    }

    if (search) {
      query += ' AND e.Name LIKE ?';
      queryParams.push(`%${search}%`);
    }

    query += ' ORDER BY e.Date ASC, e.Time ASC LIMIT ? OFFSET ?';
    queryParams.push(parseInt(limit), offset);

    const [events] = await db.execute(query, queryParams);

    res.json({
      success: true,
      data: { events }
    });
  } catch (error) {
    logger.error('Get events error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();

    const [events] = await db.execute(
      `SELECT e.*, ec.CategoryName, v.Name as VenueName, v.Address as VenueAddress
       FROM Events e
       LEFT JOIN EventCategories ec ON e.CategoryID = ec.CategoryID
       LEFT JOIN Venues v ON e.VenueID = v.VenueID
       WHERE e.EventID = ?`,
      [id]
    );

    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    res.json({
      success: true,
      data: { event: events[0] }
    });
  } catch (error) {
    logger.error('Get event error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

module.exports = router;
