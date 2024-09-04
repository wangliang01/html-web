
var map = new AMap.Map('container', {
  viewMode: '3D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
  zoom:11, // 初始化地图层级
  mapStyle: 'amap://styles/normarl', // 设置地图的显示样式
  center: [116.397428, 39.90923], // 初始化地图中心点
  // layers: [new AMap.TileLayer.Satellite(), new AMap.TileLayer.RoadNet()]
});

map.on('complete', function() {
  console.log('地图加载完成')
})
