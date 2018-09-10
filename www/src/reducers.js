import events from './redux/events';
import markers from './redux/markers';
import groups from './redux/groups';

export default (state = {}, action) => ({
  events: events(state.events, action, state),
  markers: markers(state.markers, action, state),
  groups: groups(state.groups, action, state),
})
