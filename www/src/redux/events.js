import binarySearchInsert from 'binary-search-insert';
import * as moment from 'moment';
import randomColor from 'randomcolor'
import { mapValues } from 'lodash';

export const ADD_EVENT = 'ADD_EVNET';
export const TOGGLE_EVNET = 'TOGGLE_EVENT';
export const ACTIVE_ONLY_ONE_EVENT = 'ACTIVE_ONLY_ONE_EVENT';

const event = (state, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...action.payload,
        color: randomColor({ luminosity: 'dark' }),
        isSelected: false,
      }
    case TOGGLE_EVNET:
      return (state.id === action.payload.id)
        ? {
            ...state,
            isSelected: !state.isSelected,
          }
        : state;
    case ACTIVE_ONLY_ONE_EVENT:
      return {
          ...state,
          isSelected: (state.id === action.payload.id),
        }
    default:
      return state;
  }
}

const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        [action.payload.id]: event(undefined, action),
      }
    case TOGGLE_EVNET:
      return {
        ...state,
        [action.payload.id]: event(state[action.payload.id], action),
      }
    case ACTIVE_ONLY_ONE_EVENT:
      return mapValues(state, (e, idStr) => event(e, action));
    default:
      return state;
  }
}

let idToIndex = {};

const allIds = (state = [], action, byId) => {
  switch (action.type) {
    case ADD_EVENT:
      const nextState = state.slice();

      binarySearchInsert(nextState, (a, b) => (
        byId[a].moment - byId[b].moment
      ), action.payload.id);

      idToIndex = nextState.reduce((map, id, index) => ({
        ...map,
        [id]: index,
      }), {});

      return nextState;
    default:
      return state;
  }
}

export default (state = {}, action) => {
  const nextById = byId(state.byId, action);
  return {
    byId: nextById,
    allIds: allIds(state.allIds, action, nextById),
  };
}

export const addEvent = (event) => ({
  type: ADD_EVENT,
  payload: {
    ...event,
    moment: moment(event.datetime),
    latlngStr: JSON.stringify(event.geocode),
  },
})

export const toggleEvent = (event) => ({
  type: TOGGLE_EVNET,
  payload: event,
})

export const activeOnlyOneEvent = (event) => ({
  type: ACTIVE_ONLY_ONE_EVENT,
  payload: event,
})

export const getEvents = (state) =>
  state.allIds.map(id => state.byId[id]);
