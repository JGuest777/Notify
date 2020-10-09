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

  const toggleNote = () => setShowNote(!showNote);

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

  return (
    <div className="App">
      <Nav toggleNote={toggleNote} showNote={showNote} />
      {showNote ? (
        <Note note={note} />
      ) : (
        <List getNotes={getNotes} notes={notes} getNote={getNote} />
      )}
    </div>
  );
};

export default App;
