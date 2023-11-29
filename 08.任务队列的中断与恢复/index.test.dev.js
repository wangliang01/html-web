"use strict";

var _vitest = require("vitest");

var _index = require("./index");

(0, _vitest.test)('init', function () {
  (0, _vitest.expect)(1).toBe(1);
}); // 测试异步任务

(0, _vitest.test)('processTasks', function _callee() {
  var tasks, _processTasks, start, pause, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          tasks = [function () {
            return new Promise(function (resolve, reject) {
              setTimeout(function () {
                resolve(1);
              }, 1000);
            });
          }, function () {
            return new Promise(function (resolve, reject) {
              setTimeout(function () {
                resolve(2);
              }, 100);
            });
          }, function () {
            return new Promise(function (resolve, reject) {
              setTimeout(function () {
                resolve(2);
              }, 100);
            });
          }, function () {
            return new Promise(function (resolve, reject) {
              setTimeout(function () {
                resolve(2);
              }, 100);
            });
          }];
          _processTasks = _index.processTasks.apply(void 0, tasks), start = _processTasks.start, pause = _processTasks.pause;
          _context.next = 4;
          return regeneratorRuntime.awrap(start());

        case 4:
          result = _context.sent;
          (0, _vitest.expect)(result).toEqual([1, 2, 2, 2]);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});