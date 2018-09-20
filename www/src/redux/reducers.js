import events from './modules/events';
import filters from './modules/filters';
import groups from './modules/groups';
import markers from './modules/markers';
import categories from './modules/categories';
import countries from './modules/countries';

export default (state = {}, action) => ({
  events: events(state.events, action, state),
  markers: markers(state.markers, action, state),
  groups: groups(state.groups, action, state),
  filters: filters(state.filters, action, state),
  categories: categories(state.categories, action, state),
  countries: countries(state.countries, action, state),
})
