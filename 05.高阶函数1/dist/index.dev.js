"use strict";

var arr = [1, 3, 5, 9];
var newArr = arr.map(function (item) {
  return item * 2;
});
console.log(newArr); // 将上面的代码封装成一个函数

function map(arr, fn) {
  var newArr = [];

  for (var i = 0; i < arr.length; i++) {
    newArr.push(fn(arr[i]));
  }

  return newArr;
} // 测试


var arr = [1, 3, 5, 9];
var newArr = map(arr, function (item) {
  return item * 2;
});
console.log(newArr);