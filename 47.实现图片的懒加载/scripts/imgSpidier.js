// 根据 https://picsum.photos/200  下载图片，并存入imgs目录中

const fs = require('fs');
const path = require('path');
const axios = require('axios');


// 获取上级目录路径
const parentDir = path.join(__dirname, '..');
const imgsDir = path.join(parentDir, 'imgs');
/**
 * 
 * @param {*} count 爬取的图片数量
 * count 
 */
async function imgSpidier(count) {
// 上级目录是否存在imgs


// 检查上级目录中是否存在 imgs 文件夹
if (!fs.existsSync(imgsDir)) {
  console.log('上级目录中不存在 imgs 文件夹');
} else {
  console.log('上级目录中存在 imgs 文件夹');
}

  for (let i = 0; i < count; i++) {
    const url = `https://picsum.photos/200?random=${i}`;
    // 下载图片，存入imgs目录中
    const filename = `img_${i+1}`;
    await downloadImage(url, filename);
  }
}

async function downloadImage(url, fileName) {
  try {
    // 发起 GET 请求获取图片数据
    const response = await axios.get(url, { responseType: 'stream' });
    // 写入文件
    const fileWriter = fs.createWriteStream(`${imgsDir}/${fileName}.jpg`);
    response.data.pipe(fileWriter);
    
    fileWriter.on('finish', () => {
      console.log(`图片下载成功：${url}`);
    });
    fileWriter.on('error', () => {
      console.error(`图片下载失败：${url}`);
    });
  } catch (error) {
    console.error(`下载图片失败: ${url}`, error);
  }
}


imgSpidier(20)




