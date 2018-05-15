import { map } from 'lodash'
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
import GoLink from 'react-icons/lib/go/link';
import GoClock from 'react-icons/lib/go/clock';
import GoCommit from 'react-icons/lib/go/git-commit';
import GoLocation from 'react-icons/lib/go/location';
import GoX from 'react-icons/lib/go/x';
import GoLeft from 'react-icons/lib/go/chevron-left';
import {
  EventWrapper, EventTitle, EventContent, EventItem,
  ListWrapper
} from './Map.styled';
import {
  extractEventsByLatlng,
  toggleOneMark,
  toggleEvent
} from '../redux/latlngs';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDUl-ub3O_XrUZ71artT6KIksNxSJmKn1U';

const Event = ({ event, onCloseClick, ControlIcon }) => (
  <EventWrapper>
    <EventTitle
      color={event.color}
    >
      <ControlIcon onClick={() => onCloseClick(event)} />
      <h2>
        <a
          href={event.link}
          target="_blank"
        >
          {event.name}
        </a>
      </h2>
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

const List = ({events, className, toggle, onCloseClick }) => (
  <ListWrapper>
    <EventTitle
      color={events[0].color}
    >
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
        onClick={() => toggle(event)}
      >
        <GoCommit />
        {event.moment.calendar()}
        {' '}
        <b>{event.name}</b>
      </EventItem>
    ))}
    </EventContent>
  </ListWrapper>
)

class MapView extends Component {
  render() {
    const { eventGroups } = this.props;
    const { toggleOne, toggle } = this.props;

    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 23.903687, lng: 121.07937 }}
        ref={mapRef => {
          this.map = mapRef;
        }}
      >
        { map(eventGroups, ({ events, selected, selectEvent }, latlngStr) => (
          <Marker
            key={latlngStr}
            position={events[0].geocode}
            onClick={() => toggleOne(latlngStr)}
          >
          { selected && (
            <InfoBox
              options={{
                closeBoxURL: ``,
                enableEventPropagation: true
              }}
            >
            { selectEvent
              ? <Event
                  event={selectEvent}
                  onCloseClick={events.length > 1
                    ? (event) => toggle({latlngStr, event})
                    : (event) => toggleOne(latlngStr)}
                  ControlIcon={events.length > 1 ? GoLeft : GoX}
                />
              : <List
                  events={events}
                  toggle={(event) => toggle({latlngStr, event})}
                  onCloseClick={() => toggleOne(latlngStr)}
                />
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
  toggle: ({ latlngStr, event }) => {
    dispatch(toggleEvent({ latlngStr, event }));
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
