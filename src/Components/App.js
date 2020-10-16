import React, { useContext } from 'react';
import '../App.css';
import Nav from './Nav';
import List from './List';
import Note from './Note';
import axios from 'axios';
import urlFor from '../Utils/urlFor';
import Flash from './Flash';
import { NoteContext } from '../Context/NoteContext';

const App = () => {
  const {
    showNote,
    setShowNote,
    notes,
    setNotes,
    setNote,
    newTag,
    setNewTag,
    setNoteTitle,
    setNoteText,
    error,
    setError,
  } = useContext(NoteContext);

  const toggleNote = () => {
    setShowNote(!showNote);
    setNote({});
    setNoteTitle('');
    setNoteText('');
  };

  const getNotes = async () => {
    try {
      const resp = await axios.get(urlFor('notes'));
      setNotes(resp.data);
    } catch (error) {
      console.log('getNotes fetch error: ', error.response);
    }
  };

  const getNote = async (id) => {
    try {
      const resp = await axios.get(urlFor(`notes/${id}`));
      setShowNote(true);
      setNoteTitle(resp.data.title);
      setNoteText(resp.data.content);
      setNote(resp.data);
    } catch (error) {
      console.log('getNote fetch error: ', error.response);
    }
  };

  const handleSubmitRequest = (data, id) => {
    if (id) {
      return axios.patch(urlFor(`notes/${id}`), data);
    } else {
      return axios.post(urlFor('notes'), data);
    }
  };

  const submitNote = (data, id) => {
    handleSubmitRequest(data, id)
      .then((res) => setShowNote(false))
      .catch((err) => {
        const { errors } = err.response.data;
        if (errors.title) {
          setError('Missing Title!');
        } else if (errors.content) {
          setError('Missing Content!');
        }
      });
  };

  const deleteNote = async (id) => {
    const newNotesState = notes.filter((note) => note.id !== id);
    try {
      await axios.delete(urlFor(`notes/${id}`));
      setNotes(newNotesState);
    } catch (error) {
      console.log('deleteNote delete error: ', error.response);
    }
  };

  const showTagForm = () => {
    setNewTag(true);
  };

  const closeTagForm = () => {
    setNewTag(false);
  };

  const submitTag = (data, noteId) => {
    axios
      .post(urlFor(`notes/${noteId}/tags`), data)
      .then((res) => getNote(noteId))
      .catch((err) => {
        const { errors } = err.response.data;
        if (errors.name) {
          setError('Missing Tag Name!');
        }
      });
  };

  const deleteTag = async (noteId, id) => {
    try {
      await axios.delete(urlFor(`tags/${id}`));
      getNote(noteId);
    } catch (error) {
      console.log('deleteTag delete error: ', error.response);
    }
  };

  const resetError = () => {
    setError('');
  };

  return (
    <div className="App">
      <Nav toggleNote={toggleNote} showNote={showNote} />
      {error && <Flash error={error} resetError={resetError} />}
      {showNote ? (
        <Note
          submitNote={submitNote}
          showTagForm={showTagForm}
          newTag={newTag}
          closeTagForm={closeTagForm}
          submitTag={submitTag}
          deleteTag={deleteTag}
        />
      ) : (
        <List getNotes={getNotes} getNote={getNote} deleteNote={deleteNote} />
      )}
    </div>
  );
};

export default App;
