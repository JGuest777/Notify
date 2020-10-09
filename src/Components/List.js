import React, { useEffect } from 'react';
import NoteCard from './NoteCard';

const List = (props) => {
  const { getNotes, notes } = props;

  useEffect(() => {
    getNotes();
  });

  const cards = notes.map((note, index) => {
    return <NoteCard key={index} index={index} note={note} />;
  });

  return <div className="list-container">{cards}</div>;
};

export default List;
