const fs = require('fs')

// 同步读取test.txt
const syncData = fs.readFileSync('test.txt', 'utf-8')
console.log('==============同步读取文件===============')
console.log(syncData)

// 异步读取test.txt
fs.readFile('test.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('==============异步读取文件===============')
    console.log(data)
})

// Promise异步
fs.promises.readFile('test.txt', 'utf-8')
    .then(data => {
        console.log('==============Promise异步读取文件===============')
        console.log(data)
    })

