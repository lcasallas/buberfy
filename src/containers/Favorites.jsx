import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { favoriteRequest } from '../actions';

import Main from '../components/Main';
import ContainerDashboard from '../components/ContainerDashboard';
import ContainerDashboardLeft from '../components/ContainerDashboardLeft';
import ContainerDashboardRight from '../components/ContainerDashboardRight';
import ContainerDataTrip from '../components/ContainerDataTrip';
import Button from '../components/Button';
import CardContainer from '../components/CardContainer';
import CardOneLine from '../components/CardOneLine';
import CardTwoLines from '../components/CardTwoLines';
import CardThreeLines from '../components/CardThreeLines';
import Map from '../components/Map';

import '../assets/styles/components/Dashboard.scss';
import CarIcon from '../assets/static/iconCar.png';
import CashIcon from '../assets/static/iconCash.png';
import FlagIcon from '../assets/static/iconFlag.png';
import DriverImg from '../assets/static/userProfile.jpeg';
import BankCardIcon from '../assets/static/iconBankCard.png';

const Favorites = ({ user, favoritesTrips, favoriteRequest }) => {
  useEffect(() => {
    favoriteRequest(user.id_usuario);
  }, []);

  const [form, setValues] = useState({
    addressOrigin: '',
    addressDestination: '',
  });

  const [dataMap, setValuesMap] = useState({
    origin: {},
    destination: {},
    duration: '',
    distance: '',
    directions: {},
    price: '',
    estimateRate: '',
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
            duration: result.rows[0].elements[0].duration.text,
            distance: result.rows[0].elements[0].distance.text,
            estimateRate: dataTrip.estimaterate,
          });
        }
      }
    );
  };

  const handleConfirmTrip = () => {
    console.log('Confirma Viaje');
  };

  return (
    <Main>
      <ContainerDashboard>
        <ContainerDashboardLeft>
          <div className='container__menu-trip'>
            <div className='container__menu-trip-options'>
              <h2>Destinos Favoritos</h2>
              {favoritesTrips.length > 0 &&
                favoritesTrips.map((trip, idx) => {
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
            <div>
              <Button
                style='button-verde'
                type='button'
                textValue='Confirmar Viaje'
                handleClick={handleConfirmTrip}
              />
            </div>
            <div />
          </div>
        </ContainerDashboardLeft>
        <ContainerDashboardRight>
          <div className='container__dashboard'>
            <div className='map'>
              <Map
                origin={dataMap.origin}
                destination={dataMap.destination}
                directions={dataMap.directions}
              />
            </div>
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
            </ContainerDataTrip>
          </div>
        </ContainerDashboardRight>
      </ContainerDashboard>
    </Main>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    favoritesTrips: state.favorites,
  };
};

const mapDispatchToProps = {
  favoriteRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
