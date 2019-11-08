import React from 'react';
import '../assets/styles/components/CardTwoLines.scss';

const CardTwoLines = ({ image, title, subtitle, handleClick, style }) => (
  <div className={`${style} cardTwoLines`} onClick={handleClick}>
    <div>
      <img src={image} alt='' />
    </div>
    <div className='cardTwoLines__text'>
      <span className='cardTwoLines__text-title'>{title}</span>
      <span className='cardTwoLines__text-detail'>{subtitle}</span>
    </div>
  </div>
);

export default CardTwoLines;
