import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Notes = ({ authToken }) => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch all notes
    const fetchNotes = async () => {
      try {
        const response = await api.get('/notes', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setNotes(response.data.notes);
      } catch (error) {
        console.error('Error fetching notes:', error.response.data.message);
      }
    };

    fetchNotes();
  }, [authToken]);

  const handleCreateNote = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/notes', { title, content }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setNotes([...notes, response.data.note]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating note:', error.response.data.message);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error deleting note:', error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleCreateNote}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">Create Note</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <p>Title: {note.title}</p>
            <p>Content: {note.content}</p>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
