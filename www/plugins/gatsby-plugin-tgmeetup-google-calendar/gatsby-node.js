const debug = require('debug');
const uuid = require('uuid/v5');
const base32 = require("base32.js");
const { getEventList, insertEvent } = require('./src/google-calendar');

debug_log = debug('tgmeetup:log');

exports.onPostBuild = async ({ graphql }) => {
  const {
    errors: getEventListError,
    data: calendarData,
  } = await getEventList();

  if (getEventListError) throw `Error on "get" google calendar events, ${getEventListError}`;

  const googleEventById = calendarData.items.reduce((byId, item) => {
    byId[item.id] = item;
    return byId;
  }, {});

  const { errors: graphqlError, data } = await graphql(`
    {
      events: allTgmeetupEvent(sort: { fields: dateTime }) {
        edges {
          node {
            id
            name
            link
            dateTime
            location
            local_city
          }
        }
      }
    }
  `);

  if (graphqlError) throw `Error on query allTgmeetupEvent in create google calendar`;

  let errorCounter = 0;

  return Promise.all(
    data.events.edges
      .map(edge => {
        const id = base32.encode(uuid(edge.node.link, uuid.URL), { type: 'base32hex' }).toLowerCase();
        return {
          ...edge.node,
          id,
          eventId: edge.node.id,
          insertByCreate: !(id in googleEventById),
        };
      })
      .map(
        async event => insertEvent(event)
          .catch(error => { errorCounter += 1 })
      )
  ).then(_ => {
    const successCnter = data.events.edges.length - errorCounter;
    debug_log(`[${successCnter}/${data.events.edges.length}] events insert success`);
  });
}
