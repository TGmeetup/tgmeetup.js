import { flatten } from 'lodash';
import { createHash } from 'crypto';
import { ghFetch as fetch } from './index';

const fetchGroupPacakgeJson = (groupUrl) =>
  fetch(groupUrl)
    .then(res => res.json())
    .then(fileUrls => fileUrls.filter(f => f.name === 'package.json').shift())
    .then(packageJsonUrl => fetch(packageJsonUrl.download_url).then(res => res.json()))

const fetchGroups = (groupsUrl, parentNode) =>
  fetch(groupsUrl)
    .then(res => res.json())
    .then(groups => groups
      .map(async group => ({
        id: group.path,
        events: [],
        ...parentNode,
        ...await fetchGroupPacakgeJson(group.url)
      }))
    )
    .then(groupPromises => Promise.all(groupPromises))

const fetchCountries = (regionsUrl, parentNode) =>
  fetch(regionsUrl)
    .then(res => res.json())
    .then(regions => regions.map(
      ghCountry => fetchGroups(ghCountry.url, parentNode)
    ))
    .then(regionPromises => Promise.all(regionPromises))
    .then(regions => flatten(regions));

export const fetchCategories = () => {
  const categories = ['community', 'conference'];

  return Promise.all(
    categories.map(async name => {
      const id = createHash('md5').update(name).digest('hex');
      return {
        id,
        name,
        groups: await fetchCountries(`https://api.github.com/repos/TGmeetup/TGmeetup/contents/${name}`, { category: id })
      };
    }
  ));
}
