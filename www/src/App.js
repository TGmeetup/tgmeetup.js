import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import Header from './components/Header';
import MapView from './pages/MapView';
import GroupView from './pages/GroupView';
import EventsView from './pages/EventsView';

/* eslint-disable no-unused-expressions */
injectGlobal`
  a {
    color: #1464e8;
  }
`
/* eslint-enable no-unused-expressions */

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Redirect exact from='/' to='/map' />
          <Route path='/map' component={MapView} />
          <Route path='/group' component={GroupView} />
          <Route path='/events' component={EventsView} />
        </Switch>
      </div>
    );
  }
}

export default App;
