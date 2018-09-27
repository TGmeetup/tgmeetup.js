const randomColor = require('randomcolor');
const apis = require('./apis');
const fetch = require('./fetch');

const shimGroupColor = (group) => {
  switch (group.name) {
    case 'MOPCON':
      return '#010135';
    case 'WoFOSS':
      return '#00eac8';
    case 'JCConf':
      return '#3433B1';
    case 'CNTUG':
      return '#BCBCBC';
    case 'elixirTW':
      return '#550062';
    case 'hcsm':
      return '#00A79A';
    case 'AgileCommunity.tw':
      return '#353535';
    case 'hackingthursday':
      return '#C99956';
    case 'PyHUG':
      return '#00FF00';
    case 'DigitalOceanHsinchu':
      return '#4556FF';
    default:
      return randomColor({ luminosity: 'dark' });
  }
}

exports.getGroups = async (createNodeId) => {
  const groups = await fetch('https://raw.githubusercontent.com/TGmeetup/TGmeetup/master/all-groups')
    .then(res => res.json());

  return Promise
    .all(groups.map(group => getGroup(group)))
    .then(groups => groups.map(group => ({
      ...group,
      id: createNodeId(`${group.category}-${group.countrycode}-${group.name}`),
      country: {
        id: createNodeId(`country-${group.countrycode}`),
        name: group.countrycode,
      },
      category: {
        id: createNodeId(`category-${group.category}`),
        name: group.category,
      },
      events: [],
    })));
}

const getGroup = (group) =>
  apis.fetchGroup(group)
    .then(group => ({
      ...group,
      color: group.color || shimGroupColor(group),
    }))

exports.getEvents = (createNodeId) =>
  apis.fetchEvents()
    .then(events =>
      events.map(event => ({
        ...event,
        id: createNodeId(`event-${event.id}`),
        group: createNodeId(event.groupRef.split('/').join('-')),
        country: createNodeId(`country-${event.countrycode}`),
      })))
    .then(events => {
      const markers = {};

      events.forEach(event => {
        const markerId = createNodeId(`marker-${event.latlngStr}`);

        if (markers[markerId] === undefined) {
          markers[markerId] = {
            id: markerId,
            latlng: event.geocode,
            color: randomColor({
              luminosity: 'dark',
              seed: markerId,
            }),
            events: [],
          }
        }

        const marker = markers[markerId];

        marker.events.push({ id: event.id });

        event.marker = marker;
      });

      return events;
    });
