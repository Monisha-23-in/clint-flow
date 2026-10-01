import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="empty-state" style={{marginTop: '40px'}}>
      <h1 style={{fontSize: '4rem', color: 'var(--primary-color)', marginBottom: '16px'}}>404</h1>
      <h3 className="empty-title">Page not found.</h3>
      <p className="empty-text">The page you're looking for doesn't exist.</p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Dashboard</button>
    </div>
  );
};

export default NotFound;
