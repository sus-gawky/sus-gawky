import React from 'react';
import Card from 'react-bootstrap/Card';
import { CardGroup, Tab, Tabs } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Users } from '../../api/user/User';

const StoreNavigation = () => {

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
  return (
    <Card className="pt-3 pb-3 store-card">
      <Tabs>
        <Tab eventKey="weekly" title="Weekly">
          <CardGroup>
            <Card style={{ width: '10px', borderWidth: '1px', borderStyle: 'solid', borderColor: 'lightgray', borderRadius: 5.5 }}>
              <Card.Img variant="top" src="../images/bulba.png" />
              <Card.Text className="text-center fredoka-one goals">
                Bulbasaur Pet
              </Card.Text>
              <Card.Footer>
                <small className="text-muted">600 points</small>
                <Button className="float-end" size="sm">Claim</Button>
              </Card.Footer>
            </Card>
            <Card style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'lightgray', borderRadius: 5.5 }}>
              <Card.Img variant="top" src="../images/nft.png" />
              <Card.Text className="text-center fredoka-one goals">
                Godzilla NFT
              </Card.Text>
              <Card.Footer>
                <small className="text-muted">8000 points</small>
                <Button className="float-end" size="sm">Claim</Button>
              </Card.Footer>
            </Card>
            <Card style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'lightgray', borderRadius: 5.5 }}>
              <Card.Img variant="top" src="../images/pixel-glasses.jpeg" />
              <Card.Text className="text-center fredoka-one goals">
                Avatar Glasses
              </Card.Text>
              <Card.Footer>
                <small className="text-muted">100 points</small>
                <Button className="float-end" size="sm">Claim</Button>
              </Card.Footer>
            </Card>
          </CardGroup>
        </Tab>
        <Tab eventKey="charity" title="Charity">
          <h5 className="fredoka-one goals ms-5 mt-3 mb-0">100 points = $1 donated</h5>
          <CardGroup>
            <Card style={{ width: '10px', borderWidth: '1px', borderStyle: 'solid', borderColor: 'lightgray', borderRadius: 5.5 }}>
              <Card.Img variant="top" src="../images/RMHC.jpeg" />
              <Card.Text className="text-center fredoka-one goals">
                Ronald McDonald House Charities
              </Card.Text>
              <Card.Footer>
                <small className="text-muted">100 points</small>
                <Button className="float-end" size="sm">Claim</Button>
              </Card.Footer>
            </Card>
            <Card style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'lightgray', borderRadius: 5.5 }}>
              <Card.Img variant="top" src="../images/ACS.png" />
              <Card.Text className="text-center fredoka-one goals">
                American Cancer Society
              </Card.Text>
              <Card.Footer>
                <small className="text-muted">100 points</small>
                <Button className="float-end" size="sm">Claim</Button>
              </Card.Footer>
            </Card>
            <Card style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'lightgray', borderRadius: 5.5 }}>
              <Card.Img variant="top" src="../images/LLS.png" />
              <Card.Text className="text-center fredoka-one goals">
                Leukemia & Lymphoma Society
              </Card.Text>
              <Card.Footer>
                <small className="text-muted">100 points</small>
                <Button className="float-end" size="sm">Claim</Button>
              </Card.Footer>
            </Card>
          </CardGroup>
        </Tab>
      </Tabs>
    </Card>
  );
};

export default StoreNavigation;
