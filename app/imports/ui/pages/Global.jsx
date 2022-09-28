import React, { useEffect, useState, useMemo } from 'react';
import { Meteor } from 'meteor/meteor';
import { GoogleMap, Polygon, useLoadScript } from '@react-google-maps/api';
import { ListGroup, Offcanvas, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useTracker } from 'meteor/react-meteor-data';
import apiKey from '../../../apiKey.json';
import Functions from '../../api/functions/functions';
import { Users } from '../../api/user/User';

const Global = () => {
  const { ready, currentUser, users } = useTracker(() => {
    const subscription = Meteor.subscribe(Users.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const userItems = Users.collection.find({}).fetch();
    const currentUserItem = userItems.filter((user) => (user.owner === Meteor.user().username))[0];
    return {
      currentUser: currentUserItem,
      users: userItems,
      ready: rdy,
    };
  }, []);
  const [showOverlay, setShowOverlay] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [polygon, setPolygon] = useState([]);
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: apiKey['react-maps-api-key'],
  });
  console.log('calling avPoints');
  console.log(Functions.avPoints(11111, users));
  console.log('calling avFoodScore');
  console.log(Functions.avFoodScore(11111, users));
  console.log('calling avFullScore');
  console.log(Functions.avFullScore(11111, users));
  console.log('calling avTransporationScore');
  console.log(Functions.avTransportationScore(11111, users));
  console.log('calling avMiscScore');
  console.log(Functions.avMiscScore(11111, users));

  useEffect(() => {
    async function fetchData() {
      try {
        // Iteratively, { aiea: totalScore }
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: 96701,
            key: apiKey['react-maps-api-key'],
          },
        });
        setLat(response.data.results[0].geometry.location.lat);
        setLng(response.data.results[0].geometry.location.lng);
        const polygonResponse = await axios.get('https://nominatim.openstreetmap.org/search.php', {
          params: {
            q: 'pearl harbor',
            polygon_geojson: 1,
            format: 'json',
          },
        });
        const filterGeoJsonType = polygonResponse.data.filter((data) => (data.geojson.type === 'Polygon' || data.geojson.type === 'MultiPolygon'));
        await filterGeoJsonType.map((polygonObj) => setPolygon((prev) => ([...prev, polygonObj.geojson.coordinates])));
      } catch (e) {
        console.log(`The error is: ${e}`);
      }
    }
    fetchData();
  }, []);
  const retrievePaths = () => {
    const returnArr = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const coordinates of polygon) {
      // combine multi polygon into one
      let s = [];
      if (coordinates.length > 1) {
        // eslint-disable-next-line no-restricted-syntax
        for (const cods of coordinates) {
          s = [...s, ...cods];
        }
      } else {
        s = [...coordinates];
      }
      const part = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const coordinate of s) {
        // eslint-disable-next-line no-restricted-syntax
        for (const c of coordinate) {
          part.push({ lat: parseFloat(c[1]), lng: parseFloat(c[0]) });
        }
      }
      returnArr.push(part);
    }
    return returnArr;
  };
  const center = useMemo(() => ({ lat, lng }), [lat, lng]);
  return (isLoaded && ready) ? (
    <>
      <GoogleMap
        mapContainerStyle={{ width: '100vw', height: '100vh' }}
        center={center}
        zoom={13}
      >
        <>
          {retrievePaths().map((place, index) => (
            <Polygon
              paths={place}
              key={index}
              onClick={() => (setShowOverlay(!showOverlay))}
              options={{
                fillColor: 'lightgreen',
                fillOpacity: 0.5,
                strokeColor: 'black',
                strokeOpacity: 0.5,
                strokeWeight: 1,
                clickable: true,
                draggable: false,
                editable: false,
                geodesic: false,
                zIndex: 1,
              }}
            />
          ))}
        </>
      </GoogleMap>
      <Offcanvas show={showOverlay} onHide={() => (setShowOverlay(false))} placement="end" name="end" backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sustainability Habits</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>

  ) : <Spinner animation="border" role="status" />;
};

export default Global;
