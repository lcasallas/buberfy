import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import Main from '../components/Main';
import Header from '../components/Header';
import ContainerDashboard from '../components/ContainerDashboard';
import ContainerDashboardLeft from '../components/ContainerDashboardLeft';
import ContainerDashboardRight from '../components/ContainerDashboardRight';
import ContainerDataTrip from '../components/ContainerDataTrip';
import Input from '../components/Input';
import Button from '../components/Button';
import CardContainer from '../components/CardContainer';
import CardOneLines from '../components/CardOneLine';
import CardTwoLines from '../components/CardTwoLines';
import CardThreeLines from '../components/CardThreeLines';

import '../assets/styles/components/MyAccount.scss';
import CarIcon from '../assets/static/iconCar.png';
import CashIcon from '../assets/static/iconCash.png';
import FlagIcon from '../assets/static/iconFlag.png';
import DriverImg from '../assets/static/userProfile.jpeg';
import BankCardIcon from '../assets/static/iconBankCard.png';

const MyAccount = ({ google }) => {
  const [form, setValues] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    tarjeta: '',
  });

  const handleChange = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    console.log('Datos Actualizados');
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Datos mi cuenta');
  };

  return (
    <Main>
      <Header />
      <ContainerDashboard>
        <ContainerDashboardLeft>
          <div className='container__menu-account'>
            <div className='container__menu-account-profileImg'>
              <img src={DriverImg} alt='Photo user profile' />
            </div>
            <div className='container__menu-trip-options'>
              <h2>Mi Cuenta</h2>
              <form onSubmit={handleSubmit}>
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
                  name='direccionDestino'
                />
                <Input
                  type='text'
                  placeholder='E-mail *'
                  handleChange={handleChange}
                  name='email'
                />
                <Input
                  type='text'
                  placeholder='Telefono *'
                  handleChange={handleChange}
                  name='telefono'
                />
                <Input
                  type='text'
                  placeholder='Tarjeta de cr&eacute;dito'
                  handleChange={handleChange}
                  name='tarjeta'
                />
                <Button
                  style='button-verde'
                  type='submit'
                  textValue='Actualizar Datos'
                  handleClick={handleUpdate}
                />
              </form>
            </div>
          </div>
        </ContainerDashboardLeft>
        <ContainerDashboardRight>
          <div className='container__history'>
            <div className='container__history-trip'>
              <div className='container__history_list-trip'>
                <h2>Historial de Viajes</h2>
                <CardContainer>
                  <CardOneLines
                    imageLeft={CarIcon}
                    imageRight={BankCardIcon}
                    title='Platzi, HQ'
                  />
                </CardContainer>
                <CardContainer>
                  <CardOneLines
                    imageLeft={CarIcon}
                    imageRight={BankCardIcon}
                    title='Platzi, HQ'
                  />
                </CardContainer>
                <CardContainer>
                  <CardOneLines
                    imageLeft={CarIcon}
                    imageRight={BankCardIcon}
                    title='Platzi, HQ'
                  />
                </CardContainer>
                <CardContainer>
                  <CardOneLines
                    imageLeft={CarIcon}
                    imageRight={BankCardIcon}
                    title='Platzi, HQ'
                  />
                </CardContainer>
                <CardContainer>
                  <CardOneLines
                    imageLeft={CarIcon}
                    imageRight={BankCardIcon}
                    title='Platzi, HQ'
                  />
                </CardContainer>
                <CardContainer>
                  <CardOneLines
                    imageLeft={CarIcon}
                    imageRight={BankCardIcon}
                    title='Platzi, HQ'
                  />
                </CardContainer>
                <CardContainer>
                  <CardOneLines
                    imageLeft={CarIcon}
                    imageRight={BankCardIcon}
                    title='Platzi, HQ'
                  />
                </CardContainer>
              </div>
              <div className='container__history-map'>
                <div className='map map__account'>
                  <Map
                    google={google}
                    zoom={4}
                    initialCenter={{ lat: 19.5943885, lng: -97.9526044 }}
                  />
                </div>
              </div>
            </div>
            <div className='container__history-map'>
              <ContainerDataTrip>
                <CardTwoLines
                  image={CashIcon}
                  title='$ 25.000'
                  subtitle='Tarifa estimada del viaje.'
                />
                <CardTwoLines
                  image={FlagIcon}
                  title='37 min.'
                  subtitle='Tiempo estimado de llegada.'
                />
                <CardThreeLines
                  image={CarIcon}
                  title='Chevrolet Spark GT.'
                  subtitle='ELX 890'
                  detail='Automovil Asignado.'
                />
                <CardThreeLines
                  image={DriverImg}
                  title='Uber Contreras'
                  subtitle='4.95'
                  detail='Conductor Asignado'
                  classes='data-trip__item-imgProfile'
                  score={true}
                />
              </ContainerDataTrip>
            </div>
          </div>
        </ContainerDashboardRight>
      </ContainerDashboard>
    </Main>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCmjvkXB_DMnBUNwxQztLMStyQmA_szbNw',
})(MyAccount);
