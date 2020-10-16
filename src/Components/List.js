import React, { useEffect, useContext } from 'react';
import NoteCard from './NoteCard';
import { NoteContext } from '../Context/NoteContext';

const List = ({ getNotes, getNote, deleteNote }) => {
  const { notes } = useContext(NoteContext);

  useEffect(() => {
    getNotes();
  }, []);

  const cards = notes.map((note, index) => {
    return (
      <NoteCard
        key={index}
        index={index}
        note={note}
        getNote={getNote}
        deleteNote={deleteNote}
      />
    );
  });

  return <div className="list-container">{cards}</div>;
};

export default List;
