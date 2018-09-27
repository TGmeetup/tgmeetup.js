const { mapValues } = require('lodash');
const { normalize, denormalize, schema } = require('normalizr');

const group = new schema.Entity('groups');

const event = new schema.Entity('events');

const marker = new schema.Entity('markers', {
  events: [ event ]
});

const country = new schema.Entity('countries', {
  groups: [ group ]
})

const category = new schema.Entity('categories', {
  countries: [ country ]
});

event.define({
  group,
  marker,
});

group.define({
  events: [ event ],
  category,
  country,
})

const entities = (state) =>
  mapValues(state, reducers => reducers.byId);

const groupsAppendEvents = (groups = [], events = []) =>
  groups.map(group => ({
    ...group,
    events: events
      .filter(event => event.group === group.id)
      .map(event => ({
        ...event,
        color: group.color
      }))
  }));

module.exports = {
  group,
  event,
  marker,
  country,
  category,
  entities,
  groupsAppendEvents,
}
