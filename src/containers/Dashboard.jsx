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
    price: '',
    estimateRate: '',
    tipoViaje:''
  });

  const handleState = (state, type, typeAux, address) => {
    setValues({
      ...form,
      [type]: state,
      [typeAux]: address,
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
      .then(latLng => handleState(latLng, 'origin', 'addressOrigin', address))
      .catch(err => console.error('Error', err));
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
      .then(latLng =>
        handleState(latLng, 'destination', 'addressDestination', address)
      )
      .catch(err => console.error('Error', err));
  };

  const handleTypeTrip = (event, price, type) => {
    const $typeTrip = document.getElementsByClassName('typeTrip');

    for (let i = 0; i < $typeTrip.length; i++) {
      $typeTrip[i].className = $typeTrip[i].className.replace(
        'card-container__active',
        ''
      );
    }

    event.currentTarget.className += ' card-container__active';

    setValues({
      ...form,
      price: price,
      tipoViaje: type,
    });
  };

  const handleConfirmTrip = () => {
    console.log('Confirma Viaje');
  };

  const handleAddFavorites = () => {
    console.log('add favorites');
  }

  const handleDirectionsService = () => {
    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: new window.google.maps.LatLng(form.origin.lat, form.origin.lng),
        destination: new window.google.maps.LatLng(
          form.destination.lat,
          form.destination.lng
        ),
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          handleDistanceMatrix(result);
        } else {
          console.error(`Error solicitando la direccion ${result}`);
        }
      }
    );
  };

  const handleDistanceMatrix = response => {
    const DistanceService = new window.google.maps.DistanceMatrixService();

    DistanceService.getDistanceMatrix(
      {
        origins: [
          new window.google.maps.LatLng(form.origin.lat, form.origin.lng),
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
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (result, status) => {
        if (status === 'OK') {
          setValues({
            ...form,
            directions: response,
            duration: result.rows[0].elements[0].duration.text,
            distance: result.rows[0].elements[0].distance.text,
            estimateRate: Math.round(
              (result.rows[0].elements[0].distance.value / 100) * form.price
            ),
          });
        }
      }
    );
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleDirectionsService();
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
                <CardContainer
                  style='typeTrip'
                  handleClick={event => handleTypeTrip(event, '100')}
                >
                  <CardTwoLines
                    image={CarIcon}
                    title='Comparte'
                    subtitle='Tarifa dividida m&aacute;s econ&oacute;mica.'
                  />
                </CardContainer>
                <CardContainer
                  style='typeTrip'
                  handleClick={event => handleTypeTrip(event, '200')}
                >
                  <CardTwoLines
                    image={CarIcon}
                    title='Personal'
                    subtitle='Tarifa econ&oacute;mica.'
                  />
                </CardContainer>
                <CardContainer
                  style='typeTrip'
                  handleClick={event => handleTypeTrip(event, '300')}
                >
                  <CardTwoLines
                    image={CarIcon}
                    title='Confort'
                    subtitle='Tarifa plus.'
                  />
                </CardContainer>
                <Button
                  style={
                    Object.keys(form.origin).length > 0 &&
                    Object.keys(form.destination).length > 0 &&
                    form.price !== ''
                      ? 'button-morado'
                      : 'button-disabled'
                  }
                  disabled={
                    Object.keys(form.origin).length === 0 &&
                    Object.keys(form.destination).length === 0 &&
                    form.price === '' &&
                    true
                  }
                  type='submit'
                  textValue='Consultar Viaje'
                />
              </form>
              <Button
                style={
                  Object.keys(form.directions).length > 0
                    ? 'button-verde'
                    : 'button-disabled'
                }
                type='button'
                textValue='Confirmar Viaje'
                handleClick={handleConfirmTrip}
              />
              <Button
                style={
                  Object.keys(form.directions).length > 0
                    ? 'button-rojo-underline'
                    : 'button-disabled'
                }
                type='button'
                textValue='Agregar a favoritos'
                handleClick={handleAddFavorites}
              />
            </div>
            <div></div>
            <div></div>
          </div>
        </ContainerDashboardLeft>
        <ContainerDashboardRight>
          <div className='container__dashboard'>
            <div className='map'>
              <Map
                origin={form.origin}
                destination={form.destination}
                directions={form.directions}
              />
            </div>
            <ContainerDataTrip>
              <CardTwoLines
                image={CashIcon}
                title={`$${form.estimateRate} / ${form.distance}`}
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
