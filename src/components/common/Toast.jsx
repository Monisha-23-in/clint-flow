import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      <span>{message}</span>
      <button onClick={onClose} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginLeft: 'auto'}}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
