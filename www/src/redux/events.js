import * as moment from 'moment';
import randomColor from 'randomcolor'
import { mapValues } from 'lodash';

export const ADD_EVENT = 'ADD_EVNET';
export const TOGGLE_EVNET = 'TOGGLE_EVENT';
export const ACTIVE_ONLY_ONE_EVENT = 'ACTIVE_ONLY_ONE_EVENT';

export default (state = {}, action) => {
  switch(action.type) {
    case ADD_EVENT:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          color: randomColor({ luminosity: 'dark' }),
          moment: moment(action.payload.datetime),
          isSelected: false,
        },
      };
    case TOGGLE_EVNET:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          isSelected: !action.payload.isSelected
        }
      }
    case ACTIVE_ONLY_ONE_EVENT:
      return mapValues(state, (event, _) => ({
        ...event,
        isSelected: (event.id === action.payload.id)
          ? true
          : false,
      }));
    default:
      return state;
  }
}

export const addEvent = (event) => ({
  type: ADD_EVENT,
  payload: event,
})

export const toggleEvent = (event) => ({
  type: TOGGLE_EVNET,
  payload: event,
})

export const activeOnlyOneEvent = (event) => ({
  type: ACTIVE_ONLY_ONE_EVENT,
  payload: event,
})
