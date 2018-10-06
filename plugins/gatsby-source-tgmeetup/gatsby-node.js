const _ = require('lodash');
const { createHash } = require('crypto');
const { normalize } = require('normalizr');
const { getGroups, getEvents, checkAndGetGroup } = require('./src/');
const schema = require('./src/schema');
const { groupToNode, eventToNode, markerToNode, gatsbyNode } = require('./src/process-data');

require("dotenv").config({ path: `${__dirname}/.env` });

exports.sourceNodes = async ({ actions, createNodeId }) => {
  const { createNode } = actions;

  const groupsData = await Promise.all([ getGroups(createNodeId), getEvents(createNodeId) ])
    .then((data) => checkAndGetGroup(data, createNodeId))
    .then(([ groups, events ]) => schema.groupsAppendEvents(groups, events));

  const { groups, events, markers, categories, countries } = normalize(groupsData, [ schema.group ]).entities;

  _(groups).mapValues(groupToNode).forEach(node => createNode(node));
  _(events).mapValues(eventToNode).forEach(node => createNode(node));
  _(markers).mapValues(markerToNode).forEach(node => createNode(node));
  _(categories).mapValues(gatsbyNode('TgmeetupCategory')).forEach(node => createNode(node));
  _(countries).mapValues(gatsbyNode('TgmeetupCountry')).forEach(node => createNode(node));

  return;
}
