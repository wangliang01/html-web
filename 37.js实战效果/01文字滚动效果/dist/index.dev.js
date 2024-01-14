"use strict";

(function () {
  var list = document.querySelector('.list');
  var offsetHeight = 40;
  var duration = 2000;
  var curIndex = 0;
  var len = list.children.length;

  function cloneNode() {
    // 将第一个克隆第一个元素，并插入到最后
    var clone = list.children[0].cloneNode(true);
    list.appendChild(clone);
  }

  cloneNode();
  var timer;

  function scroll() {
    len = list.children.length;
    var y = curIndex * offsetHeight;
    list.style.transform = "translateY(".concat(-y, "px)");
    list.style.transition = "transform ".concat(duration, "ms");

    if (curIndex === len - 1) {
      // 滚动到最后一项
      curIndex = -1;
    }

    if (curIndex === 0) {
      list.style.transition = 'none';
      timer = setTimeout(scroll, 0);
    } else {
      timer = setTimeout(scroll, duration);
    }

    curIndex++;
  }

  scroll();
})();