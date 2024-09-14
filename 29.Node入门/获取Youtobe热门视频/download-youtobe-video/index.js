const { exec } = require('child_process');
const fs = require('fs');
const axios = require('axios');

// 下载单个视频
function downloadVideo(videoId) {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const command = `yt-dlp ${url}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行错误: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`标准错误输出: ${stderr}`);
      return;
    }
    console.log(`下载完成: ${stdout}`);
  });
}

// 获取热门视频列表
async function getPopularVideos(regionCode = 'US') {
  try {
    const apiKey = 'AIzaSyBu1w2_NmvazzyhdMhfNNRj34846t1GVR0'; // 替换为你的 API 密钥
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&regionCode=${regionCode}&key=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;
    console.log("🚀 ~ getPopularVideos ~ data:", data)
    
    // return data.items.map(item => item.id);
  } catch (error) {
    console.error(`获取热门视频失败: ${error}`);
    return [];
  }
}

// 主函数
async function main() {
  const popularVideoIds = await getPopularVideos();

  for (const videoId of popularVideoIds) {
    downloadVideo(videoId);
  }
}

main();