import { keys, map, mapValues } from 'lodash';
import { ADD_EVENT } from './events';

export const ACTIVE_ONE_MARK = 'ACTIVE_ONE_MARK';
export const TOGGLE_ONE_MARK = 'TOGGLE_ONE_MARK';
export const TOGGLE_MARK = 'TOGGLE_MARK';
export const CLEAR_MARK = 'CLEAR_MARK';
export const TOGGLE_EVENT = 'TOGGLE_EVENT';

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
          selectEvent: null,
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
      }));
    case TOGGLE_EVENT:
      return mapValues(state, (group, latlngStr) => ({
        ...group,
        selectEvent: (
          action.payload.latlngStr === latlngStr &&
          action.payload.event.id !== group.selectEvent
        )
          ? action.payload.event.id
          : null,
      }));
    default:
      return state;
  }
}

export const extractEventsByLatlng = ({ latlngs, events }) =>
  mapValues(latlngs, group => ({
    ...group,
    events: map(group.events, (_, id) => events[id])
      .sort((e1, e2) => e1.moment - e2.moment),
    selectEvent: group.selectEvent
      ? events[group.selectEvent]
      : keys(group.events).length <= 1
        ? events[keys(group.events)[0]]
        : null,
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

export const toggleEvent = ({ latlngStr, event }) => ({
  type: TOGGLE_EVENT,
  payload: {
    latlngStr,
    event,
  }
})
