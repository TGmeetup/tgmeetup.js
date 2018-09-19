import 'moment/locale/zh-tw';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import React from 'react';
import ReactDOM from 'react-dom';

import { addEvent, addEntities, sortEventsInMarker } from './redux/actions';
import { fetchCategories } from './apis/fetch';
import { ghFetch as fetch } from './apis';
import { normalizeCategories } from './apis/schema';
import App from './App';
import store from './redux';

import './index.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

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
