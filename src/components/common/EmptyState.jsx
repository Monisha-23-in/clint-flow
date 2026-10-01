import React from 'react';
import { SearchX } from 'lucide-react';

const EmptyState = ({ title, description, action }) => (
  <div className="empty-state">
    <SearchX className="empty-icon" />
    <h3 className="empty-title">{title}</h3>
    <p className="empty-text">{description}</p>
    {action}
  </div>
);

export default EmptyState;
