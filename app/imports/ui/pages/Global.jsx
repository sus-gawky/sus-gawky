import React, { useEffect, useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Spinner } from 'react-bootstrap';
import apiKey from '../../../apiKey.json';

const Global = () => {
  const [map, setMap] = useState(null);
  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey['react-maps-api-key'],
  });
  useEffect(async () => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json${new URLSearchParams({
      address: 98732,
      key: apiKey['react-maps-api-key'],
    })}`, { method: 'GET' });
    console.log(response);
  }, []);
  // Retrieved from https://www.npmjs.com/package/@react-google-maps/api
  const onLoad = useCallback(() => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '30px' }}
      center={center}
      zoom={10}
      onLoad={onLoad}
    />
  ) : <Spinner animation="border" role="status" />;
};

export default Global;
