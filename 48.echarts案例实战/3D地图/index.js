// 加载genJson数据
const getMapJson = (url) => {
  const mapJson = fetch(url).then((res) => res.json());
  return mapJson;
};

async function getAdcodeByName(name) {
  const apiKey = 'd491d48d1aa1e47e3c1de3281ad19c33'; // 替换为你的API密钥
  const url = `https://restapi.amap.com/v3/geocode/geo?key=${apiKey}&address=${name}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data)
    if (data.infocode === '10000') {
      const adcode = data.geocodes[0].adcode;
      return adcode;
    } else {
      throw new Error(`Failed to retrieve adcode: ${data.infocode} - ${data.infomsg}`);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

const myChart = echarts.init(document.getElementById("main"));

// 世界地图jsonUrl
console.log("世界地图", worldJson)

// 中国地图jsonUrl
const chinaJsonUrl = "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json";



// 获取中国地图json
getMapJson(chinaJsonUrl).then(
  (geoJson) => {
    // 注册地图名字(china)和数据(geoJson)
    echarts.registerMap("china", geoJson);
    // 图表配置项
    const option = {
      // 设置tooltip
      tooltip: {
        trigger: "item",
        show: true,
        position: "inside",
        formatter: "{b}",
        backgroundColor: "rgba(50,50,50,0.7)",
        textStyle: {
          color: "#fff",
          fontSize: 12,
          textAlign: "center",
        },
      },
      series: [
        {
          type: "map",
          map: "china",
          // 设置纹理
          // 三维图形的着色效果
          shading: "realistic",
          // 真实感材质相关的配置项
          realisticMaterial: {
            detailTexture: "./img/texture.png", // 纹理图片
            textureTiling: 1,
          },
          // 后处理特效
          postEffect: {
            enable: true,
            SSAO: {
              enable: true,
              radius: 1,
              intensity: 1,
              quality: "high",
            },
            bloom: {
              enable: true,
              strength: 0.5,
              radius: 0,
              threshold: 0,
            },
            FXAA: {
              enable: true,
              alpha: 0.5,
            },
          },
          // 设置视角控制
          viewControl: {
            projection: "perspective", // 投影方式
            autoRotate: false, // 是否开启视角绕物体的自动旋转查看
            autoRotateDirection: "cw", // 物体自传的方向。默认是 'cw'，也可以取 'ccw'
            autoRotateSpeed: 10, // 物体自传的速度。角度 / 秒
            autoRotateAfterStill: 3, // 在鼠标静止操作后恢复自动旋转的时间间隔
            damping: 0, // 鼠标进行旋转，缩放等操作时的迟滞因子
            distance: 120, // 默认视角距离主体的距离
            alpha: 40, // 视角绕 x 轴，即上下旋转的角度
            beta: 0, // 视角绕 y 轴，即左右旋转的角度
            center: [0, 0, 0], // 视角中心点
            animation: true, // 是否开启动画
            animationDurationUpdate: 1000, // 过渡动画的时长
            animationEasingUpdate: "cubicInOut", // 过渡动画的缓动效果
          },
          // 设置光照
          light: {
            main: {
              // 场景主光源的设置，在 globe 组件中就是太阳光。
              color: "#3D94CE", // 主光源的颜色。
              intensity: 1.2, // 主光源的强度。
              shadow: false, // 主光源是否投射阴影。默认关闭。开启阴影可以给场景带来更真实和有层次的光照效果。会增加程序的运行开销。
              shadowQuality: "high", // 阴影的质量。可选'low', 'medium', 'high', 'ultra'
              alpha: 55, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。
              beta: 10, // 主光源绕 y 轴，即左右旋转的角度。
            },
            ambient: {
              // 全局的环境光设置。
              color: "red", // 环境光的颜色。[ default: #fff ]
              intensity: 0.5, // 环境光的强度。[ default: 0.2 ]
            },
          },
          // 设置地面
          groundPlane: {
            show: true,
            color: "#aaa",
          },
          // 环境贴图
          environment: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                // 配置为垂直渐变的背景
                offset: 0,
                color: "#183890", // 天空颜色
              },
              {
                offset: 0.7,
                color: "#040829", // 地面颜色
              },
              {
                offset: 1,
                color: "#040829", // 地面颜色
              },
            ],
            false
          ),
          // 设置地图颜色
          itemStyle: {
            color: "#286ECA", // 地图板块的颜色
            opacity: 1, // 图形的不透明度 [ default: 1 ]
            borderWidth: 0.5, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域
            borderColor: "#286ECA", // 图形描边的颜色。[ default: #333 ]
          },
          // 设置标签
          label: {
            show: true, // 地图上城市名称
            distance: 5, // 城市名称的间距
            formatter: function (params) {
              return params.name || " ";
            },
            textStyle: {
              fontSize: 8, // 字体大小
              color: "#fff", // 字体颜色
            },
          },
          // 设置高亮颜色
          emphasis: {
            itemStyle: {
              color: "#66ffff", // 高亮时地图板块颜色改变
            },
            label: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: 15,
              },
            },
          },
        },
      ],
    };

    // 设置图表实例的配置项以及数据
    myChart.setOption(option);

    myChart.on('click', function(params) {
      console.log(params.name);
      getAdcodeByName(params.name).then((adcode) => {
        console.log(adcode);
        const jsonUrl = `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`;
        getMapJson(jsonUrl).then((mapJson) => {
          echarts.registerMap(params.name, mapJson);
          myChart.setOption({
            series: [
              {
                type: "map",
                map: params.name,
              }
            ]
          })
        })
      })
      
    });
  }
);
