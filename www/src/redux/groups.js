import { some } from 'lodash';
import randomColor from 'randomcolor';

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
  const { events } = globalState;
  switch (action.type) {
    case ADD_GROUP:
      return {
        ...action.group,
        events: events.allIds.filter(id => events.byId[id].group === action.id),
      };
    default:
      return state;
  }
}

const byId = (state = {}, action, globalState) => {
  switch (action.type) {
    case ADD_GROUP:
      return {
        ...state,
        [action.id]: group(undefined, action, globalState),
      };
    default:
      return state;
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case ADD_GROUP:
      return [ ...state, action.id];
    default:
      return state;
  }
}

export default (state = {}, action, globalState) => ({
  byId: byId(state.byId, action, globalState),
  allIds: allIds(state.allIds, action),
})

export const extractGroups = ({ events, groups, filters = {} }) =>
  groups.allIds
    .filter(
      id => some([ groups.byId[id] ], filters)
    )
    .map(id => ({
      ...groups.byId[id],
      events: groups.byId[id].events.map(id => events.byId[id])
    }));

export const addGroup = (id, group) => ({
  type: ADD_GROUP,
  id,
  group: {
    id,
    ...group,
    color: shimGroupColor(group),
  },
})
