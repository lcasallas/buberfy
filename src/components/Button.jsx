import React from 'react';

const Button = ({ style, type, textValue, handleClick }) => (
  <button className={`${style} button`} type={type} onClick={handleClick}>
    {textValue}
  </button>
);

export default Button;
