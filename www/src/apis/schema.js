import { mapValues } from 'lodash';
import { normalize, denormalize, schema } from 'normalizr';

export const group = new schema.Entity('groups');

export const event = new schema.Entity('events', {
  group
});

export const marker = new schema.Entity('markers', {
  events: [ event ]
});

export const category = new schema.Entity('categories', {
  groups: [ group ]
});

group.define({
  events: [ event ],
  category
})

export const entities = (state) =>
  mapValues(state, reducers => reducers.byId);


export const normalizeCategories = (categoriesData) =>
  normalize(categoriesData, [ category ]);

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
