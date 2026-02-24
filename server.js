const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testMySQLConnection } = require('./config/database');

// Import routes
const healthRoutes = require('./routes/health');
const mysqlRoutes = require('./routes/mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/mysql', mysqlRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Express.js Backend Server',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      mysql: '/api/mysql'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// Start server and test connections
async function startServer() {
  try {
    console.log('\n🚀 Starting Express.js Server...\n');
    
    // Test database connection
    console.log('Testing database connection...');
    await testMySQLConnection();
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`\n✓ Server is running on http://localhost:${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`✓ CORS Origin: ${process.env.CORS_ORIGIN || '*'}`);
      console.log('\nAvailable endpoints:');
      console.log(`  - GET  http://localhost:${PORT}/`);
      console.log(`  - GET  http://localhost:${PORT}/api/health`);
      console.log(`  - GET  http://localhost:${PORT}/api/mysql/test`);
      console.log(`  - GET  http://localhost:${PORT}/api/mysql/tables`);
      console.log('\n✓ Server ready to accept requests\n');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('\nSIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received. Shutting down gracefully...');
  process.exit(0);
});

startServer();

module.exports = app;
