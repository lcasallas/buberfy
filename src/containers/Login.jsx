import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loginRequest } from '../actions';
import '../assets/styles/components/Login.scss';
import '../assets/styles/App.scss';
import ContainerForm from '../components/ContainerForm';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import LoginImg from '../assets/static/login.png';
import FacebookIcon from '../assets/static/facebook.png';
import TwitterIcon from '../assets/static/twitter.png';
import GoogleIcon from '../assets/static/google.png';

const Login = props => {
	const [form, setValues] = useState({
		email: '',
	});

	const handleChange = event => {
		setValues({
			...form,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = event => {
		event.preventDefault();
		props.loginRequest(form);
	};

	return !props.user.login ? (
		<section className='login'>
			<div className='login__image'>
				<img src={LoginImg} alt='' />
			</div>
			<ContainerForm>
				<Logo />
				<h2>Inicia sesión</h2>
				<form action='login__container--form' onSubmit={handleSubmit}>
					<Input
						type='text'
						placeholder='email'
						handleChange={handleChange}
						name='email'
						focus={true}
					/>
					<Input
						type='password'
						placeholder='Password'
						handleChange={handleChange}
						name='password'
					/>
					<Button
						style='button-rojo'
						type='submit'
						textValue='Iniciar Sesión'
					/>
					<div className='login__container--remember-me'>
						<label>
							<input type='checkbox' name='' id='cbox1' value='checkbox' />
							Recuerdame
						</label>
						<a href='#'>¿Olvidé mi contraseña?</a>
					</div>
				</form>
				<section className='login__container--social-media'>
					<div>
						<img src={FacebookIcon} alt='Twiter' />
						<span>Inicia sesión con Facebook.</span>
					</div>
					<div>
						<img src={TwitterIcon} alt='Twiter' />
						<span>Inicia sesión con Twitter.</span>
					</div>
					<div>
						<img src={GoogleIcon} alt='Google' />
						<span>Inicia sesión con Google.</span>
					</div>
				</section>
				<p className='login__container--register'>
					No tienes ninguna cuenta
					<Link to='/register'> Registrate</Link>
				</p>
			</ContainerForm>
		</section>
	) : (
		<Redirect to='/dashboard' />
	);
};
const mapStateToProps = state => {
	return {
		user: state.user,
	};
};
const mapDispatchToProps = {
	loginRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
