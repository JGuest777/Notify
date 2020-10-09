import React from 'react';

class Note extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    const title = this.title.value;
    const content = this.content.value;

    const formData = {
      title,
      content,
    };
    this.props.submitNote(formData);
  }

  render() {
    const { note } = this.props;

    return (
      <div className="note-container">
        <form className="note-form" onSubmit={(e) => this.onSubmit(e)}>
          <input
            className="note-title-input"
            type="text"
            placeholder="Note title"
            defaultValue={note.title}
            ref={(input) => (this.title = input)}
          />
          <textarea
            className="note-textarea"
            placeholder="Type here.."
            defaultValue={note.content}
            ref={(input) => (this.content = input)}
          />
          <input className="note-button" type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default Note;
