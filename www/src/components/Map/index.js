import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";

import * as actions from '../../redux/actions';
import { selectMarkers } from '../../redux/selectors';

import List from './List';

export const GOOGLE_MAPS_API_KEY = 'AIzaSyDUl-ub3O_XrUZ71artT6KIksNxSJmKn1U';

 // Map is reserve word
const _Map = ({
  zoomToStreet = false,
  center = { lat: 23.903687, lng: 121.07937 },
  markers = [],
  toggleOnlyOneMarker,
  ...restProps
}) => (
  <GoogleMap
    defaultZoom={zoomToStreet ? 15 : 8}
    defaultCenter={center}
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
          closeBoxURL: ``,
          enableEventPropagation: true,
          boxStyle: { overflow: 'initial' }
        }}
      >
        <List
          color={color}
          events={events}
          {...restProps}
          onCloseClick={() => toggleOnlyOneMarker(id)}
        />
      </InfoBox>
    )}
    </Marker>
  ))}
  </GoogleMap>
)

_Map.displayName = 'Map';

const BindedMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(_Map);

export const PlainMap = connect(undefined, actions)(BindedMap);

const mapStateToProps = state =>  ({
  markers: selectMarkers(state.markers.allIds, state),
});

export default connect(mapStateToProps, actions)(BindedMap);
