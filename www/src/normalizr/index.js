import { mapValues } from 'lodash';
import { denormalize, schema } from 'normalizr';

const event = new schema.Entity('events');

const group = new schema.Entity('groups', {
  events: [ event ]
});

const marker = new schema.Entity('markers', {
  events: [ event ]
});

event.define({ group });

const entities = (state) =>
  mapValues(state, reducers => reducers.byId);

export const extractMarkers = (state) =>
  denormalize(
    state.markers.allIds,
    [ marker ],
    entities(state)
  );

export const extractGroups = (state) =>
  denormalize(
    state.groups.allIds,
    [ group ],
    entities(state)
  );
