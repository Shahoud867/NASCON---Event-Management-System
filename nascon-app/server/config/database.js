const mysql = require('mysql2/promise');
const { logger } = require('../utils/logger');

let pool;

const connectDB = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'NASCON',
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      acquireTimeout: 60000,
      timeout: 60000,
      reconnect: true
    });

    // Test the connection
    const connection = await pool.getConnection();
    logger.info('✅ Database connection established successfully');
    connection.release();

    return pool;
  } catch (error) {
    logger.error('❌ Database connection failed:', error.message);
    throw error;
  }
};

const getDB = () => {
  if (!pool) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  return pool;
};

const closeDB = async () => {
  if (pool) {
    await pool.end();
    logger.info('Database connection closed');
  }
};

module.exports = {
  connectDB,
  getDB,
  closeDB
};
