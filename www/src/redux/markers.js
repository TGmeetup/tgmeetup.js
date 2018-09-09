import { map, mapValues } from 'lodash';
import randomColor from 'randomcolor';
import * as moment from 'moment';
import { ADD_EVENT } from './events';
import { binaryInsert } from '../tools'

export const ACTIVE_ONLY_ONE_MARKER = 'ACTIVE_ONLY_ONE_MARKER';
export const TOGGLE_MARKER = 'TOGGLE_MARKER';
export const TOGGLE_ONLY_ONE_MARKER = 'TOGGLE_ONLY_ONE_MARKER';
export const CLEAR_MARKER = 'CLEAR_MARKER';

export default (state = {}, action, events) => {
  switch (action.type) {
    case ADD_EVENT:
      const newEvent = {
        ...action.payload,
        moment: moment(action.payload.datetime)
      };

      const latlngStr = JSON.stringify(newEvent.geocode);

      const marker = state[latlngStr] || {
        orderedEventIds: [],
        isSelected: false,
        color: randomColor({ luminosity: 'dark' })
      };

      marker.orderedEventIds = binaryInsert(
        marker.orderedEventIds.map(id => events[id]),
        newEvent,
        (e1, e2) => e1.moment - e2.moment
      ).map(event => event.id)

      return {
        ...state,
        [latlngStr]: marker
      };

    case TOGGLE_MARKER:
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          isSelected: !state[action.payload].isSelected,
        },
      };

    case ACTIVE_ONLY_ONE_MARKER:
      return mapValues(state, (group, latlngStr) => ({
        ...group,
        isSelected: (latlngStr === action.payload)
          ? true
          : false,
      }));

    case TOGGLE_ONLY_ONE_MARKER:
      return mapValues(state, (group, latlngStr) => ({
        ...group,
        isSelected: (latlngStr === action.payload)
          ? !group.isSelected
          : false,
      }));

    case CLEAR_MARKER:
      return mapValues(state, group => ({
        ...group,
        isSelected: false,
      }));

    default:
      return state;
  }
}

export const extractMarkers = ({ markers, events }) =>
  map(markers, (marker , latlngStr) => ({
    ...marker,
    latlngStr,
    latlng: JSON.parse(latlngStr),
    events: marker.orderedEventIds.map(id => events[id])
  }));

export const toggleOnlyOneMarker = (latlngStr) => ({
  type: TOGGLE_ONLY_ONE_MARKER,
  payload: latlngStr,
})

export const toggleMarker = (latlngStr) => ({
  type: TOGGLE_MARKER,
  payload: latlngStr,
})

export const activeOnlyOneMarker = (latlngStr) => ({
  type: ACTIVE_ONLY_ONE_MARKER,
  payload: latlngStr,
})


export const clearMarker = () => ({
  type: CLEAR_MARKER,
})
