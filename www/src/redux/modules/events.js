import { normalize, denormalize } from 'normalizr';
import { mapValues, merge, includes } from 'lodash';

import * as schema from '../../apis/schema';
import { ADD_ENTITIES, addEntities } from '../actions';

export const TOGGLE_EVNET = 'TOGGLE_EVENT';
export const ACTIVE_ONLY_ONE_EVENT = 'ACTIVE_ONLY_ONE_EVENT';
export const TOGGLE_EVENT_FILTER = 'TOGGLE_EVENT_FILTER';
export const CLEAR_EVENT_FILTER = 'CLEAR_EVENT_FILTER';

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

const filters = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_EVENT_FILTER:
      Object.keys(action.filter).forEach(field => {
        if (field in state && state[field] === action.filter[field]) {
          delete state[field]
        } else {
          state[field] = action.filter[field];
        }
      });
      return { ...state };
    case CLEAR_EVENT_FILTER:
      return {};
    default:
      return state;
  }
}

export default (state = {}, action) => {
  const nextById = byId(state.byId, action);
  return {
    byId: nextById,
    allIds: allIds(state.allIds, action, nextById),
    filters: filters(state.filters, action),
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

export const toggleEventFilter = (filter) => ({
  type: TOGGLE_EVENT_FILTER,
  filter,
})

export const clearEventFilter = () => ({
  type: CLEAR_EVENT_FILTER,
})

export const selectEvents = (ids, state) => {
  const { filters } = state.events;

  return denormalize(ids, [ schema.event ], schema.entities(state))
    .filter(event =>
      includes(event.name.toLowerCase(), (filters.name || '').toLowerCase())
    );
}

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
