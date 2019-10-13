import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Login.scss';
import '../assets/styles/App.scss';
import Logo from '../assets/static/logo.png';
import LoginImg from '../assets/static/login.png';
import FacebookIcon from '../assets/static/facebook.png';
import TwitterIcon from '../assets/static/twitter.png';
import GoogleIcon from '../assets/static/google.png';

const Login = () => (
  <section className='login'>
    <div className='login__image'>
      <img src={LoginImg} alt='' />
    </div>
    <div className='login__container'>
      <div className='login__container-imagen'>
        <img src={Logo} alt='' />
      </div>
      <h2>Inicia sesión</h2>
      <form action='login__container--form'>
        <input type='text' className='input' placeholder='Usuario' />
        <input type='text' className='input' placeholder='Contraseña' />
        <button className='button-rojo button'>Iniciar sesión</button>
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
        No tienes ninguna cuenta <Link to='/register'>Registrate</Link>
      </p>
    </div>
  </section>
);

export default Login;
