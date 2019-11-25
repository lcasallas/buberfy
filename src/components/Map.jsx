import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from 'react-google-maps';
import { compose, withProps } from 'recompose';

const Map = compose(
  withProps({
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withGoogleMap
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
