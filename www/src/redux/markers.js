import { mapValues } from 'lodash';
import randomColor from 'randomcolor';
import { ADD_EVENT, getEvents, sortEvents } from './events';

export const ACTIVE_ONLY_ONE_MARKER = 'ACTIVE_ONLY_ONE_MARKER';
export const TOGGLE_MARKER = 'TOGGLE_MARKER';
export const TOGGLE_ONLY_ONE_MARKER = 'TOGGLE_ONLY_ONE_MARKER';
export const CLEAR_MARKER = 'CLEAR_MARKER';
export const SORT_EVENTS_IN_MARKER = 'SORT_EVENTS_IN_MARKER';

const marker = (state, action, globalState) => {
  switch (action.type) {
    case ADD_EVENT:
      state = state || {
        id: action.payload.latlngStr,
        latlng: action.payload.geocode,
        events: [],
        isSelected: false,
        color: randomColor({ luminosity: 'dark' })
      };

      return (state.id === action.payload.latlngStr)
        ? {
            ...state,
            events: [ ...state.events, action.payload.id],
          }
        : state;

    case TOGGLE_MARKER:
      return (state.id === action.id)
        ? {
            ...state,
            isSelected: !state.isSelected,
          }
        : state;
    case ACTIVE_ONLY_ONE_MARKER:
      return {
        ...state,
        isSelected: (state.id === action.id),
      };
    case TOGGLE_ONLY_ONE_MARKER:
      return {
        ...state,
        isSelected: (state.id === action.id)
          ? !state.isSelected
          : false,
      };
    case CLEAR_MARKER:
      return {
        ...state,
        isSelected: false,
      }
    case SORT_EVENTS_IN_MARKER:
      console.log(globalState);
      const { events } = globalState;
      return {
        ...state,
        events: sortEvents({
          ...events,
          allIds: state.events,
        })
      };
    default:
      return state;
  }
}

const byId = (state = {}, action, globalState) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        [action.payload.latlngStr]: marker(state[action.payload.latlngStr], action),
      }
    case TOGGLE_MARKER:
      return {
        ...state,
        [action.id]: marker(state[action.id], action),
      }
    case ACTIVE_ONLY_ONE_MARKER:
    case TOGGLE_ONLY_ONE_MARKER:
    case CLEAR_MARKER:
    case SORT_EVENTS_IN_MARKER:
      return mapValues(state, (m) => marker(m, action, globalState));
    default:
      return state;
  }
}

const allIds = (state = [], action, byId) => {
  switch (action.type) {
    case ADD_EVENT:
      return (state.indexOf(action.payload.latlngStr) < 0)
        ? [ ...state, action.payload.latlngStr ]
        : state;
    default:
      return state;
  }
}

export default (state = {}, action, globalState) => ({
  byId: byId(state.byId, action, globalState),
  allIds: allIds(state.allIds, action, byId),
})

export const extractMarkers = ({ markers, events }) =>
  markers.allIds.map(id => ({
    ...markers.byId[id],
    events: getEvents({
      ...events,
      allIds: markers.byId[id].events,
      })
  }));

export const toggleOnlyOneMarker = (id) => ({
  type: TOGGLE_ONLY_ONE_MARKER,
  id,
})

export const toggleMarker = (id) => ({
  type: TOGGLE_MARKER,
  id,
})

export const activeOnlyOneMarker = (id) => ({
  type: ACTIVE_ONLY_ONE_MARKER,
  id,
})

export const sortEventsInMarker = () => ({
  type: SORT_EVENTS_IN_MARKER
})

export const clearMarker = () => ({
  type: CLEAR_MARKER,
})
