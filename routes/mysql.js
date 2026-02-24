const express = require('express');
const router = express.Router();
const { mysqlPool } = require('../config/database');

// Test MySQL connection
router.get('/test', async (req, res) => {
  try {
    const connection = await mysqlPool.getConnection();
    const [rows] = await connection.query('SELECT 1 + 1 AS result');
    connection.release();
    
    res.json({
      success: true,
      message: 'MySQL connection successful',
      result: rows[0],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'MySQL connection failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get list of tables
router.get('/tables', async (req, res) => {
  try {
    const connection = await mysqlPool.getConnection();
    const [tables] = await connection.query('SHOW TABLES');
    connection.release();
    
    res.json({
      success: true,
      database: process.env.MYSQL_DATABASE,
      tables: tables.map(table => Object.values(table)[0]),
      count: tables.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tables',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Execute custom query (GET with query parameter)
router.get('/query', async (req, res) => {
  const { sql } = req.query;
  
  if (!sql) {
    return res.status(400).json({
      success: false,
      message: 'SQL query parameter is required',
      timestamp: new Date().toISOString()
    });
  }

  try {
    const connection = await mysqlPool.getConnection();
    const [rows] = await connection.query(sql);
    connection.release();
    
    res.json({
      success: true,
      data: rows,
      count: rows.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Query execution failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
