import 'moment/locale/zh-tw';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import React from 'react';
import ReactDOM from 'react-dom';

import { getCategories, getEvents } from './redux/actions';
import App from './App';
import store from './redux';

import './index.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

store.dispatch(getCategories(undefined, true));
store.dispatch(getEvents());

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
