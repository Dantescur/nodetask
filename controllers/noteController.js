const Note = require('../models/Note');
const connectToRedis = require('../database/redisConnection');

// Create a new note
async function createNote(req, res) {
  console.log('Request Body:', req.body);
  const { title, content } = req.body;
  const { userId } = req.user;

  try {
    const note = await Note.create({ title, content, userId });

    // Store the note in Redis
    const client = connectToRedis();
    client.set(`note:${note.id}`, JSON.stringify(note), (error) => {
      if (error) {
        console.error('Error storing note in Redis:', error);
      }
    });

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
    // Check if the notes are stored in Redis
    const client = connectToRedis();
    client.get(`notes:${userId}`, async (error, result) => {
      if (error) {
        console.error('Error retrieving notes from Redis:', error);
      }

      if (result) {
        // Notes found in Redis, return them
        const notes = JSON.parse(result);
        return res.status(200).json({ notes });
      } else {
        // Notes not found in Redis, fetch them from the database
        const notes = await Note.findAll({ where: { userId } });

        // Store the notes in Redis
        client.set(`notes:${userId}`, JSON.stringify(notes), (error) => {
          if (error) {
            console.error('Error storing notes in Redis:', error);
          }
        });

        return res.status(200).json({ notes });
      }
    });
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
    // Check if the note is stored in Redis
    const client = connectToRedis();
    client.get(`note:${id}`, async (error, result) => {
      if (error) {
        console.error('Error retrieving note from Redis:', error);
      }

      if (result) {
        // Note found in Redis, return it
        const note = JSON.parse(result);
        return res.status(200).json({ note });
      } else {
        // Note not found in Redis, fetch it from the database
        const note = await Note.findOne({ where: { id, userId } });

        if (!note) {
          return res.status(404).json({ message: 'Note not found' });
        }

        // Store the note in Redis
        client.set(`note:${note.id}`, JSON.stringify(note), (error) => {
          if (error) {
            console.error('Error storing note in Redis:', error);
          }
        });

        return res.status(200).json({ note });
      }
    });
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

    // Update the note in Redis
    const client = connectToRedis();
    client.set(`note:${note.id}`, JSON.stringify(note), (error) => {
      if (error) {
        console.error('Error updating note in Redis:', error);
      }
    });

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

    // Remove the note from Redis
    const client = connectToRedis();
    client.del(`note:${note.id}`, (error) => {
      if (error) {
        console.error('Error deleting note from Redis:', error);
      }
    });

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
