import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import Header, { headerHeight } from './components/Header';
import Map from './components/Map';

/* eslint-disable no-unused-expressions */
injectGlobal`
  a {
    color: #1464e8;
  }
`
/* eslint-enable no-unused-expressions */

const MapContainer = styled.div`
  height: calc(100vh - ${headerHeight});
`

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MapContainer>
          <Map />
        </MapContainer>
      </div>
    );
  }
}

export default App;
