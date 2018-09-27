import React from 'react';
import { compose, withProps, withState } from 'recompose';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";

import List from './List';

export const GOOGLE_MAPS_API_KEY = 'AIzaSyDUl-ub3O_XrUZ71artT6KIksNxSJmKn1U';

 // Map is reserve word
const _Map = ({
  zoomToStreet = false,
  center = { lat: 23.903687, lng: 121.07937 },
  markers = [],
  activeMarkerId,
  setActiveMarkerId,
}) => (
  <GoogleMap
    defaultZoom={zoomToStreet ? 15 : 8}
    defaultCenter={center}
  >
  { markers.map(({ id, events, latlng, color }) => (
    <Marker
      key={id}
      position={latlng}
      onClick={() => setActiveMarkerId(() => id)}
    >
    { events && (activeMarkerId === id) && (
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
        />
      </InfoBox>
    )}
    </Marker>
  ))}
  </GoogleMap>
)

_Map.displayName = 'Map';

export const PlainMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  withState('activeMarkerId', 'setActiveMarkerId', null),
)(_Map);

export default PlainMap;
