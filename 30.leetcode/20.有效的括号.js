/**
 * 有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
每个右括号都有一个对应的相同类型的左括号。
 */

var isValid = function(str) {
  // 定义一个栈
  let stack = []

  let i = 0

  while(i < str.length) {
      let char = str[i]
      let lastChar
      switch(char) {
          case '(':
          case '[':
          case '{':
            stack.push(char);
            break;
          case ')':
             lastChar = stack[stack.length - 1]
            if (lastChar === '(') {
                stack.pop()
                 break;
            } else {
                return false
            }
           
          case ']':
            lastChar = stack[stack.length - 1]
            if (lastChar === '[') {
                stack.pop()
                break;
            } else {
                return false
            }
          case '}':
            lastChar = stack[stack.length - 1]
            if (lastChar === '{') {
                stack.pop()
                break;
            } else {
                return false
            }
      }

      i++
  }

  if (stack.length) return false
  return true
};