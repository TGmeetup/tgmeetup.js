import events from './events';
import filters from './filters';
import groups from './groups';
import markers from './markers';
import categories from './categories';

export const ADD_ENTITIES = 'ADD_ENTITIES';

export default (state = {}, action) => ({
  events: events(state.events, action, state),
  markers: markers(state.markers, action, state),
  groups: groups(state.groups, action, state),
  filters: filters(state.filters, action, state),
  categories: categories(state.categories, action, state),
})

export const addEntities = (entities) => ({
  type: ADD_ENTITIES,
  entities
})
