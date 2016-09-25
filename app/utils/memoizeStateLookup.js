export default function memoizeStateLookup(sourceFromState, lookupFn) {
  let currentSource;
  let argCache = Object.create(null);

  return function(state, arg) {
    let source = sourceFromState(state);

    if (source !== currentSource) {
      argCache = Object.create(null);
      currentSource = source;
    }

    let result = argCache[arg];

    if (result === undefined) {
      result = argCache[arg] = lookupFn(source, arg);
    }

    return result;
  };
}
