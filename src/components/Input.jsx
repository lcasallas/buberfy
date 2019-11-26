import React from 'react';
import '../assets/styles/components/Input.scss';

const Input = ({ type, placeholder, name, focus, value, handleChange }) => {
	return (
		<input
			className='input'
			type={type}
			placeholder={placeholder}
			name={name}
			onChange={handleChange}
			autoComplete='off'
			autoFocus={focus}
			value={value}
		/>
	);
};

export default Input;
