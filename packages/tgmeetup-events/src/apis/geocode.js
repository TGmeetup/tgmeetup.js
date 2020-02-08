import fetch from 'node-fetch';

export default async function nominatim(query = '') {
  return await fetch(`https://nominatim.openstreetmap.org/search/${query}?format=json`)
    .then(response => response.json());
}
