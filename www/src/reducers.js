import events from './redux/events';
import markers from './redux/markers';
import groups from './redux/groups';

import { ADD_EVENT } from './redux/events';
import { ADD_GROUP } from './redux/groups';

export default (state = {}, action) => ({
  events: events(state.events, action, state),
  markers: markers(state.markers, action, state),
  groups: groups(state.groups, action, state),
})
