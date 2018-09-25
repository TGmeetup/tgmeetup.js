import { mapValues, uniq, keys } from 'lodash';
import { denormalize } from 'normalizr';
import randomColor from 'randomcolor';
import * as schema from '../../apis/schema';
import { ADD_ENTITIES } from '../actions';

export const ACTIVE_ONLY_ONE_MARKER = 'ACTIVE_ONLY_ONE_MARKER';
export const TOGGLE_MARKER = 'TOGGLE_MARKER';
export const TOGGLE_ONLY_ONE_MARKER = 'TOGGLE_ONLY_ONE_MARKER';
export const CLEAR_MARKER = 'CLEAR_MARKER';

const marker = (state, action, globalState) => {
  switch (action.type) {
    case ADD_ENTITIES:
      return {
        ...state,
        isSelected: false,
        color: randomColor({
          luminosity: 'dark',
          seed: state.id,
        }),
      };
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
    default:
      return state;
  }
}

const byId = (state = {}, action, globalState) => {
  switch (action.type) {
    case ADD_ENTITIES:
      return {
        ...state,
        ...mapValues(action.entities.markers, m => marker(m, action)),
      };
    case TOGGLE_MARKER:
      return {
        ...state,
        [action.id]: marker(state[action.id], action),
      }
    case ACTIVE_ONLY_ONE_MARKER:
    case TOGGLE_ONLY_ONE_MARKER:
    case CLEAR_MARKER:
      return mapValues(state, (m) => marker(m, action, globalState));
    default:
      return state;
  }
}

const allIds = (state = [], action, byId) => {
  switch (action.type) {
    case ADD_ENTITIES:
      return uniq([ ...state, ...keys(action.entities.markers) ]);
    default:
      return state;
  }
}

export default (state = {}, action, globalState) => ({
  byId: byId(state.byId, action, globalState),
  allIds: allIds(state.allIds, action, byId),
})

export const selectMarkers = (ids, state) =>
  denormalize(ids, [ schema.marker ], schema.entities(state));

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
export const clearMarker = () => ({
  type: CLEAR_MARKER,
})
