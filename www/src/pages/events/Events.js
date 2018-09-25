import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { GoGitCommit } from 'react-icons/go';
import styled from 'styled-components';
import { selectEvents } from '../../redux/selectors';
import Card from '../../components/Card';
import withFadeIn from '../../components/withFadeIn';

const NonStyleLink = styled(Link)`
  color: initial;
  text-decoration: none;
`

const View = ({ events, ...rests }) => (
  <Grid style={{ marginTop: '1em' }}>
    <Card>
      <Card.Title color="lightgreen">
        <h2>All Events</h2>
      </Card.Title>
      <Card.Content>
      { events.map(e => (
        <Card.Item key={e.id}>
          <NonStyleLink to={`/events/${e.id}`}>
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
          </NonStyleLink>
        </Card.Item>
      ))}
      </Card.Content>
    </Card>
  </Grid>
)

const mapStateToProps = (state) => ({
  events: selectEvents(state.events.allIds, state),
})

export default withFadeIn(connect(mapStateToProps)(View));
