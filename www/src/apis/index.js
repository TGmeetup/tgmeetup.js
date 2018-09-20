import { createHash } from 'crypto';
import fetch from './fetch';

export const fetchCategory = (category) =>
  fetch(`https://api.github.com/repos/TGmeetup/TGmeetup/contents/${category}`)
    .then(res => res.json())
    .then(ghCountries => ({
      id: createHash('md5').update(category).digest('hex'),
      name: category,
      countries: ghCountries,
    }))
    .catch(err => console.error(err));

export const fetchCountry = (country) => {
  if (country instanceof String) {
    throw new Error('fetchCountry is not ready handle string');
  }

  return fetch(country.url)
    .then(res => res.json())
    .then(ghGroups => ({
      id: createHash('md5').update(country.name).digest('hex'),
      name: country.name,
      groups: ghGroups,
    }))
    .catch(err => console.error(err));
}

const fetchPackageJson = async (ghGroupDir) => {
  const packageJsonUrl = ghGroupDir.filter(f => f.name === 'package.json').shift()
  if (!packageJsonUrl) return console.error('packageJsonUrl not found');

  return fetch(packageJsonUrl.download_url)
    .then(res => res.json())
    .catch(err => console.error(err));
}

export const fetchGroup = (group) => (
  (typeof group === 'string')
    ? fetch(group)
      .then(res => res.json())
      .then(group => ({
        id: `${group.category}/${group.countrycode}/${group.name}`,
        ...group,
        country: {
          id: createHash('md5').update(group.countrycode).digest('hex'),
          name: group.countrycode,
        },
        category: {
          id: createHash('md5').update(group.category).digest('hex'),
          name: group.category,
        },
        events: [],
      }))
    : fetch(group.url)
      .then(res => res.json())
      .then(async ghGroupDir => ({
        id: group.path,
        events: [],
        ...await fetchPackageJson(ghGroupDir),
      }))
  ).catch(err => console.error(err));

