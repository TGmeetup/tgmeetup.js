const randomColor = require('randomcolor');
const apis = require('./apis');

const createGroupNodes = async (createNodeId, options) => {
  const groupUrls = await apis.fetchGroupUrls();

  const groupNodePromises = groupUrls.map(
    url => createGroupNode(createNodeId, url, options)
  );

  return await Promise.all(groupNodePromises);
}

const createGroupNode = async (createNodeId, groupUrl, options) => {
  const group = await apis.fetchGroup(groupUrl, options);

  return {
    ...group,
    id: createNodeId(`group-${group.ref}`),
    country: {
      id: createNodeId(`country-${group.countrycode}`),
      name: group.countrycode,
    },
    category: {
      id: createNodeId(`category-${group.category}`),
      name: group.category,
    }
  };
};

const createEventNodes = async (createNodeId) => {
  const events = await apis.fetchEvents();

  const eventNodes = events
    .map(event => ({
      ...event,
      id: createNodeId(`event-${event.id}`),
      group: createNodeId(`group-${event.group_ref}`),
      country: createNodeId(`country-${event.countrycode}`),
    }));

  createAndLinkMarkerNodes(createNodeId, eventNodes);

  return eventNodes;
};

const createAndLinkMarkerNodes = (createNodeId, eventNodes) => {
  const markerNodes = {};

  eventNodes.forEach(event => {
    const markerId = createNodeId(`marker-${event.latlngStr}`);

    if (markerNodes[markerId] === undefined) {
      markerNodes[markerId] = {
        id: markerId,
        latlng: event.geocode,
        color: randomColor({
          luminosity: 'dark',
          seed: markerId,
        }),
        events: [],
      }
    }

    const marker = markerNodes[markerId];

    marker.events.push({ id: event.id });

    event.marker = marker;
  });

  return markerNodes;
}

const createMissingGroupNodesInEventNodes = async (createNodeId, eventNodes, groupNodes, options) => {
  const groupIds = new Set(groupNodes.map(g => g.id));

  const createMissingGroupNodePromises = [];
  eventNodes.forEach(eventNode => {
    if (!groupIds.has(eventNode.group)) {
      console.log(`Missing in all-groups: ${eventNode.group_ref}`);

      const createMissingGroupNodePromise = createGroupNode(
        createNodeId,
        `https://raw.githubusercontent.com/TGmeetup/TGmeetup/master/${eventNode.group_ref}/package.json`,
        options
      );
      createMissingGroupNodePromises.push(createMissingGroupNodePromise);

      groupIds.add(eventNode.group);
    }
  });
  missingGroupNode = await Promise.all(createMissingGroupNodePromises);

  return missingGroupNode;
}

const linkEventNodesToGroupNodes = (eventNodes, groupNodes) =>
  groupNodes.map(groupNode => ({
    ...groupNode,
    events: eventNodes
      .filter(eventNode => eventNode.group === groupNode.id)
  }));

const coloringEventNodesByGroupNodes = (eventNodes, groupNodes) =>
  eventNodes.map(eventNode => ({
    ...eventNode,
    color: groupNodes
      .filter(
        groupNode => groupNode.id === eventNode.group
      )[0].color,
  }))

module.exports = {
  createGroupNodes,
  createEventNodes,
  createMissingGroupNodesInEventNodes,
  linkEventNodesToGroupNodes,
  coloringEventNodesByGroupNodes,
}
