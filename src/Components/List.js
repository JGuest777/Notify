import React, { useEffect } from 'react';

const List = (props) => {
  const { getNotes } = props;

  useEffect(() => {
    getNotes();
  });

  return <div className="list-container">List Component</div>;
};

export default List;
