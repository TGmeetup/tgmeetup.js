import { mapValues, uniq, keys } from 'lodash';
import { normalize } from 'normalizr';
import { getGroups } from './groups';
import { addEntities } from '../actions';
import { ADD_ENTITIES } from '../actions';

const country = (state, action) => {
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
        ...mapValues(action.entities.countries, c => country(c, action)),
      };
    default:
      return state;
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case ADD_ENTITIES:
      return uniq([ ...state, ...keys(action.entities.countries) ])
    default:
      return state;
  }
}

export default (state = {}, action) => ({
  byId: byId(state.byId, action),
  allIds: allIds(state.allIds, action),
})

export const selectCountries = ({ countries }, nested = true) =>
  nested
  ? []
  : countries.allIds.map(id => countries.byId[id]);

export const getCountries = (countries, continues = false, parent = {}) => (dispatch) =>
  Promise.all(
    countries.map(
      country => dispatch(
        getCountry(country, continues, parent)
      )
    )
  );

export const getCountry = (country, continues, parent = {}) => (dispatch, getState, { api, schema }) =>
  api.fetchCountry(country)
    .then(async country => continues ? {
      ...parent,
      ...country,
      groups: await dispatch(getGroups(
        country.groups,
        { ...parent, country: { id: country.id } }
      ))
    } : {
      ...parent,
      ...country,
      groups: [],
    })
    .then(country => {
      const data = normalize(country, schema.country);
      dispatch(addEntities(data.entities));
      return country;
    })
