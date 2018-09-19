import { mapValues } from 'lodash';
import { normalize, denormalize, schema } from 'normalizr';

const event = new schema.Entity('events');
const group = new schema.Entity('groups');
const marker = new schema.Entity('markers');
const category = new schema.Entity('categories');

event.define({ group });
marker.define({ events: [ event ] });
category.define({ groups: [ group ] });
group.define({
  events: [ event ],
  category,
});

export const normalizeCategories = (categoriesData) =>
  normalize(categoriesData, [ category ]);

const entities = (state) =>
  mapValues(state, reducers => reducers.byId);

export const extractMarkers = (state) =>
  denormalize(
    state.markers.allIds,
    [ marker ],
    entities(state)
  );

export const extractGroups = (ids, state) =>
  denormalize(
    ids,
    [ group ],
    entities(state)
  );
