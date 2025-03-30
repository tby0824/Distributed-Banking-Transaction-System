import React from 'react';

function Input({ type, value, onChange, className }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`p-2 border rounded w-full ${className}`}
    />
  );
}

export default Input;