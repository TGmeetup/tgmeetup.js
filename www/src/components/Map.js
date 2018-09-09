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
import { GoGitCommit, GoX } from 'react-icons/go';
import Card from './Card';
import Event from './Event'
import { ShiftedContainer } from './UnsortedComponents';
import { toggleEvent } from '../redux/events'

import {
  extractMarkers,
  toggleOnlyOneMarker,
  toggleMarker
} from '../redux/markers';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDUl-ub3O_XrUZ71artT6KIksNxSJmKn1U';

const List = ({
  zoom,
  color,
  events,
  onEventClick,
  onEventCloseClick,
  onCloseClick
}) => (
  <Card width='400px'>
    <Card.Title color={color}>
      <GoX onClick={() => onCloseClick()} />
      <h2>
        Events on
        {' '}
        { events[0].location.length > 1
          ? events[0].location
          : events[0].local_city
        }
      </h2>
    </Card.Title>
    <Card.Content>
    { events.map(event => (
      <Card.Item
        key={event.id}
        onClick={() => onEventClick(event)}
      >
        <GoGitCommit />
        {event.moment.calendar()}
        {' '}
        <b>{event.name}</b>
      </Card.Item>
    ))}
    </Card.Content>
    { events.filter(e => e.isSelected).map((event, i) => (
      <ShiftedContainer
        key={event.id}
        top={`${(i + 1) * 20}px`}
        left={`${(i + 1) * 20}px`}
      >
        {/* <EventWrapper> */}
          <Event
            event={event}
            onCloseClick={() => onEventClick(event)}
          />
        {/* </EventWrapper> */}
      </ShiftedContainer>
    ))}
  </Card>
)

class MyMap extends Component {
  state = {
    zoom: 8,
  }

  constructor(props) {
    super(props);

    this.handleZoomChanged = this.handleZoomChanged.bind(this)
  }

  handleZoomChanged(zoom) {
    this.setState({ zoom: zoom || this.map.getZoom() })
  }

  render() {
    const { markers } = this.props;
    const { toggleOnlyOneMarker, toggleEvent } = this.props;

    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 23.903687, lng: 121.07937 }}
        zoom={ this.state.zoom }
        onZoomChanged={this.handleZoomChanged}
        ref={mapRef => {
          this.map = mapRef;
        }}
      >
      { markers.map(({ id, events, isSelected, latlng, color }) => (
        <Marker
          key={id}
          position={latlng}
          onClick={() => toggleOnlyOneMarker(id)}
        >
        { isSelected && (
          <InfoBox
            options={{
              pane: 'mapPane',
              closeBoxURL: ``,
              enableEventPropagation: true,
              boxStyle: { overflow: 'initial' }
            }}
          >
            <List
              color={color}
              events={events}
              onEventClick={(event) => toggleEvent(event)}
              onCloseClick={() => toggleOnlyOneMarker(id)}
              toggle={(event) => toggleMarker({id, event})}
            />
          </InfoBox>
        )}
        </Marker>
      ))}
      </GoogleMap>
    )
  }
}

const mapStateToProps = state =>  ({
  markers: extractMarkers(state)
});

const mapDispatchToProps = (dispatch) => ({
  toggleOnlyOneMarker: (id) => {
    dispatch(toggleOnlyOneMarker(id));
  },
  toggleEvent: (event) => {
    dispatch(toggleEvent(event));
  },
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
)(MyMap);
