import { normalize } from 'normalizr';
import { mapValues, merge } from 'lodash';

import { ADD_ENTITIES, addEntities } from '../actions';

export const TOGGLE_EVNET = 'TOGGLE_EVENT';
export const ACTIVE_ONLY_ONE_EVENT = 'ACTIVE_ONLY_ONE_EVENT';

const event = (state, action) => {
  switch (action.type) {
    case ADD_ENTITIES:
      return {
        ...state,
        color: state.color,
        isSelected: false,
      };
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
    case ADD_ENTITIES:
      return merge(
        mapValues(state, e => event(e, action)),
        mapValues(action.entities.events, e => event(e, action)),
      );
    case TOGGLE_EVNET:
      return {
        ...state,
        [action.payload.id]: event(state[action.payload.id], action),
      }
    case ACTIVE_ONLY_ONE_EVENT:
      return mapValues(state, e => event(e, action));
    default:
      return state;
  }
}

const allIds = (state = [], action, byId) => {
  switch (action.type) {
    case ADD_ENTITIES:
      return [
        ...state,
        ...(action.result.events || []),
      ];
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

export const toggleEvent = (event) => ({
  type: TOGGLE_EVNET,
  payload: event,
})

export const activeOnlyOneEvent = (event) => ({
  type: ACTIVE_ONLY_ONE_EVENT,
  payload: event,
})

export const selectEvents = (state) =>
  state.allIds.map(id => state.byId[id]);

export const getEvents = () => (dispatch, getState, { api, schema }) =>
  api.fetchEvents()
    .then(events => {
      const { groups } = getState();
      events.forEach(e => {
        e.color = (groups.byId[e.group] || {}).color || 'gray';
      })
      return events;
    })
    .then(events => {
      const data = normalize(events, [ schema.event ]);
      dispatch(addEntities(data.entities, { events: data.result }));
      return events;
    });
