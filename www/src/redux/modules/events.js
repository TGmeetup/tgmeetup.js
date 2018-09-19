import binarySearchInsert from 'binary-search-insert';
import * as moment from 'moment';
import { mapValues } from 'lodash';
import { ADD_GROUP } from './groups';
import { sortEventsInMarker } from './markers';

export const ADD_EVENT = 'ADD_EVNET';
export const TOGGLE_EVNET = 'TOGGLE_EVENT';
export const ACTIVE_ONLY_ONE_EVENT = 'ACTIVE_ONLY_ONE_EVENT';

const event = (state, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...action.payload,
        color: 'gray',
        isSelected: false,
      }
    case ADD_GROUP:
      return (state.group === action.id)
      ? {
          ...state,
          color: action.group.color
        }
      : state;
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
    case ADD_GROUP:
      return mapValues(state, e => event(e, action));
    default:
      return state;
  }
}

const allIds = (state = [], action, byId) => {
  switch (action.type) {
    case ADD_EVENT:
      const nextState = state.slice();

      binarySearchInsert(nextState, (a, b) => (
        byId[a].moment - byId[b].moment
      ), action.payload.id);

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
    group: event.groupRef,
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

export const selectEvents = (state) =>
  state.allIds.map(id => state.byId[id]);

export const sortEvents = (state, ids) => {
  const idIndexMap = state.allIds.reduce((map, id, index) => ({
    ...map,
    [id]: index,
  }), {});

  return Object.values(
    ids.reduce(
      (map, id) => ({
        ...map,
        [idIndexMap[id]]: id,
      }),
      {})
  );
}

export const getEvents = () => (dispatch, getState, { api, schema }) =>
  fetch('https://api.github.com/repos/TGmeetup/tgmeetup.js/issues?labels=Event&state=open')
    .then(res => res.json())
    .then(issues => issues.map(issue => {
      const reDetailText = /<details>((?:.|[\r\n])*?)<\/detail>/gm;
      const { body } = issue;

      const eventStr = reDetailText.exec(body)[1];
      const event = JSON.parse(unescape(eventStr));

      return {
        ...event,
        ...issue,
      };
    }))
    .then(
      events => events.map(e => dispatch(addEvent(e)))
    )
    .then(_ => dispatch(sortEventsInMarker()));
