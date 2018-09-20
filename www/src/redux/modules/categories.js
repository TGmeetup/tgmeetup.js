import { mapValues, keys, uniq } from 'lodash';
import { ADD_ENTITIES, addEntities } from '../actions';
import { normalize } from 'normalizr';
import { getCountries } from './countries';

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

export const selectCategories = ({ categories }, nested = true) =>
  nested
  ? []
  : categories.allIds.map(id => categories.byId[id]);

export const getCategories = ( categories = ['community', 'conference'], continues = false, parent = {}) => (dispatch) =>
  Promise.all(
    categories.map(
      category => dispatch(
        getCategory(category, continues, parent)
      )
    )
  );

export const getCategory = (category, continues, parent = {}) => (dispatch, getState, { api, schema }) =>
  api.fetchCategory(category)
    .then(async category => continues ? {
      ...category,
      countries: await dispatch(getCountries(
        category.countries,
        continues,
        { ...parent, category: { id: category.id } }
      ))
    } : {
      ...category,
      countries: [],
    })
    .then(category => {
      const data = normalize(category, schema.category);
      dispatch(addEntities(data.entities));
      return category;
    })
