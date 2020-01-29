require("dotenv").config();

const _ = require('lodash');
const { normalize } = require('normalizr');
const { createGroupNodes, createEventNodes, createMissingGroupNodesInEventNodes, linkEventNodesToGroupNodes, coloringEventNodesByGroupNodes } = require('./src/index');
const schema = require('./src/schema');
const { groupToNode, eventToNode, markerToNode, gatsbyNode } = require('./src/to-gatsby-node');

exports.sourceNodes = async ({ actions, createNodeId }) => {
  const { createNode } = actions;

  const [ eventNodes, groupNodes ] = await Promise.all([
    createEventNodes(createNodeId), createGroupNodes(createNodeId)
  ]);

  const missingGroupNodes = await createMissingGroupNodesInEventNodes(createNodeId, eventNodes, groupNodes);
  if (missingGroupNodes.length === 0) {
    console.log('all groups in all-group list');
  }
  groupNodes.push(...missingGroupNodes);

  const coloredEventNodes = coloringEventNodesByGroupNodes(
    eventNodes, groupNodes,
  );

  const linkedGroupNodes = linkEventNodesToGroupNodes(
    coloredEventNodes, groupNodes
  );

  const { entities: {
    groups,
    events,
    markers,
    categories,
    countries
  }} = normalize(linkedGroupNodes, [ schema.group ]);

  _(groups).mapValues(groupToNode).forEach(node => createNode(node));
  _(events).mapValues(eventToNode).forEach(node => createNode(node));
  _(markers).mapValues(markerToNode).forEach(node => createNode(node));
  _(categories).mapValues(gatsbyNode('TgmeetupCategory')).forEach(node => createNode(node));
  _(countries).mapValues(gatsbyNode('TgmeetupCountry')).forEach(node => createNode(node));

  return;
}
