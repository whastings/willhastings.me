export default function memoizeStateLookup(getState, lookupFn) {
  let currentState,
      argCache = Object.create(null);

  return function(arg) {
    let state = getState();

    if (state !== currentState) {
      argCache = Object.create(null);
      currentState = state;
    }

    let result = argCache[arg];

    if (result === undefined) {
      result = argCache[arg] = lookupFn(state, arg);
    }

    return result;
  };
}
