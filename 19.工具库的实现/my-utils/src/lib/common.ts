export function isPlainObject(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isArray (arr: any) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

export function hasOwn (obj: any, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}