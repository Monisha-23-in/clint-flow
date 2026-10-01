import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorState = ({ message, onRetry }) => (
  <div className="empty-state">
    <AlertTriangle className="empty-icon" style={{color: 'var(--danger)'}} />
    <h3 className="empty-title">Something went wrong</h3>
    <p className="empty-text">{message || "We couldn't complete this operation."}</p>
    {onRetry && (
      <button className="btn btn-primary" onClick={onRetry}>Try Again</button>
    )}
  </div>
);

export default ErrorState;
