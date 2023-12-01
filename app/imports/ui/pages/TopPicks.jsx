import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import { Foods } from '../../api/fooditems/Foods';
import LoadingSpinner from '../components/LoadingSpinner';
import '../../../client/styles/cards.css';
import '../../../client/style.css';

const TopPicks = () => {
  const { ready, topPicks } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    const topPicksSubscription = Meteor.subscribe('topPicks');
    // Determine if the subscription is ready
    const rdy = (topPicksSubscription.ready());
    // Get the top picks documents
    const fooditems = Foods.collection.find({ isTopPick: true }).fetch();
    return {
      topPicks: fooditems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="card-pages">
      <Row>
        <Col>
          <h1 className="h1-food-card">Today&rsquo;s Top Picks</h1>
          <CardGroup>
            {topPicks.map(fooditem => (
              <Card key={fooditem._id} className="food-card">
                <Card.Body>
                  <Card.Title>{fooditem.name}</Card.Title>
                  <Card.Text>
                    {/* Additional details like description, cuisine type */}
                    Where: {fooditem.vendor}
                  </Card.Text>
                  <Card.Text>
                    Type: {fooditem.cuisineType}
                  </Card.Text>
                  <Card.Text>
                    {fooditem.availability}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </CardGroup>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default TopPicks;
