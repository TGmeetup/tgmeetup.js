import 'moment/locale/zh-tw';
import { Provider } from 'react-redux';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import React from 'react';
import ReactDOM from 'react-dom';

import { getGroups, getEvents } from './redux/actions';
import App from './App';
import store from './redux';

import './index.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

store.dispatch(getGroups(undefined));
store.dispatch(getEvents());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
