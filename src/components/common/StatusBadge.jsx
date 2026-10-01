import React from 'react';

const StatusBadge = ({ status }) => {
  const badgeClass = `badge badge-${status.toLowerCase().replace(' ', '')}`;
  return (
    <span className={badgeClass}>
      {status}
    </span>
  );
};

export default StatusBadge;
