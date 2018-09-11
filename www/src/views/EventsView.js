import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { GoGitCommit } from 'react-icons/go';
import { getEvents } from '../redux/events';
import Card from '../components/Card';

const View = ({ events, ...rests }) => (
  <Grid style={{ marginTop: '1em' }}>
    <Card>
      <Card.Title color="lightgreen">
        <h2>All Events</h2>
      </Card.Title>
      <Card.Content>
      { events.map(e => (
        <Card.Item key={e.id}>
          <Row middle="xs">
            <Col xs={1}><GoGitCommit /></Col>
            <Col xs={11}>
              <Row>
                <Col xs={6} md={2}><span>{e.moment.calendar()}</span></Col>
                <Col xs={6} last="md" md={5} style={{ textAlign: 'right' }}><span>{ e.location.trim() || e.local_city }</span></Col>
                <Col xs={12} md={5}><b>{ e.name }</b></Col>
              </Row>
            </Col>
          </Row>
        </Card.Item>
      ))}
      </Card.Content>
    </Card>
  </Grid>
)

const mapStateToProps = (state) => ({
  events: getEvents(state.events),
})

export default connect(mapStateToProps)(View);
