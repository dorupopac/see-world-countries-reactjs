import React from 'react';
import { useDarkmodeContext } from '../../contexts/darkmode-context';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const MapComponent = ({ latlng, style, area }) => {
  const { theme } = useDarkmodeContext();
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

  const darkMode = {
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      {
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#242f3e' }],
      },
      {
        featureType: 'administrative.country',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#f4f4f4' }],
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{ color: '#746855' }],
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
      },
    ],
  };

  return (
    <>
      {isLoaded && theme === 'dark' ? (
        <GoogleMap
          mapContainerStyle={style}
          options={darkMode}
          center={{ lat, lng }}
          zoom={zoom}
        />
      ) : (
        <></>
      )}
      {isLoaded && theme === 'light' ? (
        <GoogleMap
          mapContainerStyle={style}
          center={{ lat, lng }}
          zoom={zoom}
        />
      ) : (
        <></>
      )}
    </>
  );
};
export default MapComponent;
