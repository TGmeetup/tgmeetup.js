import { map, last } from 'lodash'
import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { toggleEvent } from '../redux/events';
import { withGroupRefPrefix }from '../ultis';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDUl-ub3O_XrUZ71artT6KIksNxSJmKn1U';

const EventInfo = ({ event, className }) => (
  <Grid className={className}>
    <Row>
      <Col xs={12}>
        <h1>{event.name}</h1>
        <p>
          <a
            href={event.link}
            target="_blank"
          >
            {event.link}
          </a>
        </p>
      </Col>
      <Col xs={6}>
        <h2>Location</h2>
        <p>
          {event.location}
          {' @ '}
          {event.local_city}
        </p>
      </Col>
      <Col xs={6}>
        <h2>Datetime</h2>
        <p>
          {event.datetime}
        </p>
      </Col>
      <Col xs={4}>
        <h2>Handler</h2>
        <p>
          <a
            href={withGroupRefPrefix(event.groupRef)}
            target="_blank"
          >
            {last(event.groupRef.split('/'))}
          </a>
        </p>
      </Col>
      <Col xs={8}>
        <h2>Comments</h2>
        <p>
          <a
            href={event.issue.url}
            target="_blank"
          >
            {event.issue.url}
          </a>
        </p>
      </Col>
    </Row>
  </Grid>
);

class MapView extends Component {
  render() {
    const { events } = this.props;
    const { toggle } = this.props;

    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 23.903687, lng: 121.07937 }}
        onClick={() => {}}
        ref={mapRef => {
          this.map = mapRef;
        }}
      >
        { events.map(event => (
          <Marker
            key={event.id}
            position={event.geocode}
            onClick={() => toggle(event)}
          >
            { event.selected &&
              <InfoWindow onCloseClick={() => toggle(event)}>
                <EventInfo event={event} />
              </InfoWindow>
            }
          </Marker>
        ))}
      </GoogleMap>
    )
  }
}

const mapStateToProps = state =>  ({
  events: map(state.events),
});

const mapDispatchToProps = (dispatch) => ({
  toggle: (event) => {
    dispatch(toggleEvent(event));
  }
})

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  connect(mapStateToProps, mapDispatchToProps),
)(MapView);
