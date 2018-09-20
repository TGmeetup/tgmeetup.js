const TOGGLE_FILTER = 'TOGGLE_FILTER';

export default (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_FILTER:
      Object.keys(action.filter).forEach(field => {
        if (field in state && state[field] === action.filter[field]) {
          delete state[field]
        } else {
          state[field] = action.filter[field];
        }
      });
      return { ...state };
    default:
      return state;
  }
}

export const selectFilters = (filters) =>
  Object.keys(filters).map(field => ({
    name: field,
    value: filters[field],
  }));

export const toggleFilter = (filter) => ({
  type: TOGGLE_FILTER,
  filter
})
