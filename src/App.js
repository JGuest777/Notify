import React, { useState } from 'react';
import './App.css';
import Nav from './Components/Nav';
import List from './Components/List';
import Note from './Components/Note';

const App = () => {
  const [showNote, setShowNOte] = useState(false);

  return (
    <div className="App">
      <Nav />
      {showNote ? <Note /> : <List />}
    </div>
  );
};

export default App;
