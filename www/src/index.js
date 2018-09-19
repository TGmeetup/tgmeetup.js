import 'moment/locale/zh-tw';
import { createStore } from 'redux';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import React from 'react';
import ReactDOM from 'react-dom';

import { addEvent } from './redux/events';
import { addGroup } from './redux/groups';
import { fetchCategories } from './apis/fetch';
import { ghFetch as fetch } from './apis';
import { normalizeCategories } from './normalizr';
import { sortEventsInMarker } from './redux/markers';
import App from './App';
import reducers, { addEntities } from './redux';

import './index.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

fetchCategories()
  .then(categories => normalizeCategories(categories))
  .then(normalizedData => store.dispatch(addEntities(normalizedData.entities)))

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
    events.forEach(event => {
      store.dispatch(addEvent(event));
    });

    store.dispatch(sortEventsInMarker());
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
