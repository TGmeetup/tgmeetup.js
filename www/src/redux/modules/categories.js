import { mapValues, keys, uniq } from 'lodash';
import { ADD_ENTITIES } from '../actions';

const category = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_ENTITIES:
      return {
        ...state,
        ...mapValues(action.entities.categories, cat => category(cat, action)),
      };
    default:
      return state;
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case ADD_ENTITIES:
      return uniq([ ...state, ...keys(action.entities.categories) ])
    default:
      return state;
  }
}

export default (state = {}, action) => ({
  byId: byId(state.byId, action),
  allIds: allIds(state.allIds, action),
})
