// index.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

app.use(bodyParser.json());

// Include the routes for user registration and authentication
app.use('/auth', authRoutes);

// Include the routes for notes
app.use('/api', noteRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
