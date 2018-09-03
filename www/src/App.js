import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';
import Header, { headerHeight } from './components/Header';
import MapView from './components/Map';
import GroupView from './views/GroupView';
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
          <Switch>
            <Redirect exact from='/' to='/map/' />
            <Route path='/map/' component={MapView} />
            <Route path='/group/' component={GroupView} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
