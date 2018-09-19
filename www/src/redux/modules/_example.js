
const XXX = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

const byId = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default (state = {}, action) => ({
  byId: byId(state.byId, action),
  allIds: allIds(state.allIds, action),
})
