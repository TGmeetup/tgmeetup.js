import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { compose, withProps } from 'recompose';

import { GOOGLE_MAPS_API_KEY } from './Map';

const SingleMarkerMap = ({ geocodes }) => (
  <GoogleMap
    defaultCenter={geocodes[0]}
    zoom={15}
  >
  { geocodes.map((geocode, i) => (
    <Marker key={i} position={geocode} />
  ))}
  </GoogleMap>
)

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(SingleMarkerMap);
