"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processTasks = processTasks;

/**
 * 顺序执行一系列任务，并返回每个任务的结果。
 * 返回两个方法：start 方法用于开始执行任务，pause 方法用于在任务之间中断。
 * 每个任务是原子性的，只能在两个任务之间中断，不能中断正在执行的任务。
 * @param {Function[]} tasks - 任务列表，每个任务是一个不带参数且返回 Promise 的函数。
 * @returns {Object} - 包含 start 和 pause 方法的对象。
 */
function processTasks() {
  for (var _len = arguments.length, tasks = new Array(_len), _key = 0; _key < _len; _key++) {
    tasks[_key] = arguments[_key];
  }

  var isRunning = false; // 标记任务是否正在执行

  var result = []; // 任务结果列表

  var i = 0; // 当前任务的索引

  return {
    /**
     * 开始顺序执行任务。
     * @returns {Promise} - 返回一个 Promise，用于获取所有任务的结果。
     */
    start: function start() {
      return new Promise(function _callee(resolve, reject) {
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!isRunning) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                // 如果任务正在执行，则直接返回
                isRunning = true;

              case 3:
                if (!(i < tasks.length)) {
                  _context.next = 16;
                  break;
                }

                console.log('任务开始', i);
                _context.t0 = result;
                _context.next = 8;
                return regeneratorRuntime.awrap(tasks[i]());

              case 8:
                _context.t1 = _context.sent;

                _context.t0.push.call(_context.t0, _context.t1);

                // 执行每个任务并存储结果
                console.log('任务结束', i);
                i++;

                if (isRunning) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return");

              case 14:
                _context.next = 3;
                break;

              case 16:
                isRunning = false; // 所有任务执行完成后将 isRunning 设置为 false

                resolve(result); // 解析 Promise，并返回所有任务的结果

              case 18:
              case "end":
                return _context.stop();
            }
          }
        });
      });
    },

    /**
     * 暂停任务的执行。
     */
    pause: function pause() {
      isRunning = false; // 将 isRunning 设置为 false，以暂停任务的执行
    }
  };
}