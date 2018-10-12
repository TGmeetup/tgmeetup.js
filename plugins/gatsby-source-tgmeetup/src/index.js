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

const getGroups = async (createNodeId) => {
  const groupIds = await fetch('https://raw.githubusercontent.com/TGmeetup/TGmeetup/master/all-groups')
    .then(res => res.json());

  return Promise
    .all(groupIds.map(groupId => getGroup(groupId, createNodeId)))
}

const getGroup = (groupId, createNodeId) =>
  apis.fetchGroup(groupId)
    .then(group => ({
      ...group,
      color: group.color || shimGroupColor(group),
    }))
    .then(group => ({
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
    }));

const getEvents = (createNodeId) =>
  apis.fetchEvents()
    .then(events =>
      events.map(event => ({
        ...event,
        id: createNodeId(`event-${event.id}`),
        group: createNodeId(event.group_ref.split('/').join('-')),
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

const checkAndGetGroup = async ([ groups = [], events = [] ], createNodeId) => {
  const groupIds = new Set();
  groups.forEach(g => groupIds.add(g.id));

  await Promise.all(
    events.map(async (e) => {
      if (groupIds.has(e.group) === false) {
        const group = await getGroup(
          `https://raw.githubusercontent.com/TGmeetup/TGmeetup/master/${e.group_ref}/package.json`,
          createNodeId
        )

        groups.push(group);
        groupIds.add(group.id);

        return group;
      }
    })
  );

  return [ groups, events ];
}

module.exports = {
  getGroups,
  getEvents,
  checkAndGetGroup,
}
