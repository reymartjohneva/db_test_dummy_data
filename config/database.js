const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL Database Connection Pool
const mysqlPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test MySQL Connection
async function testMySQLConnection() {
  try {
    const connection = await mysqlPool.getConnection();
    console.log('✓ MySQL Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('✗ MySQL connection error:', error.message);
    return false;
  }
}

module.exports = {
  mysqlPool,
  testMySQLConnection
};
