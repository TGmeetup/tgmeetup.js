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
import GoCommit from 'react-icons/lib/go/git-commit';
import GoX from 'react-icons/lib/go/x';
import styled from 'styled-components';
import {
  EventTitle, EventContent, EventItem, EventWrapper,
  ListWrapper
} from './StyledComponents';
import Event from './Event'
import { toggleEvent } from '../redux/events'

import {
  extractMarkers,
  toggleOnlyOneMarker,
  toggleMarker
} from '../redux/markers';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDUl-ub3O_XrUZ71artT6KIksNxSJmKn1U';


const ShiftedContainer = styled.div`
  position: absolute;
  left: ${props => `${props.offset}px`};
  top: ${props => `${props.offset}px`};
`

const List = ({
  zoom,
  color,
  events,
  onEventClick,
  onEventCloseClick,
  onCloseClick
}) => (
  <ListWrapper zoom={zoom}>
    <EventTitle color={color}>
      <GoX onClick={() => onCloseClick()} />
      <h2>
        Events on
        {' '}
        { events[0].location.length > 1
          ? events[0].location
          : events[0].local_city
        }
      </h2>
    </EventTitle>
    <EventContent>
    { events.map(event => (
      <EventItem
        key={event.id}
        onClick={() => onEventClick(event)}
      >
        <GoCommit />
        {event.moment.calendar()}
        {' '}
        <b>{event.name}</b>
      </EventItem>
    ))}
    </EventContent>
    { events.filter(e => e.isSelected).map((event, i) => (
      <ShiftedContainer
        key={event.id}
        offset={(i + 1) * 20}
      >
        <EventWrapper>
          <Event
            event={event}
            onCloseClick={() => onEventClick(event)}
          />
        </EventWrapper>
      </ShiftedContainer>
    ))}
  </ListWrapper>
)

class MapView extends Component {
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
    const { markers, hasOnlyOneActiveMarker } = this.props;
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
      { markers.map(({ events, isSelected, latlng, latlngStr, color }) => (
        <Marker
          key={latlngStr}
          position={latlng}
          onClick={() => toggleOnlyOneMarker(latlngStr)}
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
              onCloseClick={() => toggleOnlyOneMarker(latlngStr)}
              toggle={(event) => toggleMarker({latlngStr, event})}
            />
          </InfoBox>
        )}
        </Marker>
      ))}
      </GoogleMap>
    )
  }
}

const mapStateToProps = state =>  {
  const markers = extractMarkers(state)
  const activeMarkers = markers.filter(m => m.isSelected)
  const hasOnlyOneActiveMarker = activeMarkers.length === 1
    ? activeMarkers[0] : null;

  return {
    markers,
    hasOnlyOneActiveMarker
  }
};

const mapDispatchToProps = (dispatch) => ({
  toggleOnlyOneMarker: (latlngStr) => {
    dispatch(toggleOnlyOneMarker(latlngStr));
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
)(MapView);
