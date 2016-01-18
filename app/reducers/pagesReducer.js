import createReducer from 'app/utils/createReducer';

export default createReducer({
  PAGE_ADD: function addPage(state, action) {
    let page = action.payload;
    return state.merge({
      [page.id]: page
    });
  }
});
