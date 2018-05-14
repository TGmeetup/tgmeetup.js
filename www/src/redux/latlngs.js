import { map, mapValues } from 'lodash';
import { ADD_EVENT } from './events';

export const TOGGLE_MARK = 'TOGGLE_MARK';

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
    case TOGGLE_MARK:
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          selected: !state[action.payload].selected,
        },
      };
    default:
      return state;
  }
}

export const extractEventsByLatlng = ({ latlngs, events }) =>
  mapValues(latlngs, group => ({
    ...group,
    events: map(group.events, (_, id) => events[id]),
  }));

export const toggleMark = (latlngStr) => ({
  type: TOGGLE_MARK,
  payload: latlngStr,
})
