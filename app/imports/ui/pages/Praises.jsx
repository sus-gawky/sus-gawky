import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { PlusSquare } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import { Praise } from '../../api/praise/Praise';
import AddPraiseModal from '../components/AddPraiseForm';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders the Praises page for adding a document. */
const Praises = () => {
  const [emojiMap, setEmojiMap] = useState({});
  const [reactionShown, setReactionShown] = useState(false);
  const { praises, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Praise.userPublicationName);
    const rdy = subscription.ready();
    const document = Praise.collection.find().fetch();
    return {
      praises: document,
      ready: rdy,
    };
  });
  const handleEmojiSelect = (emoteIcon, praiseObj) => {
    const { native } = emoteIcon;
    const { _id, comment, category, dateCreated } = praiseObj;
    // eslint-disable-next-line no-prototype-builtins
    if (emojiMap.hasOwnProperty(native)) {
      setEmojiMap((prev) => ({ ...prev, [native]: prev[native] + 1 }));
    } else {
      setEmojiMap((prev) => ({ ...prev, [native]: 1 }));
    }
    Praise.collection.update({ _id }, { $set: { comment, category, dateCreated, emojiCounter: { praise: 2 } } }, (error) => {
      if (error) {
        console.log(error);
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Item added successfully', 'success');
      }
    });
  };
  const colorMatch = (type) => {
    const styles = {};
    switch (type) {
    case 'Shopping':
      styles.borderColor = 'orange';
      break;
    case 'Food':
      styles.borderColor = 'green';
      break;
    case 'Travel':
      styles.borderColor = 'blue';
      break;
    default:
      break;
    }
    return styles;
  };
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col>
            <AddPraiseModal />
          </Col>
          <Col>
            <Container style={{ backgroundColor: '#F5F5F5' }}>
              {praises.map((praise, index) => (
                <Card style={colorMatch(praise.category)} className="my-3" key={index}>
                  <Card.Body>
                    Date created: {praise.dateCreated ? praise.dateCreated.toLocaleDateString() : ''}
                  </Card.Body>
                  <Card.Body>
                    {praise.comment}
                    <PlusSquare
                      className="mx-4"
                      size={20}
                      style={{ cursor: 'pointer', useSelect: 'none' }}
                      onClick={() => {
                        setReactionShown(!reactionShown);
                      }}
                    />
                    {reactionShown && (
                      <Picker
                        data={data}
                        onEmojiSelect={(e) => {
                          handleEmojiSelect(e, praise);
                        }}
                      />
                    )}
                    <Row xs="auto">
                      <>
                        {Object.keys(emojiMap).map((emojiObj, key) => (
                          <Col key={key}>
                            {emojiObj}
                          </Col>
                        ))}
                      </>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Container>
          </Col>
        </Col>
      </Row>
    </Container>
  ) : (<LoadingSpinner />);
};

export default Praises;
