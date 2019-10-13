import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Login.scss';
import Logo from '../assets/static/logo.png';
import RegisterImg from '../assets/static/register.png';

const Register = () => (
  <section className='login'>
    <div className='login__image'>
      <img src={RegisterImg} alt='' />
    </div>
    <div className='login__container'>
      <div className='login__container-imagen'>
        <img src={Logo} alt='' />
      </div>
      <h2>Registro</h2>
      <form action='login__container--form'>
        <input type='text' className='input' placeholder='Nombre *' />
        <input type='text' className='input' placeholder='Apellido *' />
        <input type='text' className='input' placeholder='E-mail *' />
        <input type='text' className='input' placeholder='Movil *' />
        <button className='button-rojo button'>Crear cuenta</button>
      </form>
      <p className='login__container--register'>
        <Link to='/'>Iniciar Sesi&oacute;n </Link>
      </p>
    </div>
  </section>
);

export default Register;
