import { mapValues } from 'lodash';
import { normalize, denormalize, schema } from 'normalizr';

export const group = new schema.Entity('groups');

export const event = new schema.Entity('events');

export const marker = new schema.Entity('markers', {
  events: [ event ]
});

export const country = new schema.Entity('countries', {
  groups: [ group ]
})

export const category = new schema.Entity('categories', {
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
