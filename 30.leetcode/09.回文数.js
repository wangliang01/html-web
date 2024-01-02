/**
 * @param num number
 * @return true|false boolean 
 * 给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。

  回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

  例如，121 是回文，而 123 不是。
 */

function isPalindrome(num) {
  num = num.toString()
  let len = num.length;

  for (let i = 0; i < Math.floor(len - 1); i++) {
    let prevItem = num[i]
    let lastItem = num[len - 1 - i]
    if (prevItem !== lastItem) {
      return false
    }
  }
  return true
}

