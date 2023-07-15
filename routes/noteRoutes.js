// routes/noteRoutes.js
const express = require('express');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new note (protected route)
router.post('/', authMiddleware, noteController.createNote);

// Retrieve all notes (protected route)
router.get('/', authMiddleware, noteController.getAllNotes);

// Retrieve a specific note (protected route)
router.get('/:id', authMiddleware, noteController.getNoteById);

// Update a note (protected route)
router.put('/:id', authMiddleware, noteController.updateNote);

// Delete a note (protected route)
router.delete('/:id', authMiddleware, noteController.deleteNote);

module.exports = router;
