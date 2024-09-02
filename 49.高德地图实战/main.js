import * as THREE from "three";
import * as d3 from "d3";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

// 容器
const container = document.querySelector("#container");
// 场景
const scene = new THREE.Scene();
// 相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.set(0, 45, 45);
// 渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  logarithmicDepthBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// 2d渲染器
const css2Renderer = new CSS2DRenderer();
css2Renderer.setSize(window.innerWidth, window.innerHeight);
css2Renderer.domElement.style.position = "absolute";
css2Renderer.domElement.style.top = "0px";
css2Renderer.domElement.style.left = "0px";
css2Renderer.domElement.style.pointerEvents = "none";

container.appendChild(css2Renderer.domElement);
container.appendChild(renderer.domElement);

// 控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxDistance = 80;
controls.minDistance = 20;
controls.target.set(0, 0, 5);
controls.maxPolarAngle = THREE.MathUtils.degToRad(80);

// 渲染
const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  css2Renderer.render(scene, camera);
  controls.update();
};
animate();

// 高度
const MAP_DEPTH = 0.2;
// 转换坐标函数
const projection = d3
  .geoMercator()
  .center([104.779307, 29.33924])
  .translate([0, 0, 0]);
// 光线投射
const raycaster = new THREE.Raycaster();
// 材质加载器
const textureLoader = new THREE.TextureLoader();
// 区域网格列表
const provinceMeshList = [];
// 标签列表
const labelList = [];
// map Group容器，能统一规划区域
let map = null;
// 顶部材质
let topFaceMaterial = null;
// 侧面材质
let sideMaterial = null;
// 鼠标事件
let mouseEvent = null;

getMapData();

// 请求JSON数据
function getMapData() {
  fetch("http://192.168.100.136:8888/getGeoJson?adcode=510300")
    .then((response) => response.json())
    .then((data) => {
      console.log("🚀 ~ .then ~ data:", data)
      setTexture();
      setSunLight();
      operationData(data);
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

// 设置灯光
function setSunLight() {
  //   平行光1
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
  directionalLight1.position.set(0, 57, 33);
  //   平行光2
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight2.position.set(-95, 28, -33);
  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);

  scene.add(directionalLight1);
  scene.add(directionalLight2);
  scene.add(ambientLight);
}

//设置材质
function setTexture() {
  const scale = 0.2;
  const textureMap = textureLoader.load("./imgs/gz-map.jpg");
  const textureMapFx = textureLoader.load("./imgs/gz-map-fx.jpg");
  textureMap.wrapS = textureMapFx.wrapS = THREE.RepeatWrapping;
  textureMap.wrapT = textureMapFx.wrapT = THREE.RepeatWrapping;
  textureMap.flipY = textureMapFx.flipY = false;
  textureMap.rotation = textureMapFx.rotation = THREE.MathUtils.degToRad(45);
  textureMap.repeat.set(scale, scale);
  textureMapFx.repeat.set(scale, scale);
  topFaceMaterial = new THREE.MeshPhongMaterial({
    map: textureMap,
    color: 0xb3fffa,
    combine: THREE.MultiplyOperation,
    transparent: true,
    opacity: 1,
  });
  sideMaterial = new THREE.MeshLambertMaterial({
    color: 0x123024,
    transparent: true,
    opacity: 0.9,
  });
}

/**
 * 解析json数据，并绘制地图多边形
 * @param {*} jsondata 地图数据
 */
function operationData(jsondata) {
  console.log("🚀 ~ operationData ~ jsondata:", jsondata)
  map = new THREE.Group();

  // geo信息
  const features = jsondata.features;
  features.forEach((feature) => {
    // 单个省份 对象
    const province = new THREE.Object3D();
    // 地址
    province.properties = feature.properties.name;
    province.isHover = false;
    // 多个情况
    if (feature.geometry.type === "MultiPolygon") {
      feature.geometry.coordinates.forEach((coordinate) => {
        coordinate.forEach((rows) => {
          const line = drawBoundary(rows);
          const mesh = drawExtrudeMesh(rows);
          province.add(line);
          province.add(mesh);
          provinceMeshList.push(mesh);
        });
      });
    }

    // 单个情况
    if (feature.geometry.type === "Polygon") {
      feature.geometry.coordinates.forEach((coordinate) => {
        const line = drawBoundary(coordinate);
        const mesh = drawExtrudeMesh(coordinate);
        province.add(line);
        province.add(mesh);
        provinceMeshList.push(mesh);
      });
    }
    const label = drawLabelText(feature);
    labelList.push({ name: feature.properties.name, label });
    province.add(label);
    map.add(province);
  });
  map.position.set(0, 1, -1.5);
  map.scale.set(10, 10, 10);
  map.rotation.set(
    THREE.MathUtils.degToRad(-90),
    0,
    THREE.MathUtils.degToRad(20)
  );
  scene.add(map);
  setMouseEvent();
}

/**
 * 画区域分界线
 * @param {*} polygon 区域坐标点数组
 * @returns 区域分界线
 */
function drawBoundary(polygon) {
  const points = [];
  for (let i = 0; i < polygon.length; i++) {
    const [x, y] = projection(polygon[i]);
    points.push(new THREE.Vector3(x, -y, 0));
  }
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    linewidth: 2,
    transparent: true,
    depthTest: false,
  });
  const line = new THREE.Line(lineGeometry, lineMaterial);
  line.translateZ(MAP_DEPTH + 0.001);
  return line;
}
/**
 * 绘制区域多边形
 * @param {*} polygon 区域坐标点数组
 * @returns 区域多边形
 */
