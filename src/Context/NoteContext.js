import React, { useState, createContext } from 'react';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [showNote, setShowNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({});
  const [newTag, setNewTag] = useState(false);
  const [tagText, setTagText] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [error, setError] = useState('');

  return (
    <NoteContext.Provider
      value={{
        showNote,
        setShowNote,
        notes,
        setNotes,
        note,
        setNote,
        newTag,
        setNewTag,
        tagText,
        setTagText,
        noteTitle,
        setNoteTitle,
        noteText,
        setNoteText,
        error,
        setError,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
