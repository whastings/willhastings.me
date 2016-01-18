export default function createReducer(handlers) {
  return function(state, action) {
    let handler = handlers[action.type];

    if (handler) {
      state = handler(state, action);
    }

    return state;
  };
}
