export {
  addEvent,
  toggleEvent,
  activeOnlyOneEvent,
  getEvents,
  sortEvents,
} from './modules/events';
export {
  toggleOnlyOneMarker,
  toggleMarker,
  activeOnlyOneMarker,
  sortEventsInMarker,
  clearMarker,
} from './modules/markers';
export { getCategories } from './modules/categories';
export { toggleFilter } from './modules/filters';
export { addGroup, getGroups } from './modules/groups';

export const ADD_ENTITIES = 'ADD_ENTITIES';

export const addEntities = (entities) => ({
  type: ADD_ENTITIES,
  entities
})
