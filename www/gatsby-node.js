const path = require('path');

const createEvents = async({ actions, graphql }) => {
  const { createPage } = actions;
  const { errors, data } = await graphql(`{
    events: allTgmeetupEvent {
      edges {
        node {
          id
        }
      }
    }
  }`);

  if (errors) throw `Error on query allTgmeetupEvent in createPages`;

  data.events.edges.forEach(edge => {
    createPage({
      path: `/events/${edge.node.id}`,
      component: path.resolve('./src/templates/event.js'),
      context: {
        eventId: edge.node.id,
      },
    })
  });

  return data;
}

const createGroups = async({ actions, graphql }) => {
  const { createPage } = actions;
  const { errors, data } = await graphql(`{
    groups: allTgmeetupGroup {
      edges {
        node {
          id
        }
      }
    }
  }`);

  if (errors) throw `Error on query allTgmeetupGroup in createPages`;

  data.groups.edges.forEach(edge => {
    createPage({
      path: `/groups/${edge.node.id}`,
      component: path.resolve('./src/templates/group.js'),
      context: {
        groupId: edge.node.id,
      },
    })
  });

  return data;
}

exports.createPages = async ({ actions, graphql }) => {
  const eventPages = createEvents({ actions, graphql });
  const groupPages = createGroups({ actions, graphql });
  return Promise.all([ eventPages , groupPages ]);
}

// https://github.com/gatsbyjs/gatsby/issues/11934
// Should be removed when the issue be resolved.
exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }
}
