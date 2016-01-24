import pathToRegexp from 'path-to-regexp';

export default class MiddlewareMap {
  constructor(patternMap) {
    this.patterns = Object.keys(patternMap);
    this.map = createMiddlewareMap(this.patterns, patternMap);
  }

  match(path) {
    let map = this.map;

    for (let pattern of this.patterns) {
      let patternEntry = map[pattern];
      if (patternEntry.regex.test(path)) {
        return patternEntry.handler;
      }
    }

    return null;
  }
}

function createMiddlewareMap(patterns, patternMap) {
  return patterns
    .reduce((map, pattern) => {
      let keys = [];
      map[pattern] = {
        regex: pathToRegexp(pattern),
        handler: patternMap[pattern],
        keys
      };
      return map;
    }, {});
}
