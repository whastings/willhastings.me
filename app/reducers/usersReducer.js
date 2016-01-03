const actionHandlers = {
  USER_ADD: function addUser(state, action) {
    let newUser = action.payload;
    return state.merge({
      [newUser.id]: newUser
    });
  }
};

export default function usersReducer(state, action) {
  let handler = actionHandlers[action.type];

  if (handler) {
    state = handler(state, action);
  }

  return state;
}
