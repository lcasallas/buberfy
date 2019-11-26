import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { connect } from 'react-redux';
import { saveTravelRequest, saveFavoriteTravelRequest } from '../actions';

import Map from '../components/Map';
import Main from '../components/Main';
import ContainerDashboard from '../components/ContainerDashboard';
import ContainerDashboardLeft from '../components/ContainerDashboardLeft';
import ContainerDashboardRight from '../components/ContainerDashboardRight';
import ContainerDataTrip from '../components/ContainerDataTrip';
import Button from '../components/Button';
import CardContainer from '../components/CardContainer';
import CardTwoLines from '../components/CardTwoLines';
import CardThreeLines from '../components/CardThreeLines';

import '../assets/styles/components/Dashboard.scss';
import CarIcon from '../assets/static/iconCar.png';
import CashIcon from '../assets/static/iconCash.png';
import FlagIcon from '../assets/static/iconFlag.png';
import DriverImg from '../assets/static/userProfile.jpeg';

const Dashboard = ({ id_usuario, saveTravelRequest, saveFavoriteTravelRequest }) => {
  
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
    tipoViaje: '',
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
    const data = {
      'id_usuario': id_usuario,
      'lat_origen': form.origin.lat,
      'lon_origen': form.origin.lng,
      'lat_destino': form.destination.lat,
      'lon_destino': form.destination.lng,
      'id_metodo_pago':1,
      'valor_pagar': form.estimateRate,
      'estado': 'Finalizado',
      'direccion_origen': form.addressOrigin,
      'direccion_destino': form.addressDestination,
      'tipo_viaje': form.tipoViaje,
      'distancia': form.distance,
      'duracion': form.duration
    }
    saveTravelRequest(data);
  };

  const handleAddFavorites = () => {
    const data = {
      'id_usuario': id_usuario,
      'lat': form.destination.lat,
      'lon': form.destination.lng,
      'direccion': form.addressDestination,
      'alias': form.addressDestination,
    }
    saveFavoriteTravelRequest(data);
  };

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
                    handleClick={event => handleTypeTrip(event, '100', 'COMPARTE')}
                  >
                    <CardTwoLines
                      image={CarIcon}
                      title='Comparte'
                      subtitle='Tarifa dividida m&aacute;s econ&oacute;mica.'
                    />
                  </CardContainer>
                  <CardContainer
                    style='typeTrip'
                    handleClick={event => handleTypeTrip(event, '200', 'PERSONAL')}
                  >
                    <CardTwoLines
                      image={CarIcon}
                      title='Personal'
                      subtitle='Tarifa econ&oacute;mica.'
                    />
                  </CardContainer>
                  <CardContainer
                    style='typeTrip'
                    handleClick={event => handleTypeTrip(event, '300', 'CONFORT')}
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
                  handleClick={ () => handleConfirmTrip(id_usuario)}
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
                <Map directions={form.directions} />
              </div>
              <ContainerDataTrip>
                <div>
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
    id_usuario: state.user.id_usuario,
    notificationstate: state.notificationstate,
  }
}
const mapDispatchToProps = {
  saveTravelRequest,
  saveFavoriteTravelRequest
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);