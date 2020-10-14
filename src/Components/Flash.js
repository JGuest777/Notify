import React, { useEffect } from 'react';

const Flash = ({ error, resetError }) => {
  useEffect(() => {
    setTimeout(() => {
      resetError();
    }, 3000);
  });

  return <div className="flash-container">{error}</div>;
};

export default Flash;
