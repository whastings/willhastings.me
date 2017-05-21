// @flow

const nativeMap = Array.prototype.map;

export function map<T>(obj: T[], fn: (el: T, index: number) => any): any[] {
  return nativeMap.call(obj, fn);
}
