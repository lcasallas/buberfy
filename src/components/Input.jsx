import React from 'react';

const Input = ({ type, placeholder, name, handleChange }) => {
  return (
    <input
      className='input'
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={handleChange}
    />
  );
};

export default Input;
