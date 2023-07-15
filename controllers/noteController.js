// controllers/noteController.js
const Note = require('../models/Note');

// Create a new note
async function createNote(req, res) {
  console.log('Request Body:', req.body);
  const { title, content } = req.body;
  const { userId } = req.user; // assuming you have implemented the authMiddleware to attach the user object to the request
 console.log('Note Model:', Note);
 console.log('Create Method:', Note.create);

  try {
    const note = await Note.create({ title, content, userId });
    return res.status(201).json({ message: 'Note created successfully', note });
  } catch (error) {
    console.error('Error occurred during note creation:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Retrieve all notes
async function getAllNotes(req, res) {
  const { userId } = req.user;

  try {
    const notes = await Note.findAll({ where: { userId } });
    return res.status(200).json({ notes });
  } catch (error) {
    console.error('Error occurred while retrieving notes:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Retrieve a specific note by ID
async function getNoteById(req, res) {
  const { userId } = req.user;
  const { id } = req.params;

  try {
    const note = await Note.findOne({ where: { id, userId } });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    return res.status(200).json({ note });
  } catch (error) {
    console.error('Error occurred while retrieving note:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Update a note
async function updateNote(req, res) {
  const { userId } = req.user;
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const note = await Note.findOne({ where: { id, userId } });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.title = title;
    note.content = content;
    await note.save();

    return res.status(200).json({ message: 'Note updated successfully', note });
  } catch (error) {
    console.error('Error occurred while updating note:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete a note
async function deleteNote(req, res) {
  const { userId } = req.user;
  const { id } = req.params;

  try {
    const note = await Note.findOne({ where: { id, userId } });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await note.destroy();

    return res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error occurred while deleting note:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
