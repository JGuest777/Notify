import React, { useState } from 'react';
import './App.css';
import Nav from './Components/Nav';
import List from './Components/List';
import Note from './Components/Note';

const App = () => {
  const [showNote, setShowNote] = useState(false);

  const toggleNote = () => setShowNote(!showNote);

  return (
    <div className="App">
      <Nav toggleNote={toggleNote} showNote={showNote} />
      {showNote ? <Note /> : <List />}
    </div>
  );
};

export default App;
