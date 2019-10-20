import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import Main from '../components/Main';
import Header from '../components/Header';
import ContainerDashboard from '../components/ContainerDashboard';
import ContainerDashboardLeft from '../components/ContainerDashboardLeft';
import ContainerDashboardRight from '../components/ContainerDashboardRight';
import ContainerDataTrip from '../components/ContainerDataTrip';
import Button from '../components/Button';
import CardContainer from '../components/CardContainer';
import CardOneLine from '../components/CardOneLine';
import CardTwoLines from '../components/CardTwoLines';
import CardThreeLines from '../components/CardThreeLines';

import '../assets/styles/components/Dashboard.scss';
import CarIcon from '../assets/static/iconCar.png';
import CashIcon from '../assets/static/iconCash.png';
import FlagIcon from '../assets/static/iconFlag.png';
import RepeatIcon from '../assets/static/repeatIcon.png';
import DriverImg from '../assets/static/userProfile.jpeg';

const Favorites = ({ google }) => {
  const [form, setValues] = useState({
    addressOrigin: '',
    addressDestination: '',
  });

  const handleConfirmTrip = () => {
    console.log('Confirma Viaje');
  };

  return (
    <Main>
      <Header />
      <ContainerDashboard>
        <ContainerDashboardLeft>
          <div className='container__menu-trip'>
            <div className='container__menu-trip-options'>
              <h2>Destinos Favoritos</h2>
              <CardContainer>
                <CardOneLine
                  imageLeft={CarIcon}
                  imageRight={RepeatIcon}
                  title='Platzi, HQ'
                />
              </CardContainer>
              <CardContainer>
                <CardOneLine
                  imageLeft={CarIcon}
                  imageRight={RepeatIcon}
                  title='Platzi, HQ'
                />
              </CardContainer>
              <CardContainer>
                <CardOneLine
                  imageLeft={CarIcon}
                  imageRight={RepeatIcon}
                  title='Platzi, HQ'
                />
              </CardContainer>
              <CardContainer>
                <CardOneLine
                  imageLeft={CarIcon}
                  imageRight={RepeatIcon}
                  title='Platzi, HQ'
                />
              </CardContainer>
            </div>
            <div>
              <Button
                style='button-verde'
                type='button'
                textValue='Confirmar Viaje'
                handleClick={handleConfirmTrip}
              />
            </div>
            <div></div>
          </div>
        </ContainerDashboardLeft>
        <ContainerDashboardRight>
          <div className='container__dashboard'>
            <div className='map'>
              <Map
                google={google}
                zoom={4}
                initialCenter={{ lat: 19.5943885, lng: -97.9526044 }}
              />
            </div>
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
        </ContainerDashboardRight>
      </ContainerDashboard>
    </Main>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCmjvkXB_DMnBUNwxQztLMStyQmA_szbNw',
})(Favorites);
