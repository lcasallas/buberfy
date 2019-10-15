import React from 'react';
import '../assets/styles/components/Logo.scss';
import LogoImg from '../assets/static/logo.png';

const Logo = () => (
  <div className='logo'>
    <img src={LogoImg} alt='' />
  </div>
);

export default Logo;
