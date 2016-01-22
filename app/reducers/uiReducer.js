import createReducer from 'app/utils/createReducer';

export default createReducer({
  CURRENT_USER_ID_SET: function setCurrentUserId(state, action) {
    let id = action.payload;
    return state.merge({
      currentUserId: id
    });
  }
});
