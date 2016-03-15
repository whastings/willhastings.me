const nativeMap = Array.prototype.map;

export function map(obj, fn) {
  return nativeMap.call(obj, fn);
}
