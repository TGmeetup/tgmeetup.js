import { map, mapValues } from 'lodash';
import { ADD_EVENT } from './events';

export const ACTIVE_ONE_MARK = 'ACTIVE_ONE_MARK';
export const TOGGLE_ONE_MARK = 'TOGGLE_ONE_MARK';
export const TOGGLE_MARK = 'TOGGLE_MARK';
export const CLEAR_MARK = 'CLEAR_MARK';


export default (state = {}, action) => {
  switch (action.type) {
    case ADD_EVENT:
      const latlngStr = JSON.stringify(action.payload.geocode);
      return {
        ...state,
        [latlngStr]: {
          events: {
            ...(state[latlngStr] && state[latlngStr].events),
            [action.payload.id]: true,
          },
          selected: false,
        },
      };
    case ACTIVE_ONE_MARK:
      return mapValues(state, (group, latlngStr) => ({
        ...group,
        selected: (latlngStr === action.payload)
          ? true
          : false,
      }));
    case TOGGLE_MARK:
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          selected: !state[action.payload].selected,
        },
      };
    case TOGGLE_ONE_MARK:
      return mapValues(state, (group, latlngStr) => ({
        ...group,
        selected: (latlngStr === action.payload)
          ? !group.selected
          : false,
      }));
    case CLEAR_MARK:
      return mapValues(state, group => ({
        ...group,
        selected: false,
      }))
    default:
      return state;
  }
}

export const extractEventsByLatlng = ({ latlngs, events }) =>
  mapValues(latlngs, group => ({
    ...group,
    events: map(group.events, (_, id) => events[id]),
  }));

export const activeOneMark = (latlngStr) => ({
  type: ACTIVE_ONE_MARK,
  payload: latlngStr,
})

export const toggleMark = (latlngStr) => ({
  type: TOGGLE_MARK,
  payload: latlngStr,
})

export const toggleOneMark = (latlngStr) => ({
  type: TOGGLE_ONE_MARK,
  payload: latlngStr,
})

export const clearMark = () => ({
  type: CLEAR_MARK,
})
