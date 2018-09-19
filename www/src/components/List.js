import React from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { selectMarkers } from '../redux/selectors' ;
import Event from './Event'

const Container = styled.div`
  overflow-y: scroll;
`

const List = ({
  events,
  markers
}) => (
  <Container>
  { events.filter(e => e.isSelected).map(event => (
    <Event
      key={event.id}
      event={event}
    >
    </Event>
  ))}
  { events.filter(e => !e.isSelected).map(event => (
    <Event
      key={event.id}
      event={event}
    >
    </Event>
  ))}
  </Container>
)

const mapStateToProps = state =>  {
  const markers = selectMarkers(state)
  const activeMarkers = markers.filter(m => m.isSelected)
  const hasOnlyOneActiveMarker = activeMarkers.length === 1
    ? activeMarkers[0] : null;

  return {
    events: map(state.events),
    markers,
    hasOnlyOneActiveMarker
  }
};

const mapDispatchToProps = state => {

}

export default connect(mapStateToProps, mapDispatchToProps)(List);
