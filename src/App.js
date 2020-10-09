import React from 'react';
import './App.css';
import Nav from './Components/Nav';
import List from './Components/List';
import Note from './Components/Note';

function App() {
  return (
    <div className="App">
      <Nav />
      <List />
      <Note />
    </div>
  );
}

export default App;
