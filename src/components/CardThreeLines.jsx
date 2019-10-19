import React from 'react';
import '../assets/styles/components/CardThreeLines.scss';
import StarIcon from '../assets/static/iconStar.png';

const CardThreeLines = ({ image, score, title, subtitle, detail, classes }) => (
	<div className='data-trip__item'>
		<img className={`${classes} data-trip__item-img`} src={image} />
		<div>
			<span className='data-trip__item-tittle'>{title}</span>
			<span className='data-trip__item-subtittle'>
				{score ? (
					<span className='data-trip__item-subtittle'>
						<img src={StarIcon} width='15px' />
						{subtitle}
					</span>
				) : (
					subtitle
				)}
			</span>
			<span className='data-trip__item-detail'>{detail}</span>
		</div>
	</div>
);

export default CardThreeLines;
