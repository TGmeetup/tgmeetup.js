import * as moment from 'moment';
import randomColor from 'randomcolor';

export const ADD_EVENT = 'ADD_EVNET';

export default (state = {}, action) => {
  switch(action.type) {
    case ADD_EVENT:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          color: randomColor({ luminosity: 'dark' }),
          moment: moment(action.payload.datetime),
        },
      };
    default:
      return state;
  }
}

export const addEvent = (event) => ({
  type: ADD_EVENT,
  payload: event,
})
