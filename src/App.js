import React, { useState } from 'react';
import './App.css';
import Nav from './Components/Nav';
import List from './Components/List';
import Note from './Components/Note';
import axios from 'axios';

const App = () => {
  const [showNote, setShowNote] = useState(false);

  const toggleNote = () => setShowNote(!showNote);

  const getNotes = async () => {
    try {
      const data = await axios.get('https://note-app-api.herokuapp.com/notes');
      console.log(data.data);
      return data;
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div className="App">
      <Nav toggleNote={toggleNote} showNote={showNote} />
      {showNote ? <Note /> : <List getNotes={getNotes} />}
    </div>
  );
};

export default App;
