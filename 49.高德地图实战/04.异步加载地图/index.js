window.onApiLoaded = function () {
  var map = new AMap.Map("container", {
    center: [117.000923, 36.675807],
    zoom: 6,
  });
  map.plugin(["AMap.ToolBar"], function () {
    map.addControl(new AMap.ToolBar());
  });
};
var url =
  "https://webapi.amap.com/maps?v=2.0&key=c2d8624cfd8ff1058ab6e3ea23d9a779&callback=onApiLoaded";
var jsapi = document.createElement("script");
jsapi.src = url;
document.head.appendChild(jsapi);
