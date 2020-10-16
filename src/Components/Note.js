import React, { useContext } from 'react';
import { NoteContext } from '../Context/NoteContext';

const Note = ({
  submitNote,
  submitTag,
  closeTagForm,
  showTagForm,
  deleteTag,
}) => {
  const {
    note,
    tagText,
    setTagText,
    newTag,
    noteTitle,
    setNoteTitle,
    noteText,
    setNoteText,
  } = useContext(NoteContext);
  const onSubmit = (e) => {
    e.preventDefault();
    const title = noteTitle;
    const content = noteText;

    const formData = {
      title,
      content,
    };
    submitNote(formData, note.id);
  };

  const onTagSubmit = (e) => {
    e.preventDefault();
    const name = tagText;
    const formData = {
      name,
    };
    submitTag(formData, note.id);
    closeTagForm();
    setTagText('');
  };

  const renderTagForm = (note) => {
    if (note.id !== undefined) {
      if (!newTag) {
        return (
          <span>
            Tag your note:
            <i
              className="tag-button material-icons"
              onClick={() => showTagForm()}
            >
              add circle
            </i>
          </span>
        );
      } else {
        return (
          <form onSubmit={(e) => onTagSubmit(e)}>
            <input
              className="tag-input"
              type="text"
              placeholder="Tag Name.."
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
            />
          </form>
        );
      }
    }
  };

  const renderTags = (note) => {
    if (note.tags) {
      return note.tags.map((tag, index) => (
        <div
          className="tag"
          key={index}
          onClick={(e) => deleteTag(note.id, tag.id)}
        >
          <span className="delete">
            <i className="material-icons">delete</i>
          </span>
          {tag.name}
        </div>
      ));
    }
  };

  return (
    <div className="note-container">
      <form
        className="note-form"
        onSubmit={onSubmit}
        onClick={() => closeTagForm()}
      >
        <input
          className="note-title-input"
          type="text"
          placeholder="Note title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <textarea
          className="note-textarea"
          placeholder="Type here.."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <input className="note-button" type="submit" value="submit" />
      </form>
      <div className="tag-container">
        <div className="tag-button-container">{renderTagForm(note)}</div>
        <div className="tag-list-container">{renderTags(note)}</div>
      </div>
    </div>
  );
};

export default Note;
