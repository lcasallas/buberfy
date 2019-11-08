import React from 'react';
import '../assets/styles/components/Button.scss';

const Button = ({ style, type, textValue, disabled = false, handleClick }) => (
  <button
    className={`${style} button`}
    type={type}
    onClick={handleClick}
    disabled={disabled}
  >
    {textValue}
  </button>
);

export default Button;
