import events from './redux/events';
import markers from './redux/markers';

import { ADD_EVENT } from './redux/events';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        events: events(state.events, action),
        markers: markers(state.markers, action, state.events)
      }
    default:
      return {
        events: events(state.events, action),
        markers: markers(state.markers, action)
      }
  }
}
