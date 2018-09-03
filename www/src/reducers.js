import events from './redux/events';
import markers from './redux/markers';
import groups from './redux/groups';

import { ADD_EVENT } from './redux/events';
import { ADD_GROUP } from './redux/groups';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        events: events(state.events, action),
        markers: markers(state.markers, action, state.events),
        groups: groups(state.groups, action, state.events),
      }
    case ADD_GROUP:
      return {
        events: events(state.events, action),
        markers: markers(state.markers, action, state.events),
        groups: groups(state.groups, action, state.events),
      }
    default:
      return {
        events: events(state.events, action),
        markers: markers(state.markers, action),
        groups: groups(state.groups, action),
      }
  }
}
