import React, { useState } from 'react';
import './App.css';
import Nav from './Components/Nav';
import List from './Components/List';
import Note from './Components/Note';
import axios from 'axios';
import urlFor from './Utils/urlFor';
import Flash from './Components/Flash';

const App = () => {
  const [showNote, setShowNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({});
  const [newTag, setNewTag] = useState(false);
  const [error, setError] = useState('');

  const toggleNote = () => {
    setShowNote(!showNote);
    setNote({});
  };
  const getNotes = async () => {
    try {
      const resp = await axios.get(urlFor('notes'));
      setNotes(resp.data);
    } catch (error) {
      console.log('getNotes: ', error.response);
    }
  };

  const getNote = async (id) => {
    try {
      console.log('getNote');
      const resp = await axios.get(urlFor(`notes/${id}`));
      setShowNote(true);
      setNote(resp.data);
    } catch (error) {
      console.log('getNote: ', error.response);
    }
  };

  const handleSubmitRequest = (data, id) => {
    if (id) {
      return axios.patch(urlFor(`notes/${id}`), data);
    } else {
      return axios.post(urlFor('notes'), data);
    }
  };

  const submitNote = async (data, id) => {
    try {
      handleSubmitRequest(data, id);
      setShowNote(false);
    } catch (error) {
      console.log('submitNote: ', error.response);
    }
  };

  const deleteNote = async (id) => {
    const newNotesState = notes.filter((note) => note.id !== id);
    try {
      await axios.delete(urlFor(`notes/${id}`));
      setNotes(newNotesState);
    } catch (error) {
      console.log('deleteNote: ', error.response);
    }
  };

  const showTagForm = () => {
    setNewTag(true);
  };

  const closeTagForm = () => {
    setNewTag(false);
  };

  const submitTag = async (data, noteId) => {
    try {
      await axios.post(urlFor(`notes/${noteId}/tags`), data);
      setNote(noteId);
    } catch (error) {
      console.log('submitTag: ', error.response);
    }
  };

  const deleteTag = async (noteId, id) => {
    try {
      await axios.delete(urlFor(`tags/${id}`));
      getNote(noteId);
    } catch (error) {
      console.log('deleteTag: ', error.response);
    }
  };

  return (
    <div className="App">
      <Nav toggleNote={toggleNote} showNote={showNote} />
      <Flash />
      {showNote ? (
        <Note
          note={note}
          submitNote={submitNote}
          showTagForm={showTagForm}
          newTag={newTag}
          closeTagForm={closeTagForm}
          submitTag={submitTag}
          deleteTag={deleteTag}
        />
      ) : (
        <List
          getNotes={getNotes}
          notes={notes}
          getNote={getNote}
          deleteNote={deleteNote}
        />
      )}
    </div>
  );
};

export default App;
