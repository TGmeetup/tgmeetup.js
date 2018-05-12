import { has } from 'lodash';

export const ADD_EVENT = 'ADD_EVNET';
export const TOGGLE_EVENT = 'TOGGLE_EVENT';

export default (state = {}, action) => {
  switch(action.type) {
    case ADD_EVENT:
      return {
        ...state,
        [action.payload.issue.id]: {
          id: action.payload.issue.id,
          selected: false,
          ...action.payload
        }
      };
    case TOGGLE_EVENT:
      return has(state, action.payload.id)
        ? {
            ...state,
            [action.payload.id]: {
              ...action.payload,
              selected: !action.payload.selected,
            }
          }
        : state;
    default:
      return state;
  }
}

export const addEvent = (event) => ({
  type: ADD_EVENT,
  payload: event,
})


export const toggleEvent = (event) => ({
  type: TOGGLE_EVENT,
  payload: event,
})
