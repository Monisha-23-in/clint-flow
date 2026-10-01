import React from 'react';
import { useLocation } from 'react-router-dom';

const PlaceholderPage = () => {
  const location = useLocation();
  const title = location.pathname.split('/')[1];
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <div className="placeholder-container">
      <div className="empty-state">
        <h2 className="empty-title">{formattedTitle} Module</h2>
        <p className="empty-text">This section is currently under construction. We are building amazing features for you!</p>
        <div className="placeholder-graphic"></div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
