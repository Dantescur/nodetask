// routes/noteRoutes.js
const express = require('express');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new note (protected route)
router.post('/notes', authMiddleware, noteController.createNote);

// Retrieve all notes (protected route)
router.get('/notes', authMiddleware, noteController.getAllNotes);

// Retrieve a specific note (protected route)
router.get('/notes/:id', authMiddleware, noteController.getNoteById);

// Update a note (protected route)
router.put('/notes/:id', authMiddleware, noteController.updateNote);

// Delete a note (protected route)
router.delete('/notes/:id', authMiddleware, noteController.deleteNote);

module.exports = router;
