const fs = require('fs')

fs.writeFileSync('./test.txt', 'Hello World!', 'utf8')


// 异步写入
fs.writeFile('./test.txt', 'Async Hello World!', (err) => {
    if (err) throw err;
    console.log('文件已成功写入');
})

// 异步写入文件流

const imgBuf = fs.readFileSync('./1.jpg')

fs.writeFileSync('./2.png', imgBuf, 'binary')