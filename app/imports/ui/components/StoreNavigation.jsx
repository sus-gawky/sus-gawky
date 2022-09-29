import React from 'react';
import Card from 'react-bootstrap/Card';
import { CardGroup, Tab, Tabs } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Users } from '../../api/user/User';
import { Merch } from '../../api/merch/Merch';
import PurchaseModal from './PurchaseModal';

const StoreNavigation = () => {

  const { currentUser, merch } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription1 = Meteor.subscribe(Users.userPublicationName);
    const subscription2 = Meteor.subscribe(Merch.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription1.ready() && subscription2;
    // Get the Stuff documents
    const userItems = Users.collection.find({}).fetch();
    const merchItems = Merch.collection.find({}).fetch();
    const currentUserItem = userItems.filter((user) => (user.owner === Meteor.user().username))[0];
    return {
      merch: merchItems,
      currentUser: currentUserItem,
      users: userItems,
      ready: rdy,
    };
  }, []);
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
              merch.map((item, index) => (
                <Card key={index} style={{ width: '10px', borderWidth: '1px', borderStyle: 'solid', borderColor: 'lightgray', borderRadius: 5.5 }}>
                  <Card.Img variant="top" src={item.src} />
                  <Card.Text className="text-center fredoka-one goals">
                    {item.desc}
                  </Card.Text>
                  <Card.Footer>
                    <small className="text-muted">{item.points} points</small>
                    <PurchaseModal user={currentUser} desc={item.desc} points={item.points} />
                  </Card.Footer>
                </Card>
              ))
            }
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
                    <PurchaseModal user={currentUser} desc={item.desc} points={item.points} />
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
