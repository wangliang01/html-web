const fs = require('fs')

fs.appendFileSync('./test.js', '追加内容')

console.log('追加成功！')