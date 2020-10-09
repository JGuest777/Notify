import React, { useState } from 'react';
import './App.css';
import Nav from './Components/Nav';
import List from './Components/List';
import Note from './Components/Note';
import axios from 'axios';
import urlFor from './Utils/urlFor';

const App = () => {
  const [showNote, setShowNote] = useState(false);

  const toggleNote = () => setShowNote(!showNote);

  const getNotes = async () => {
    try {
      const resp = await axios.get(urlFor('notes'));
      console.log(resp.data);
    } catch (err) {
      console.log('error: ', err);
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
