import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const MapComponent = ({ latlng, style, area }) => {
  const [lat, lng] = latlng;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBgGJ-O4sAC74SjxPOa9u4MlAu52ogabdg',
  });

  let zoom = 0;
  if (area > 0) zoom = 12;
  if (area > 500) zoom = 11;
  if (area > 1000) zoom = 10;
  if (area > 10000) zoom = 9;
  if (area > 50000) zoom = 8;
  if (area > 100000) zoom = 7;
  if (area > 300000) zoom = 6;
  if (area > 1000000) zoom = 5;
  if (area > 5000000) zoom = 4;

  return isLoaded ? (
    <GoogleMap mapContainerStyle={style} center={{ lat, lng }} zoom={zoom}>
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};
export default MapComponent;
