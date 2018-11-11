const { omit } = require('lodash');
const crypto = require('crypto');

const gatsbyNode = (type) => (node) => {
  const content = JSON.stringify(node);
  const contentDigest = crypto
    .createHash('md5')
    .update(content)
    .digest('hex');

  return {
    ...node,
    parent: null,
    children: [],
    internal: {
      type,
      content,
      contentDigest,
    },
  }
}

exports.gatsbyNode = gatsbyNode;

exports.groupToNode = (group) => {
  const node = {
    ...gatsbyNode('TgmeetupGroup')(group),
    country___NODE: group.country,
    category___NODE: group.category,
    events___NODE: group.events,
  };

  return omit(node, [
    'country',
    'category',
    'events',
  ]);
}

exports.eventToNode = (event) => {
  const node = {
    ...gatsbyNode('TgmeetupEvent')(event),
    group___NODE: event.group,
    marker___NODE: event.marker,
  };


  return omit(node, ['group', 'marker', 'country']);
}

exports.markerToNode = (marker) => {
  const node = {
    ...gatsbyNode('TgmeetupMarker')(marker),
    events___NODE: marker.events
  };

  return omit(node, ['events']);
}
