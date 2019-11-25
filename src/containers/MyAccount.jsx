import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { historyRequest } from '../actions';

import Main from '../components/Main';
import ContainerDashboard from '../components/ContainerDashboard';
import ContainerDashboardLeft from '../components/ContainerDashboardLeft';
import ContainerDashboardRight from '../components/ContainerDashboardRight';
import ContainerDataTrip from '../components/ContainerDataTrip';
import Input from '../components/Input';
import Button from '../components/Button';
import CardContainer from '../components/CardContainer';
import CardOneLine from '../components/CardOneLine';
import CardTwoLines from '../components/CardTwoLines';
import CardThreeLines from '../components/CardThreeLines';
import Map from '../components/Map';

import '../assets/styles/components/MyAccount.scss';
import CarIcon from '../assets/static/iconCar.png';
import CashIcon from '../assets/static/iconCash.png';
import FlagIcon from '../assets/static/iconFlag.png';
import DriverImg from '../assets/static/userProfile.jpeg';
import BankCardIcon from '../assets/static/iconBankCard.png';
import StartIcon from '../assets/static/marcadorInicio.png';
import EndtIcon from '../assets/static/marcadorFin.png';
import DistanceIcon from '../assets/static/distancia.png';

const MyAccount = ({ user, historytrips, historyRequest }) => {
  useEffect(() => {
    historyRequest(user.id_usuario);
  }, []);

  const [form, setValues] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    tarjeta: '',
  });

  const [dataMap, setValuesMap] = useState({
    origin: '',
    destino: '',
    duration: '',
    distance: '',
    directions: {},
    price: '',
    estimateRate: '',
    tipoviaje: '',
  });

  const handleDirectionsService = dataTrip => {
    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: new window.google.maps.LatLng(
          dataTrip.originlat,
          dataTrip.originlng
        ),
        destination: new window.google.maps.LatLng(
          dataTrip.destinationlat,
          dataTrip.destinationlng
        ),
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          handleDistanceMatrix(result, dataTrip);
        } else {
          console.error(`Error solicitando la direccion ${result}`);
        }
      }
    );
  };

  const handleDistanceMatrix = (response, dataTrip) => {
    const DistanceService = new window.google.maps.DistanceMatrixService();

    DistanceService.getDistanceMatrix(
      {
        origins: [
          new window.google.maps.LatLng(dataTrip.originlat, dataTrip.originlng),
        ],
        destinations: [
          new window.google.maps.LatLng(
            dataTrip.destinationlat,
            dataTrip.destinationlng
          ),
        ],
        travelMode: window.google.maps.TravelMode.DRIVING,
        avoidHighways: false,
        avoidTolls: false,
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (result, status) => {
        if (status === 'OK') {
          setValuesMap({
            ...dataMap,
            directions: response,
            duration: dataTrip.duration,
            distance: dataTrip.distance,
            estimateRate: dataTrip.estimaterate,
            origin: dataTrip.origin,
            destino: dataTrip.destino,
            tipoviaje: dataTrip.tipoviaje,
          });
        }
      }
    );
  };

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
                <div>
                  {historytrips.length > 0 &&
                    historytrips.map((trip, idx) => {
                      return (
                        <CardContainer
                          key={idx}
                          handleClick={() => handleDirectionsService(trip)}
                        >
                          <CardOneLine
                            imageLeft={CarIcon}
                            imageRight={BankCardIcon}
                            title={trip.destino}
                          />
                        </CardContainer>
                      );
                    })}
                </div>
              </div>
              <div className='container__history-map'>
                <div className='map map__account'>
                  <Map directions={dataMap.directions} />
                </div>
              </div>
            </div>
            <div className='container__history-map'>
              <ContainerDataTrip>
                <div>
                  <CardTwoLines
                    image={CashIcon}
                    title={`$${dataMap.estimateRate} / ${dataMap.distance}`}
                    subtitle='Tarifa estimada del viaje.'
                  />
                  <CardTwoLines
                    image={FlagIcon}
                    title={dataMap.duration}
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
                </div>
                <div>
                  <CardTwoLines
                    image={StartIcon}
                    title={dataMap.origin}
                    subtitle='Lugar de Origen.'
                  />
                  <CardTwoLines
                    image={EndtIcon}
                    title={dataMap.destino}
                    subtitle='Lugar de destino.'
                  />
                  <CardTwoLines
                    image={DistanceIcon}
                    title={dataMap.distance}
                    subtitle='Kilometros de viaje.'
                  />
                  <CardTwoLines
                    image={CarIcon}
                    title={dataMap.tipoviaje}
                    subtitle='Tipo de viaje.'
                  />
                </div>
              </ContainerDataTrip>
            </div>
          </div>
        </ContainerDashboardRight>
      </ContainerDashboard>
    </Main>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    historytrips: state.historytrips,
  };
};

const mapDispatchToProps = {
  historyRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
