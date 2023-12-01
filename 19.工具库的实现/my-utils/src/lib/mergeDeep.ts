import { hasOwn, isPlainObject, isArray } from "./common";
import isMergeableObject from 'is-mergeable-object'
function mergeDeep(target, source) {
  for (const key in source) {
    if (hasOwn(source, key)) {
      if (isPlainObject(source[key])) {
        if (!target[key]) {
          target[key] = {};
        }
        mergeDeep(target[key], source[key]);
      } else if (isArray(source[key])) {
        if (!target[key]) {
          target[key] = [];
        }
        target[key] = [...target[key], ...source[key]];
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}




export default mergeDeep;
