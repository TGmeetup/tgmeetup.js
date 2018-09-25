import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import Header from './components/Header';
import MapView from './pages/MapView';
import GroupView from './pages/GroupView';
import EventRoute from './pages/events';

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
      <HashRouter>
        <div>
          <Header />
          <Switch>
            <Redirect exact from='/' to='/map' />
            <Route path='/map' component={MapView} />
            <Route path='/group' component={GroupView} />
            <Route path='/events' component={EventRoute} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
