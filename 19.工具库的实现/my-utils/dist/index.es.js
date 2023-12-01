import _typeof from '@babel/runtime/helpers/typeof';

var map = new WeakMap();
function cloneDeep(obj) {
  if (_typeof(obj) !== 'object' || obj === null) {
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

export { cloneDeep$1 as cloneDeep, sayHelloWorld };
