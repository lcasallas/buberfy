import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Header.scss';
import LogoImg from '../assets/static/logo.png';
import Avatar from '../assets/static/userProfile.jpeg';

const Header = () => {
  return (
    <header className='header'>
      <div className='header__img'>
        <img src={LogoImg} alt='Buberfy Logo' />
      </div>
      <div className='header__menu'>
        <ul className='header__menu-option'>
          <li>
            <Link to='/favoritos'>favoritos</Link>
          </li>
          <li>
            <Link to='/micuenta'>mi cuenta</Link>
          </li>
          <li>
            <Link to='/viaje'>viajar</Link>
          </li>
        </ul>
        <div className='header__profile'>
          <img src={Avatar} alt='Photo Profile' />
        </div>
      </div>
    </header>
  );
};

export default Header;