function drawExtrudeMesh(polygon) {
  const shape = new THREE.Shape();
  for (let i = 0; i < polygon.length; i++) {
    const [x, y] = projection(polygon[i]);
    if (i === 0) {
      shape.moveTo(x, -y);
    }
    shape.lineTo(x, -y);
  }
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: MAP_DEPTH,
    bevelEnabled: false,
    bevelSegments: 1,
    bevelThickness: 0.1,
  });
  return new THREE.Mesh(geometry, [topFaceMaterial, sideMaterial]);
}

/**
 * 绘制2d省份标签
 * @param {*} province 省份
 * @returns 省份标签
 */
function drawLabelText(province) {
  const [x, y] = projection(province.properties.center);
  const div = document.createElement("div");
  div.innerHTML = province.properties.name;
  div.style.padding = "4px 10px";
  div.style.color = "#fff";
  div.style.fontSize = "16px";
  div.style.position = "absolute";
  div.style.backgroundColor = "rgba(25,25,25,0.5)";
  div.style.borderRadius = "5px";
  div.style.pointerEvents = "none";

  const label = new CSS2DObject(div);
  label.position.set(x, y, MAP_DEPTH + 0.05);
  return label;
}

function setMouseEvent() {
  mouseEvent = handleEvent.bind(this);
  container.addEventListener("mousemove", mouseEvent);
}

function removeMouseEvent() {
  container.removeEventListener("mousemove", mouseEvent);
}

let getBoundingClientRect = container.getBoundingClientRect();
function handleEvent(e) {
  if (map) {
    let mouse = new THREE.Vector2();
    let x =
      ((e.clientX - getBoundingClientRect.left) / getBoundingClientRect.width) *
        2 -
      1;
    let y =
      -(
        (e.clientY - getBoundingClientRect.top) /
        getBoundingClientRect.height
      ) *
        2 +
      1;
    mouse.x = x;
    mouse.y = y;

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(provinceMeshList, false);
    if (intersects.length) {
      let temp = intersects[0].object;
      animation(temp.parent);
    } else {
      animation();
    }
  }
}

function animation(province) {
  if (province) {
    if (!province.isHover) {
      province.isHover = true;
      map.children.forEach((item) => {
        if (item.properties === province.properties) {
          gsap.to(province.position, {
            z: 0.12,
            duration: 0.6,
          });
        } else {
          resetAnimation(item);
        }
      });
    }
  } else {
    resetAllAnimation();
  }
}

function resetAnimation(province) {
  gsap.to(province.position, {
    z: 0,
    duration: 0.6,
    onComplete: () => {
      province.isHover = false;
    },
  });
}

function resetAllAnimation() {
  map.children.forEach((item) => {
    resetAnimation(item);
  });
}

// 重置宽高
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  css2Renderer.setSize(window.innerWidth, window.innerHeight);
});
