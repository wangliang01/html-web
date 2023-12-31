const fs = require('fs')

// 同步读取文件内容
const syncData = fs.readFileSync('test.txt', 'utf8')
console.log("同步读取文件内容:", syncData);

// 文件流读取
const buf = fs.readFileSync('test.txt')
console.log("文件流读取:", buf.toString());

// 文件流写入
buf.write("ABC", 0)
console.log("文件流写入:", buf.toString());

// 打印
const buf2 =  fs.readFileSync('test.txt')
console.log("文件流写入:", buf2.toString());

const stat = fs.statSync('test.txt')

console.log(stat)

// fs.stat('test.txt', (err, stats) => {
//     console.log(err, stats)
//     if(err) {
//         console.error(err)
//         return
//     }
//     console.log(`文件大小: ${stats.size} 字节`)
//     console.log(`创建时间: ${stats.birthtime}`)
//     console.log(`修改时间: ${stats.mtime}`)
// })

// 追加文件
fs.appendFileSync('test.txt', 'Hello world2!')

