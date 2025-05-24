import React, { useState, useEffect } from 'react';
import '../styles/notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);
  
useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');
  
    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
  
    window.addEventListener('mousemove', moveCursor);
  
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);
  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!title.trim() || !content.trim()) return;

    const newNote = { title, content };
    if (editingIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editingIndex] = newNote;
      setNotes(updatedNotes);
      setEditingIndex(null);
    } else {
      setNotes([newNote, ...notes]);
    }

    setTitle('');
    setContent('');
  };

  const editNote = (index) => {
    setTitle(notes[index].title);
    setContent(notes[index].content);
    setEditingIndex(index);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="notes-container">
      <h2>📝 My Notes</h2>

      <div className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button onClick={addNote}>
          {editingIndex !== null ? 'Update Note' : 'Add Note'}
        </button>
      </div>

      <div className="notes-list">
        {notes.map((note, index) => (
          <div className="note-card" key={index}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="note-actions">
              <button onClick={() => editNote(index)}>Edit</button>
              <button onClick={() => deleteNote(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
