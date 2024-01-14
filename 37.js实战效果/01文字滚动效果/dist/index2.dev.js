"use strict";

var list = document.querySelector('.list');

function cloneNode() {
  var firstNode = list.children[0];
  var cloneNode = firstNode.cloneNode(true);
  list.appendChild(cloneNode);
}

cloneNode(); // 每隔一段时间，将列表滚动到一个位置

var duration = 2000;
var curIndex = 0;
var offsetHeight = 40;
setInterval(moveNext, duration);

function moveNext() {
  var from = curIndex * offsetHeight;
  curIndex++;
  var to = curIndex * offsetHeight;
  var totalDuration = 500;
  var duration = 10;
  var times = totalDuration / duration;
  var dis = (to - from) / times;
  var timer = setInterval(function () {
    from += dis;

    if (from >= to) {
      clearInterval(timer);

      if (curIndex === list.children.length - 1) {
        from = 0;
        curIndex = 0;
      }
    }

    list.scrollTop = from;
  }, duration);
}