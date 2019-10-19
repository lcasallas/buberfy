import React from 'react';
import '../assets/styles/components/CardOneLine.scss';

const CardOneLine = ({ imageLeft, imageRight, title }) => (
	<div className='ard-one-line'>
		<div>
			<img src={imageLeft} />
			<span>{title}</span>
		</div>
		<div>
			<img src={imageRight} />
		</div>
	</div>
);

export default CardOneLine;
