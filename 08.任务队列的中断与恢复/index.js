/**
 * 顺序执行一系列任务，并返回每个任务的结果。
 * 返回两个方法：start 方法用于开始执行任务，pause 方法用于在任务之间中断。
 * 每个任务是原子性的，只能在两个任务之间中断，不能中断正在执行的任务。
 * @param {Function[]} tasks - 任务列表，每个任务是一个不带参数且返回 Promise 的函数。
 * @returns {Object} - 包含 start 和 pause 方法的对象。
 */
export function processTasks(...tasks) {
  let isRunning = false; // 标记任务是否正在执行
  let result = []; // 任务结果列表
  let i = 0; // 当前任务的索引

  return {
    /**
     * 开始顺序执行任务。
     * @returns {Promise} - 返回一个 Promise，用于获取所有任务的结果。
     */
    start() {
      return new Promise(async (resolve, reject) => {
        if (isRunning) return; // 如果任务正在执行，则直接返回
        isRunning = true;
        
        while (i < tasks.length) {
          console.log('任务开始', i)
          result.push(await tasks[i]()); // 执行每个任务并存储结果
          console.log('任务结束', i)
          i++
          if (!isRunning) return; // 如果被中断，则直接返回
        }

        isRunning = false; // 所有任务执行完成后将 isRunning 设置为 false
        resolve(result); // 解析 Promise，并返回所有任务的结果
      });
    },

    /**
     * 暂停任务的执行。
     */
    pause() {
      isRunning = false; // 将 isRunning 设置为 false，以暂停任务的执行
    }
  };
}



