import React from 'react';

const Note = (props) => {
  const { note } = props;
  return (
    <div className="note-container">
      <form className="note-form">
        <input
          className="note-title-input"
          type="text"
          placeholder="Note title"
          defaultValue={note.title}
        />
        <textarea
          className="note-textarea"
          placeholder="Type here.."
          defaultValue={note.content}
        />
        <input className="note-button" type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Note;
