const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose'); //by Vidhi

// Load environment variables from config.env
require('dotenv').config({ path: path.join(__dirname, 'config.env') });

// Import database connection
const connectDB = require('./config/database');

// Import routes
const survivorStoriesRoutes = require('./routes/survivorStories');
const redZoneRoutes = require('./routes/redZones'); // ✅ NEW
const therapistsRoutes = require('./routes/therapists'); // NEW
const ngoRoutes = require('./routes/ngos');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    mongoUri: process.env.MONGODB_URI ? 'Configured' : 'Not configured'
  });
});

// API routes
app.use('/api/survivor-stories', survivorStoriesRoutes);
app.use('/api/red-zones', redZoneRoutes); // ✅ NEW
app.use('/api/therapists', therapistsRoutes); // NEW
app.use('/api/ngos', ngoRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Trafficking Prevention Platform API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      survivorStories: '/api/survivor-stories',
      redZones: '/api/red-zones',
      survivorStoriesStats: '/api/survivor-stories/stats',
      survivorStoriesSearch: '/api/survivor-stories/search'
    }
  });
});
const reportRoutes = require('./routes/reports');
app.use('/api/reports', reportRoutes);

// Add the new victims route
const victimRoutes = require('./routes/victims');
app.use('/api/victims', victimRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5005;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API Documentation: http://localhost:${PORT}/`);
  console.log(`MongoDB URI: ${process.env.MONGODB_URI ? 'Configured' : 'Not configured'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to uncaught exception');
  process.exit(1);
});

module.exports = app;
