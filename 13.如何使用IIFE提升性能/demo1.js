/**
 * 注册事件
 * @param {HTMLElement} element 
 * @param {string} type 
 * @param {Function} handler 
 */
// function addEvent(element, type, handler) {
//   if (element.addEventListener) {
//     element.addEventListener(type, handler, false);
//   } else if (element.attachEvent) {
//     element.attachEvent('on' + type, function () {
//       handler.call(element);
//     });
//   } else {
//     element['on' + type] = handler;
//   }
// }


// 使用立即执行函数来做优化
var addEvent = (function () {
  if (window.addEventListener) {
    return function (element, type, handler) {
      element.addEventListener(type, handler, false);
    };
  } else if (window.attachEvent) {
    return function (element, type, handler) {
      element.attachEvent('on' + type, function () {
        handler.call(element);
      });
    };
  } else {
    return function (element, type, handler) {
      element['on' + type] = handler;
    };
  }
})()
