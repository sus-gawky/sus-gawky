import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { CardGroup, Tab, Tabs } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-bootstrap/Modal';
import { Users } from '../../api/user/User';

const StoreNavigation = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { currentUser } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Users.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const userItems = Users.collection.find({}).fetch();
    const currentUserItem = userItems.filter((user) => (user.owner === Meteor.user().username))[0];
    return {
      currentUser: currentUserItem,
      users: userItems,
      ready: rdy,
    };
  }, []);
  const weeklyData = {
    cardData: [
      {
        id: '1',
        points: 600,
        src: '../images/bulba.png',
        desc: 'Bulbasaur Pet',
        modalDialog: false,
        modalWithoutAnimation: false,
      },
      {
        id: '2',
        points: 8000,
        src: '../images/nft.png',
        desc: 'Godzilla NFT',
        modalDialog: false,
        modalWithoutAnimation: false,
      },
      {
        id: '3',
        points: 100,
        src: '../images/pixel-glasses.jpeg',
        desc: 'Avatar Glasses',
        modalDialog: false,
        modalWithoutAnimation: false,
      },
    ],
  };
  const charityData = {
    cardData: [
      {
        id: '1',
        points: 100,
        src: '../images/RMHC.jpeg',
        desc: 'Ronald McDonald House Charities',
        modalDialog: false,
        modalWithoutAnimation: false,
      },
      {
        id: '2',
        points: 100,
        src: '../images/ACS.png',
        desc: 'American Cancer Society',
        modalDialog: false,
        modalWithoutAnimation: false,
      },
      {
        id: '3',
        points: 100,
        src: '../images/LLS.png',
        desc: 'Leukemia & Lymphoma Society',
        modalDialog: false,
        modalWithoutAnimation: false,
      },
    ],
  };
  return (
    <Card className="pt-3 pb-3 store-card">
      <Tabs>
        <Tab eventKey="weekly" title="Weekly">
          <CardGroup>
            {
              weeklyData.cardData.map((item, index) => (
                <Card key={index} style={{ width: '10px', borderWidth: '1px', borderStyle: 'solid', borderColor: 'lightgray', borderRadius: 5.5 }}>
                  <Card.Img variant="top" src={item.src} />
                  <Card.Text className="text-center fredoka-one goals">
                    {item.desc}
                  </Card.Text>
                  <Card.Footer>
                    <small className="text-muted">{item.points} points</small>
                    <Button className="float-end" size="sm" onClick={handleShow}>Claim</Button>
                  </Card.Footer>
                </Card>
              ))
            }
            <Modal size="md" show={show} onHide={handleClose} centered backdrop="static">
              <Modal.Header closeButton>
                <Modal.Title>Confirm your in-app purchase</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to purchase this item? </Modal.Body>
              <Modal.Footer>
                <Button size="md" variant="danger" onClick={handleClose}>
                  No
                </Button>
                <Button size="md" variant="success" onClick={handleClose}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </CardGroup>
        </Tab>
        <Tab eventKey="charity" title="Charity">
          <h5 className="fredoka-one goals ms-5 mt-3 mb-0">100 points = $1 donated</h5>
          <CardGroup>
            {
              charityData.cardData.map((item, index) => (
                <Card key={index} style={{ width: '10px', borderWidth: '1px', borderStyle: 'solid', borderColor: 'lightgray', borderRadius: 5.5 }}>
                  <Card.Img variant="top" src={item.src} />
                  <Card.Text className="text-center fredoka-one goals">
                    {item.desc}
                  </Card.Text>
                  <Card.Footer>
                    <small className="text-muted">{item.points} points</small>
                    <Button className="float-end" size="sm" onClick={handleShow}>Claim</Button>
                  </Card.Footer>
                </Card>
              ))
            }
          </CardGroup>
        </Tab>
      </Tabs>
    </Card>
  );
};

export default StoreNavigation;
