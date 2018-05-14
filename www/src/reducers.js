import { combineReducers } from 'redux';
import events from './redux/events';
import latlngs from './redux/latlngs';

export default combineReducers({
  events,
  latlngs,
});
