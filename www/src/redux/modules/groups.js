import { normalize } from 'normalizr';
import { some, mapValues, keys, uniq } from 'lodash';
import randomColor from 'randomcolor';

import { ADD_ENTITIES } from '../actions';
import { addEntities } from '../actions';
import { extractGroups } from '../../apis/schema';

export const ADD_GROUP = 'ADD_GROUP';

const shimGroupColor = (group) => {
  switch (group.name) {
    case 'MOPCON':
      return '#010135';
    case 'WoFOSS':
      return '#00eac8';
    case 'JCConf':
      return '#3433B1';
    case 'CNTUG':
      return '#BCBCBC';
    case 'elixirTW':
      return '#550062';
    case 'hcsm':
      return '#00A79A';
    case 'AgileCommunity.tw':
      return '#353535';
    case 'hackingthursday':
      return '#C99956';
    case 'PyHUG':
      return '#00FF00';
    case 'DigitalOceanHsinchu':
      return '#4556FF';
    default:
      return randomColor({ luminosity: 'dark' });
  }
}

const group = (state, action, globalState) => {
  switch (action.type) {
    case ADD_ENTITIES: {
      const { events } = globalState;
      return {
        ...state,
        events: [
          ...state.events,
          ...events.allIds.filter(id => events.byId[id].group === state.id),
        ],
        color: shimGroupColor(group),
      }
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
        ...mapValues(action.entities.groups, g => group(g, action, globalState)),
      };
    default:
      return state;
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case ADD_ENTITIES:
      return uniq([ ...state, ...keys(action.entities.groups) ]);
    default:
      return state;
  }
}

export default (state = {}, action, globalState) => ({
  byId: byId(state.byId, action, globalState),
  allIds: allIds(state.allIds, action),
})

export const selectGroups = (state) =>
  extractGroups(
    state.groups.allIds.filter(
      id => some([ state.groups.byId[id] ], state.filters)
    ),
    state,
  );

export const addGroup = (id, group) => ({
  type: ADD_GROUP,
  id,
  group: {
    id,
    ...group,
    color: shimGroupColor(group),
  },
})

export const getGroups = (groups) => (dispatch) =>
  Promise.all(groups.map(group => dispatch(getGroup(group))));

export const getGroup = (group) => (dispatch, getState, { api, schema }) =>
  api.fetchGroup(group)
    .then(group => {
      const data = normalize(group, schema.group);
      dispatch(addEntities(data.entities));
      return group;
    });
