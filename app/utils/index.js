const nativeMap = Array.prototype.map;

export default function map(obj, fn) {
  return nativeMap.call(obj, fn);
}
