import React from 'react';
import { connect } from 'react-redux';
import { setLogout } from '../actions';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Header.scss';
import LogoImg from '../assets/static/logo.png';
import Avatar from '../assets/static/userProfile.jpeg';

const Header = ({ setLogout }) => {
	const handleLogout = () => {
		setLogout();
	};
	return (
		<header className='header'>
			<div className='header__img'>
				<img src={LogoImg} alt='Buberfy Logo' />
			</div>
			<div className='header__menu'>
				<ul className='header__menu-option'>
					<li>
						<Link to='/favorites'>favoritos</Link>
					</li>
					<li>
						<Link to='/myaccount'>mi cuenta</Link>
					</li>
					<li>
						<Link to='/dashboard'>viajar</Link>
					</li>
					<li>
						<button className='header__btnlogout' onClick={handleLogout}>
							cerrar sesi&oacute;n
						</button>
					</li>
				</ul>
				<div className='header__profile'>
					<img src={Avatar} alt='Photo Profile' />
				</div>
			</div>
		</header>
	);
};

const mapDispatchToProps = {
	setLogout,
};
export default connect(null, mapDispatchToProps)(Header);
