import { map } from 'lodash';
import { ADD_EVENT } from './events';
import randomColor from 'randomcolor';

export const ADD_GROUP = 'ADD_GROUP';

export default (state = {}, action, events) => {
  switch (action.type) {
    case ADD_GROUP: {
      const group = state[action.payload.ref] || {
        events: [],
        color: randomColor({ luminosity: 'dark' })
      };

      return {
        ...state,
        [action.payload.ref]: {
          ...group,
          ...action.payload.group,
        },
      };
    }

    case ADD_EVENT: {
      const group = state[action.payload.groupRef] || {
        events: [],
        color: randomColor({ luminosity: 'dark' })
      };

      return {
        ...state,
        [action.payload.groupRef]: {
          ...group,
          events: [
            ...group.events,
            action.payload.id,
          ]
        }
      };
    }

    default:
      return state;
  }
}

export const extractGroups = ({ events, groups }) =>
  map(groups, (group, ref) => ({
    ...group,
    ref,
    events: group.events.map(id => events[id])
  }))

export const addGroup = (ref, group) => ({
  type: ADD_GROUP,
  payload: { ref, group },
})
