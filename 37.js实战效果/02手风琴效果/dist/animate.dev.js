"use strict";

/**
 * 写一个通用的动画函数
 * @param {Object} options
 */
function animate(options) {
  var from = options.from || 0;
  var to = options.to || 100;
  var duration = options.duration || 1000;
  var timeStep = options.timeStep || 15; // const easing = options.easing || (t => t); // 使用默认的线性变化

  var onProcess = options.onProcess || function () {};

  var onComplete = options.onComplete || function () {};

  var currentStep = 0;
  var times = Math.ceil(duration / timeStep);
  var delta = (to - from) / times;
  var timer;

  function step() {
    currentStep++;
    from += delta;
    console.log(from);

    if (currentStep >= times) {
      from = to;
      onProcess(from);
      onComplete(from);
      clearTimeout(timer);
      return;
    }

    onProcess(from);
    timer = setTimeout(step, timeStep);
  }

  timer = setTimeout(step, timeStep);
}