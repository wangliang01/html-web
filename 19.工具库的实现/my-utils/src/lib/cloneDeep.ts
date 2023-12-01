/**
* 深度克隆一个对象。
* 
* @param obj - 要克隆的对象。
* @returns 克隆后的对象。
*/
let map = new WeakMap(); // 用于缓存对象

function cloneDeep(obj: any){
  // 1、如果不是一个对象，是一个原始值 ，直接返回原始值
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  // 2、如果在缓存中有直接返回缓存
  if (map.has(obj)) {
    return map.get(obj)
  }
  
  // 3、如果是一个对象,继续深度克隆
  let cloneObj: any = Array.isArray(obj) ? [] : {};
  map.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = cloneDeep(obj[key]);
    }
  }
  
  return cloneObj
}

export default cloneDeep