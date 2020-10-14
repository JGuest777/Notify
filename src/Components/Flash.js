import React, { useEffect } from 'react';

const Flash = ({ error, resetError }) => {
  useEffect(() => {
    console.log('setTimeout');
    setTimeout(() => {
      resetError();
    }, 2000);
  });

  return <div className="flash-container">{error}</div>;
};

export default Flash;
