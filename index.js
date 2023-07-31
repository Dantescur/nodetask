const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const connectToRedis = require('./database/redisConnection');

const app = express();
const redisClient = connectToRedis();

// Create a Winston logger instance
const logger = winston.createLogger({
  // Logger configuration
  level: 'debug', // Set the desired log level
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(
      ({ timestamp, level, message, stack }) =>
        `${timestamp} [${level}]: ${stack || message}`
    )
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'server.log' }), // Log to a file
  ],
});

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Connect to Redis
redisClient.on('connect', () => {
  logger.info('Connected to Redis');
});
redisClient.on('error', (error) => {
  logger.error('Error connecting to Redis:', error);
});

app.get('/favicon.ico', (req, res) => res.status(204));

// Include the routes for notes and authentication
app.use('/notes', noteRoutes);
app.use('/auth', authRoutes);

// Error handlers
app.use((req, res, next) => {
  const error = new Error(`Not found: ${req.method} ${req.url}`);
  error.status = 404;
  next(error);
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({ message: err.message });
});
// ...

// Start the server
app.listen(3000, () => {
  logger.info('Server started on port 3000');
});

module.exports = app;
