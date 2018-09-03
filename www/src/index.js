import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'moment/locale/zh-tw';
import reducers from './reducers';
import { addEvent } from './redux/events';
import { addGroup } from './redux/groups';
import './index.css';
import App from './App';

import BigCalendar from 'react-big-calendar'
import moment from 'moment'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

fetch('https://api.github.com/repos/TGmeetup/tgmeetup.js/issues?labels=Event&state=open')
  .then(res => res.json())
  .then(issues => issues.map(issue => {
    const reDetailText = /<details>((?:.|[\r\n])*?)<\/detail>/gm;
    const { body } = issue;

    const eventStr = reDetailText.exec(body)[1];
    const event = JSON.parse(unescape(eventStr));

    return {
      ...event,
      ...issue,
    };
  }))
  .then(events => {
    const isGroupFetched = new Set();

    events.forEach(event => {
      store.dispatch(addEvent(event));

      if (!isGroupFetched.has(event.groupRef)) {
        isGroupFetched.add(event.groupRef);

        fetch(`https://raw.githubusercontent.com/TGmeetup/TGmeetup/master/${event.groupRef}/package.json`)
          .then(res => res.json())
          .then(group => store.dispatch(addGroup(event.groupRef, group)))
      }

    });
  });

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
