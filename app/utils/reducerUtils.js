/* eslint no-use-before-define:0 */
import { curryN } from '@whastings/js_utils';

export function createReducer(handlers) {
  return function(state, action) {
    let handler = handlers[action.type];

    if (handler) {
      state = handler(state, action);
    }

    return state;
  };
}

export var mergeAllWithState = curryN(
  function mergeAllWithState(getPropName, getPropVal, state, action) {
    let payload = action.payload;

    return state.merge(payload.reduce((all, item) => {
      all[getPropName(item)] = getPropVal(item);
      return all;
    }, {}));
  }
);

export var mergeWithState = curryN(
  function mergeWithState(getPropName, getPropVal, state, action) {
    let payload = action.payload;
    let propName = getPropName(payload);
    let propVal = getPropVal(payload);

    return state.merge({
      [propName]: propVal
    });
  }
);
