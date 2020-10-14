import React from 'react';

const Nav = ({ toggleNote, showNote }) => {
  return (
    <div className="nav-container">
      <a href="https://notify-jg.herokuapp.com/">
        <div className="nav-logo">Notify</div>
      </a>
      <div className="nav-button" onClick={toggleNote}>
        {showNote ? 'Cancel' : '+ Note'}
      </div>
    </div>
  );
};

export default Nav;
