// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Function to register a new user
async function register(req, res) {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error occurred during user registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Function to authenticate a user
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, 'qZ#7t$%a7zR5&T23z!xqKb4p9jHnDgP6');

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error occurred during user login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { register, login };
