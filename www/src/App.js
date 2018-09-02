import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import Header, { headerHeight } from './components/Header';
import Map from './components/Map';
import Calendar from './components/Calendar';

/* eslint-disable no-unused-expressions */
injectGlobal`
  a {
    color: #1464e8;
  }
`
/* eslint-enable no-unused-expressions */

const Container = styled.div`
  height: calc(100vh - ${headerHeight});
  display: flex;
  flex-wrap: nowrap;
  > * {
    flex-basis: 100%;
  }
`

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Container>
          <Map />
        </Container>
      </div>
    );
  }
}

export default App;
