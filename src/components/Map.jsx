import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from 'react-google-maps';
import { compose, withProps, lifecycle } from 'recompose';

const Map = compose(
  withProps({
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new window.google.maps.DirectionsService();
      const DistanceService = new window.google.maps.DistanceMatrixService();

      DirectionsService.route(
        {
          origin: new window.google.maps.LatLng(
            this.props.origin.lat,
            this.props.origin.lng
          ),
          destination: new window.google.maps.LatLng(
            this.props.destination.lat,
            this.props.destination.lng
          ),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
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
              this.props.origin.lat,
              this.props.origin.lng
            ),
          ],
          destinations: [
            new window.google.maps.LatLng(
              this.props.destination.lat,
              this.props.destination.lng
            ),
          ],
          travelMode: window.google.maps.TravelMode.DRIVING,
          avoidHighways: false,
          avoidTolls: false,
          unitSystem: window.google.maps.UnitSystem.IMPERIAL,
        },
        (result, status) => {
          this.props.handleDataTrip(
            result.rows[0].elements[0].duration.text,
            result.rows[0].elements[0].distance.text
          );
        }
      );
    },
  })
)(props => {
  const center = {
    lat: 4.710988599999999,
    lng: -74.072092,
  };

  return (
    <div>
      <GoogleMap defaultZoom={8} defaultCenter={center}>
        {props.directions && (
          <DirectionsRenderer directions={props.directions} />
        )}
      </GoogleMap>
    </div>
  );
});

export default Map;
