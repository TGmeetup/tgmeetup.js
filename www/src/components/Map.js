import { map } from 'lodash'
import React, { Component } from 'react';
import styled from 'styled-components';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import GoLink from 'react-icons/lib/io/link';
import GoClock from 'react-icons/lib/go/clock';
import GoLocation from 'react-icons/lib/go/location';
import {
  EventWrapper, EventTitle, EventContent, EventItem,
  ListWrapper,
} from './Map.styled';
import { extractEventsByLatlng, toggleOneMark, clearMark } from '../redux/latlngs';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDUl-ub3O_XrUZ71artT6KIksNxSJmKn1U';

const Event = ({ event }) => (
  <EventWrapper>
    <EventTitle
      color={event.color}
    >
      <a
        href={event.link}
        target="_blank"
      >
        {event.name}
      </a>
    </EventTitle>
    <EventContent>
      <EventItem>
        <GoLink />
        {' '}
        <a
          href={event.link}
          target="_blank"
        >
          {event.link}
        </a>
      </EventItem>
      <EventItem>
      <GoClock />
        {' '}
        {event.moment.calendar()}
      </EventItem>
      <EventItem>
        <GoLocation />
        {' '}
        { event.location.length <= 1 && (
          event.local_city
        )}
        { event.location.length > 1 && (
          `${event.location}, ${event.local_city}`
        )}
      </EventItem>
    </EventContent>
  </EventWrapper>
);

const PlainList = ({ events, className }) => (
  <ListWrapper>
  { events.map(event => (
    <p key={event.id}>{event.name}</p>
  ))}
  </ListWrapper>
)

const List = styled(PlainList)`
  background: red;
  width: 400px;
`

class MapView extends Component {
  render() {
    const { eventGroups } = this.props;
    const { toggleOne, clear } = this.props;

    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 23.903687, lng: 121.07937 }}
        onClick={() => clear()}
        ref={mapRef => {
          this.map = mapRef;
        }}
      >
        { map(eventGroups, ({ events, selected }, latlngStr) => (
          <Marker
            key={latlngStr}
            position={events[0].geocode}
            onClick={() => toggleOne(latlngStr)}
          >
          { selected && (
            <InfoBox
              options={{ closeBoxURL: ``}}
            >
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
  toggleOne: (latlngStr) => {
    dispatch(toggleOneMark(latlngStr));
  },
  clear: () => {
    dispatch(clearMark());
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
