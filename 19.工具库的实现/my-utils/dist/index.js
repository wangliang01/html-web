'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = require('@babel/runtime/helpers/typeof');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);

var map = new WeakMap();
function cloneDeep(obj) {
  if (_typeof__default["default"](obj) !== 'object' || obj === null) {
    return obj;
  }
  if (map.has(obj)) {
    return map.get(obj);
  }
  var cloneObj = Array.isArray(obj) ? [] : {};
  map.set(obj, cloneObj);
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = cloneDeep(obj[key]);
    }
  }
  return cloneObj;
}

var cloneDeep$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': cloneDeep
});

function sayHelloWorld() {
  console.log('hello world');
  return 'hello world';
}

exports.cloneDeep = cloneDeep$1;
exports.sayHelloWorld = sayHelloWorld;
