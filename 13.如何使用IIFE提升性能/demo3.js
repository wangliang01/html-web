// function removeSpace(str) {
//   return str.replace(/\s/g, "");
// }

// // 使用IIFE
// var removeSpace = (function() {
//   let reg = /\s/g
//   let replacement = ""
//   return function(str) {
//     return str.replace(reg, replacement);
//   }
// })()

var createRemoveSpace = function() {
  let reg = /\s/g
  let replacement = ""
  return function(str) {
    return str.replace(reg, replacement);
  }
}

var removeSpace = createRemoveSpace()


let result = removeSpace("hello world")
console.log(result);