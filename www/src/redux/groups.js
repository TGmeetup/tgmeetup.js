import { map, filter } from 'lodash';
import { ADD_EVENT } from './events';
import randomColor from 'randomcolor';

export const ADD_GROUP = 'ADD_GROUP';

const group = (state, action, globalState) => {
  const { events } = globalState;
  switch (action.type) {
    case ADD_GROUP:
      return {
        ...action.group,
        events: events.allIds.filter(id => events.byId[id].groupRef === action.id),
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

export const extractGroups = ({ events, groups }) =>
  groups.allIds.map(id => ({
    ...groups.byId[id],
    events: groups.byId[id].events.map(id => events.byId[id])
  }));

export const addGroup = (id, group) => ({
  type: ADD_GROUP,
  id,
  group: {
    id,
    ...group,
    color: randomColor({ luminosity: 'dark' })
  },
})
