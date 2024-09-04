var map = null

function createMap() {
  map = new AMap.Map("container", {
    viewMode: "3D", // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
    zoom: 11, // 初始化地图层级
    mapStyle: "amap://styles/normarl", // 设置地图的显示样式
    center: [116.397428, 39.90923], // 初始化地图中心点
  });
}

function destroyMap() {
  map.destroy();
}

function $() {
  return document.querySelector.apply(document, arguments);
}

createMap()

$('#create-btn').addEventListener('click', createMap);
$('#destroy-btn').addEventListener('click', destroyMap);
