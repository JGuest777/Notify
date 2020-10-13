import React from 'react';

const Nav = ({ toggleNote, showNote }) => {
  return (
    <div className="nav-container">
      <div className="nav-logo">Note</div>
      <div className="nav-button" onClick={toggleNote}>
        {showNote ? 'Cancel' : '+ Note'}
      </div>
    </div>
  );
};

export default Nav;
