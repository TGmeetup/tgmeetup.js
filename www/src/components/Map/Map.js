import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

import List from './List';

export default function TGmeetupMap({
  center = [ 23.903687, 121.07937 ],
  markers = [],
  isStreetLevel = false,
}) {
  return (
    <LeafletMap center={center} zoom={isStreetLevel ? 14 : 8} style={{ width: '100%', height: '100%' }}>
      <TileLayer
        url="	https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      { markers.map(({ id, events, latlng, color }) => (
        <Marker key={id} position={[ latlng.lat, latlng.lng ]}>
          { events && events.length > 0 && (
            <Popup closeButton={false}>
              <List color={color} events={events}  />
            </Popup>
          )}
        </Marker>
      ))}
    </LeafletMap>
  )
}
