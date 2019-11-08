import React from 'react';
import '../assets/styles/components/CardContainer.scss';

const CardContainer = ({ style, children, handleClick }) => (
	<div className={`${style} card-container`} onClick={handleClick}>
		{children}
	</div>
);
export default CardContainer;
