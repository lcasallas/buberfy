import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Login.scss';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import ContainerForm from '../components/ContainerForm';
import RegisterImg from '../assets/static/register.png';

const Register = () => {
  const [form, setValues] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    movil: '',
  });

  const handleChange = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(form);
  };
  // 4433191005376678 -> Radicado.
  // 4433191995366886 -> Num.Atencion

  return (
    <section className='login'>
      <div className='login__image'>
        <img src={RegisterImg} alt='' />
      </div>
      <ContainerForm>
        <Logo />
        <h2>Registro</h2>
        <form action='login__container--form' onSubmit={handleSubmit}>
          <Input
            type='text'
            placeholder='Nombre *'
            handleChange={handleChange}
            name='nombre'
          />
          <Input
            type='text'
            placeholder='Apellido *'
            handleChange={handleChange}
            name='apellido'
          />
          <Input
            type='text'
            placeholder='E-mail *'
            handleChange={handleChange}
            name='email'
          />
          <Input
            type='text'
            placeholder='Contraseña *'
            handleChange={handleChange}
            name='password'
          />
          <Input
            type='text'
            placeholder='Movil *'
            handleChange={handleChange}
            name='movil'
          />
          <Button style='button-rojo' type='submit' textValue='Registrarse' />
          {/* <input type='text' className='input' placeholder='Nombre *' />
        <input type='text' className='input' placeholder='Apellido *' />
        <input type='text' className='input' placeholder='E-mail *' />
        <input type='text' className='input' placeholder='Movil *' />
        <button className='button-rojo button'>Crear cuenta</button> */}
        </form>
        <p className='login__container--register'>
          <Link to='/'>Iniciar Sesi&oacute;n </Link>
        </p>
      </ContainerForm>
    </section>
  );
};
export default Register;
