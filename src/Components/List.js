import React, { useEffect } from 'react';
import NoteCard from './NoteCard';

const List = ({ getNotes, notes, getNote, deleteNote }) => {
  useEffect(() => {
    getNotes();
  });

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
