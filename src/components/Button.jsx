import React from 'react';
import '../assets/styles/components/Button.scss';

const Button = ({ style, type, textValue, handleClick }) => (
  <button className={`${style} button`} type={type} onClick={handleClick}>
    {textValue}
  </button>
);

export default Button;
