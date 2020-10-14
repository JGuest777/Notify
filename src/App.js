import React, { useState } from 'react';
import './App.css';
import Nav from './Components/Nav';
import List from './Components/List';
import Note from './Components/Note';
import axios from 'axios';
import urlFor from './Utils/urlFor';
import Flash from './Components/Flash';

const App = () => {
  const [showNote, setShowNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({});
  const [newTag, setNewTag] = useState(false);
  const [error, setError] = useState('');

  const toggleNote = () => {
    setShowNote(!showNote);
    setNote({});
  };
  const getNotes = async () => {
    try {
      const resp = await axios.get(urlFor('notes'));
      setNotes(resp.data);
    } catch (error) {
      console.log('getNotes: ', error.response);
    }
  };

  const getNote = async (id) => {
    try {
      console.log('getNote');
      const resp = await axios.get(urlFor(`notes/${id}`));
      setShowNote(true);
      setNote(resp.data);
    } catch (error) {
      console.log('getNote: ', error.response);
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
      .then((res) => showNote(false))
      .catch((err) => {
        const { errors } = err.response.data;
        if (errors.content) {
          console.log('Missing Note Content!');
          setError('Missing Note Content!');
        } else if (errors.title) {
          console.log('Missing Title Content!');
          setError('Missing Title Content!');
        }
      });
  };

  const deleteNote = async (id) => {
    const newNotesState = notes.filter((note) => note.id !== id);
    try {
      await axios.delete(urlFor(`notes/${id}`));
      setNotes(newNotesState);
    } catch (error) {
      console.log('deleteNote: ', error.response);
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
      .then((res) => setNote(noteId))
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
      console.log('deleteTag: ', error.response);
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
          note={note}
          submitNote={submitNote}
          showTagForm={showTagForm}
          newTag={newTag}
          closeTagForm={closeTagForm}
          submitTag={submitTag}
          deleteTag={deleteTag}
        />
      ) : (
        <List
          getNotes={getNotes}
          notes={notes}
          getNote={getNote}
          deleteNote={deleteNote}
        />
      )}
    </div>
  );
};

export default App;
