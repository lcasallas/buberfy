import React from 'react';
import '../assets/styles/components/Input.scss';

const Input = ({ type, placeholder, name, focus, handleChange }) => {
  return (
    <input
      className='input'
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={handleChange}
      autoComplete='off'
      autoFocus={focus}
    />
  );
};

export default Input;
