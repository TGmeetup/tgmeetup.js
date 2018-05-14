import { map, last } from 'lodash'
import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { extractEventsByLatlng, toggleMark } from '../redux/latlngs';
import { withGroupRefPrefix }from '../ultis';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDUl-ub3O_XrUZ71artT6KIksNxSJmKn1U';

const Event = ({ event, className }) => (
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
            href={event.url}
            target="_blank"
          >
            {event.url}
          </a>
        </p>
      </Col>
    </Row>
  </Grid>
);

const List = ({ events }) => (
  <div>
  { events.map(event => (
    <p key={event.id}>{event.name}</p>
  ))}
  </div>
)

class MapView extends Component {
  render() {
    const { eventGroups } = this.props;
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
        { map(eventGroups, ({ events, selected }, latlngStr) => (
          <Marker
            key={latlngStr}
            position={events[0].geocode}
            onClick={() => toggle(latlngStr)}
          >
          { selected && (
            <InfoBox>
            { events.length === 1
              ? <Event event={events[0]} />
              : <List events={events} />
            }
            </InfoBox>
          )}
          </Marker>
        ))}
      </GoogleMap>
    )
  }
}

const mapStateToProps = state =>  ({
  eventGroups: extractEventsByLatlng(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggle: (latlngStr) => {
    dispatch(toggleMark(latlngStr));
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
