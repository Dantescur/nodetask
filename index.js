const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

// Create a Winston logger instance
const logger = winston.createLogger({
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

// Include the routes for notes
app.use('/notes', noteRoutes);

// Include the routes for user registration and authentication
app.use('/auth', authRoutes);

// Error handler for unhandled routes
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

// Start the server
app.listen(3000, () => {
  logger.info('Server started on port 3000');
});
