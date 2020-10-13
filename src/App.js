import React, { useState } from 'react';
import './App.css';
import Nav from './Components/Nav';
import List from './Components/List';
import Note from './Components/Note';
import axios from 'axios';
import urlFor from './Utils/urlFor';

const App = () => {
  const [showNote, setShowNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({});

  const toggleNote = () => {
    setShowNote(!showNote);
    setNote({});
  };
  const getNotes = async () => {
    try {
      const resp = await axios.get(urlFor('notes'));
      setNotes(resp.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const getNote = async (id) => {
    try {
      const resp = await axios.get(urlFor(`notes/${id}`));
      setShowNote(true);
      setNote(resp.data);
    } catch (error) {
      console.log('error: ', error);
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
      console.log('error: ', error);
    }
  };

  const deleteNote = async (id) => {
    const newNotesState = notes.filter((note) => note.id !== id);
    try {
      const resp = await axios.delete(urlFor(`notes/${id}`));
      setNotes(newNotesState);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div className="App">
      <Nav toggleNote={toggleNote} showNote={showNote} />
      {showNote ? (
        <Note note={note} submitNote={submitNote} />
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
