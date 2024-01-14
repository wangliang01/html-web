"use strict";

// 布尔判定
// console.log(!!false)
// console.log(!!+0);
// console.log(!!-0);
// console.log(!!NaN);
// console.log(!!'');
// console.log(!!null);
// && 与 ||
// let flag = false;
// console.log(flag && 'hello'); // false
// 判断year是否是闰年
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

function bmi(weight, height) {
  var bmi = weight / Math.pow(height, 2);
  return bmi > 25 ? 'Overweight' : bmi > 18.5 ? 'Normal' : 'Underweight';
}

console.log(bmi(75, 1.7));