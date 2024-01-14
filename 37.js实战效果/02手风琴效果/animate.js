/**
 * 写一个通用的动画函数
 * @param {Object} options
 */

function animate(options) {
  let from = options.from || 0;
  const to = options.to || 100;
  const duration = options.duration || 1000;
  const timeStep = options.timeStep || 15;
  // const easing = options.easing || (t => t); // 使用默认的线性变化
  const onProcess = options.onProcess || (() => {});
  const onComplete = options.onComplete || (() => {});

  let currentStep = 0
  const times = Math.ceil(duration / timeStep)
  const delta = (to - from) / times
  let timer

  function step() {
    currentStep++
    from += delta
    console.log(from);
    if (currentStep >= times) { 
      from = to 
      onProcess(from)
      onComplete(from)
      clearTimeout(timer)
      return 
    } 
    onProcess(from)
    timer = setTimeout(step, timeStep)
  }

  timer = setTimeout(step, timeStep)
}
