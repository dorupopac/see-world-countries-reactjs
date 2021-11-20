import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const MapComponent = props => {
  const [lat, lng] = props.latlng;

  return (
    <Map
      google={props.google}
      style={props.style}
      zoom={7}
      initialCenter={{ lat, lng }}
    />
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBgGJ-O4sAC74SjxPOa9u4MlAu52ogabdg',
})(MapComponent);
