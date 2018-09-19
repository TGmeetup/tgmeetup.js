import { getGroups } from './groups';
import { addEntities } from '../actions';
import { normalize } from 'normalizr';

export const getCountries = (countries, continues = false) => (dispatch) =>
  Promise.all(
    countries.map(
      country => dispatch(
        getCountry(country, continues)
      )
    )
  );

export const getCountry = (country, continues) => (dispatch, getState, { api, schema }) =>
  api.fetchCountry(country)
    .then(async country => continues ? {
      ...country,
      groups: await dispatch(getGroups(country.groups))
    } : {
      ...country,
      groups: [],
    })
    .then(country => {
      const data = normalize(country, schema.country);
      dispatch(addEntities(data.entities));
      return country;
    })
