const fs = require('fs')

const fileInfo = fs.statSync('test.txt', 'utf8')

// 判断是文件还是目录
console.log('isFile: ', fileInfo.isFile(), 'isDirectory: ', fileInfo.isDirectory())

try {
    // 查询一个不存在的文件/目录信息（会抛出异常，需要自行捕获）
    fs.statSync('not_exist.txt')
} catch (error) {
    console.log('文件不存在')
}