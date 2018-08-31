import * as moment from 'moment';
import randomColor from 'randomcolor'

export const ADD_EVENT = 'ADD_EVNET';
export const TOGGLE_EVNET = 'TOGGLE_EVENT';

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
