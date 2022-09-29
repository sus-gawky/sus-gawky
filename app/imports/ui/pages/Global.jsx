import React, { useEffect, useMemo, useState } from 'react';
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
  const [areaInformation, setAreaInformation] = useState([]);
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: apiKey['react-maps-api-key'],
  });
  // console.log('calling avPoints');
  // console.log(Functions.avPoints(96782, users));
  // console.log('calling avFoodScore');
  // console.log(Functions.avFoodScore(96782, users));
  // console.log('calling avFullScore');
  // console.log(Functions.avFullScore(96782, users));
  // console.log('calling avTransporationScore');
  // console.log(Functions.avTransportationScore(96782, users));
  // console.log('calling avMiscScore');
  // console.log(Functions.avMiscScore(96782, users));

  useEffect(() => {
    async function fetchData() {
      try {
        // Iteratively, { aiea: totalScore }
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: currentUser.zipCode,
            key: apiKey['react-maps-api-key'],
          },
        });

        setLat(response.data.results[0].geometry.location.lat);
        setLng(response.data.results[0].geometry.location.lng);
        const testAreaInformation = [];
        const visitedZipcode = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const data of users) {
          const { zipCode, city } = data;
          const miscScore = Functions.avMiscScore(zipCode, users);
          const transportationScore = Functions.avTransportationScore(zipCode, users);
          const fullScore = Functions.avFullScore(zipCode, users);
          const foodScore = Functions.avFoodScore(zipCode, users);
          const points = Functions.avPoints(zipCode, users);
          // if the zipcode has been seen push the city to the areaInformation array
          // eslint-disable-next-line no-prototype-builtins
          if (!visitedZipcode.hasOwnProperty(zipCode)) {
            visitedZipcode[zipCode] = true;
            testAreaInformation.push({
              area: {
                miscScore,
                transportationScore,
                fullScore,
                foodScore,
                points,
                city,
              },
              polygonData: [],
            });
          }
        }
        // Loop through area obj's city & retrieve paths & store in data
        // eslint-disable-next-line no-restricted-syntax
        for (const areaObj of testAreaInformation) {
          const { city } = areaObj.area;
          // eslint-disable-next-line no-await-in-loop
          const testPolygonResponse = await axios.get('https://nominatim.openstreetmap.org/search.php', {
            params: {
              q: city,
              polygon_geojson: 1,
              format: 'json',
              limit: 1,
            },
          });
          // eslint-disable-next-line no-await-in-loop
          const results = await testPolygonResponse.data.filter((data) => (data.geojson.type === 'Polygon' || data.geojson.type === 'MultiPolygon'));
          const latLngCoordinates = [];
          for (const pairOfCoordinates of results[0].geojson.coordinates) {
            for (const coordinates of pairOfCoordinates) {
              latLngCoordinates.push({ lat: coordinates[1], lng: coordinates[0] });
            }
          }
          areaObj.polygonData = latLngCoordinates;
          // areaObj.polygonData = await retrievePaths(results);
          // eslint-disable-next-line no-await-in-loop
          await setAreaInformation((prev) => ([...prev, areaObj]));
        }
      } catch (e) {
        console.log(`The error is: ${e}`);
      }
    }
    fetchData();
  }, []);
  console.log(areaInformation);
  const center = useMemo(() => ({ lat, lng }), [lat, lng]);
  return (isLoaded && ready) ? (
    <>
      <GoogleMap
        mapContainerStyle={{ width: '100vw', height: '100vh' }}
        center={center}
        zoom={13}
      >
        <>
          {areaInformation.map((place, index) => (
            <Polygon
              paths={place.polygonData}
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
