import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Map from '../components/Map';
// import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import Main from '../components/Main';
import Header from '../components/Header';
import ContainerDashboard from '../components/ContainerDashboard';
import ContainerDashboardLeft from '../components/ContainerDashboardLeft';
import ContainerDashboardRight from '../components/ContainerDashboardRight';
import ContainerDataTrip from '../components/ContainerDataTrip';
import Input from '../components/Input';
import Button from '../components/Button';
import CardContainer from '../components/CardContainer';
import CardTwoLines from '../components/CardTwoLines';
import CardThreeLines from '../components/CardThreeLines';

import '../assets/styles/components/Dashboard.scss';
import CarIcon from '../assets/static/iconCar.png';
import CashIcon from '../assets/static/iconCash.png';
import FlagIcon from '../assets/static/iconFlag.png';
import DriverImg from '../assets/static/userProfile.jpeg';

const Dashboard = ({ google }) => {
  const [form, setValues] = useState({
    addressOrigin: '',
    addressDestination: '',
    origin: {},
    destination: {},
    duration: '',
    distance: '',
    directions: {},
  });

  // Sesgando la busqueda solo a bogota y su alrededor
  const searchOptions = {
    language: 'es',
    location: new window.google.maps.LatLng(4.710988599999999, -74.072092),
    radius: 5000,
    types: ['address'],
  };

  const handleState = (state, type) => {
    setValues({
      ...form,
      [type]: state,
    });
  };

  const handleChangeOrigin = addressOrigin => {
    setValues({
      ...form,
      addressOrigin: addressOrigin,
    });
  };

  const handleSelectOrigin = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => handleState(latLng, 'origin'))
      .catch(err => console.error('Error', err));
    setValues({
      ...form,
      addressOrigin: address,
    });
  };

  const handleChangeDestination = addressDestination => {
    setValues({
      ...form,
      addressDestination: addressDestination,
    });
  };

  const handleSelectDestination = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => handleState(latLng, 'destination'))
      .catch(err => console.error('Error', err));
    setValues({
      ...form,
      addressDestination: address,
    });
  };

  const handleDataTrip = (duration, distance) => {
    setValues({
      ...form,
      duration: duration,
      distance: distance,
    });
  };
  
  const handleConfirmTrip = () => {
    console.log('Confirma Viaje');
  };

  const handleSubmit = event => {
    event.preventDefault();
    const DirectionsService = new window.google.maps.DirectionsService();
    const DistanceService = new window.google.maps.DistanceMatrixService();

    DirectionsService.route(
      {
        origin: new window.google.maps.LatLng(
          form.origin.lat,
          form.origin.lng
        ),
        destination: new window.google.maps.LatLng(
          form.destination.lat,
          form.destination.lng
        ),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setValues({
            ...form,
            directions: result,
          });
        } else {
          console.error(`Error solicitando la direccion ${result}`);
        }
      }
    );
    DistanceService.getDistanceMatrix(
      {
        origins: [
          new window.google.maps.LatLng(
            form.origin.lat,
            form.origin.lng
          ),
        ],
        destinations: [
          new window.google.maps.LatLng(
            form.destination.lat,
            form.destination.lng
          ),
        ],
        travelMode: window.google.maps.TravelMode.DRIVING,
        avoidHighways: false,
        avoidTolls: false,
        unitSystem: window.google.maps.UnitSystem.IMPERIAL,
      },
      (result, status) => {
        this.handleDataTrip(
          result.rows[0].elements[0].duration.text,
          result.rows[0].elements[0].distance.text
        );
      }
    );
  };

  const originComponent = ({
    getInputProps,
    suggestions,
    getSuggestionItemProps,
    loading,
  }) => (
    <div>
      <input
        {...getInputProps({
          placeholder: 'Origen',
          className: 'input',
        })}
      />
      <div
        className={
          suggestions.length > 0
            ? 'autocomplete-dropdown-container'
            : 'autocomplete-dropdown-container--hide'
        }
      >
        {loading && <div>Cargando...</div>}
        {suggestions.map(suggestion => {
          const className = suggestion.active
            ? 'suggestion-item--active'
            : 'suggestion-item';
          return (
            <div
              {...getSuggestionItemProps(suggestion, {
                className,
              })}
            >
              <span>{suggestion.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const destinationComponent = ({
    getInputProps,
    suggestions,
    getSuggestionItemProps,
    loading,
  }) => (
    <div>
      <input
        {...getInputProps({
          placeholder: 'Destino',
          className: 'input',
        })}
      />
      <div
        className={
          suggestions.length > 0
            ? 'autocomplete-dropdown-container'
            : 'autocomplete-dropdown-container--hide'
        }
      >
        {loading && <div>Cargando...</div>}
        {suggestions.map(suggestion => {
          const className = suggestion.active
            ? 'suggestion-item--active'
            : 'suggestion-item';
          return (
            <div
              {...getSuggestionItemProps(suggestion, {
                className,
              })}
            >
              <span>{suggestion.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <Main>
      <Header />
      <ContainerDashboard>
        <ContainerDashboardLeft>
          <div className='container__menu-trip'>
            <div className='container__menu-trip-options'>
              <h2>Detalle Viaje</h2>
              <form onSubmit={handleSubmit}>
                <PlacesAutocomplete
                  value={form.addressOrigin}
                  onChange={handleChangeOrigin}
                  onSelect={handleSelectOrigin}
                  // searchOptions={searchOptions}
                >
                  {originComponent}
                </PlacesAutocomplete>
                <PlacesAutocomplete
                  value={form.addressDestination}
                  onChange={handleChangeDestination}
                  onSelect={handleSelectDestination}
                  // searchOptions={searchOptions}
                >
                  {destinationComponent}
                </PlacesAutocomplete>
                <h2>Tipo de Viaje</h2>
                <CardContainer>
                  <CardTwoLines
                    image={CarIcon}
                    title='Comparte'
                    subtitle='Tarifa dividida m&aacute;s econ&oacute;mica.'
                  />
                </CardContainer>
                <CardContainer>
                  <CardTwoLines
                    image={CarIcon}
                    title='Personal'
                    subtitle='Tarifa econ&oacute;mica.'
                  />
                </CardContainer>
                <CardContainer>
                  <CardTwoLines
                    image={CarIcon}
                    title='Confort'
                    subtitle='Tarifa plus.'
                  />
                </CardContainer>
                <Button
                  style='button-morado'
                  type='submit'
                  textValue='Consultar Viaje'
                />
              </form>
              <Button
                style='button-verde'
                type='button'
                textValue='Confirmar Viaje'
                handleClick={handleConfirmTrip}
              />
            </div>
            <div></div>
            <div></div>
          </div>
        </ContainerDashboardLeft>
        <ContainerDashboardRight>
          <div className='container__dashboard'>
            <div className='map'>
              {/* {form.origin.lat && form.destination.lat && ( */}
                <Map
                  origin={form.origin}
                  destination={form.destination}
                  handleDataTrip={handleDataTrip}
                  directions={form.directions}
                />
              {/* )} */}
            </div>
            <ContainerDataTrip>
              <CardTwoLines
                image={CashIcon}
                title={form.distance}
                subtitle='Tarifa estimada del viaje.'
              />
              <CardTwoLines
                image={FlagIcon}
                title={form.duration}
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

export default Dashboard;
// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyCmjvkXB_DMnBUNwxQztLMStyQmA_szbNw',
// })(Dashboard);
