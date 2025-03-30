import React from 'react';

function Button({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded ${className}`}>
      {children}
    </button>
  );
}

export default Button;