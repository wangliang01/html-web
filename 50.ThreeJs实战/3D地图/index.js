import * as THREE from "three";
import * as d3 from "d3";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
// 封装一个3D地图的类
class ThreeMap {
  defaultOptions = {
    container: "#container",
    adcode: "100000",
    mapDepth: 0.2,
  };
  constructor(options) {
    this.options = Object.assign(this.defaultOptions, options);
    this.container = document.querySelector(this.options.container);
    this.mapDepth = this.options.mapDepth;
    this.adcode = this.options.adcode;
    this.map = null;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      165,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // antialias抗锯齿
      alpha: true, // 背景透明
      logarithmicDepthBuffer: true, // 启用深度缓冲
    });
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.css2Renderer = new CSS2DRenderer();
    this.raycaster = new THREE.Raycaster();
    this.textureLoader = new THREE.TextureLoader();
    this.provinceMeshList = [];
    // 标签列表
    this.labelList = [];
    // 顶部材质
    this.topFaceMaterial = null;
    // 侧面材质
    this.sideMaterial = null;
    // 鼠标事件
    this.mouseEvent = null;
    this.cneter = [];
    // 转换坐标函数
    this.projection = null
    this.aspectRatio = window.innerWidth / window.innerHeight;
    this.cameraPosition = { x: 0, y: 0, z: 0 };
    this.fov = 0
    this.init();
  }
  async init() {
    await this.initCenter();
    this.initMap();
    this.initData();
    this.initCss2Renderer();
    this.initControl();
    this.initEvent();
  }
  async initCenter() {
    this.cneter = await this._getCenterByAdcode(this.adcode);
    this.projection = d3.geoMercator().center(this.cneter).translate([0, 0, 0]);
  }
  initMap() {
    const { renderer, scene, camera, css2Renderer, controls, container } = this;
    camera.lookAt(new THREE.Vector3(-window.innerWidth/2, -window.innerHeight/2, 0));
    camera.position.set(0, 45, 45);

    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    // 渲染
    const render = function () {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      css2Renderer.render(scene, camera);
      controls.update();
    };
    render();
  }
  initData() {
    const { adcode } = this;
    fetch(`http://192.168.100.136:8888/getGeoJson?adcode=${adcode}`)
      // fetch(`./zigong.json`)
      .then((response) => response.json())
      .then((data) => {
        this._setTexture();
        this._setSunLight();
        this._operationData(data);
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }

  initCss2Renderer() {
    const { css2Renderer } = this;
    css2Renderer.setSize(window.innerWidth, window.innerHeight);
    css2Renderer.domElement.style.position = "absolute";
    css2Renderer.domElement.style.top = "0";
    css2Renderer.domElement.style.left = "0px";
    css2Renderer.domElement.style.pointerEvents = "none";

    container.appendChild(css2Renderer.domElement);
  }
  initControl() {
    const { controls } = this;
    controls.enableDamping = true; // 启用阻尼效果,使得相机的旋转动作更加平滑，类似于物理世界中的惯性运动。
    // // 设定相机到目标点的最大和最小距离分别为 80 和 20。这可以防止相机过于远离或过于靠近场景中的对象。
    controls.maxDistance = 80;
    controls.minDistance = 20;
    controls.target.set(-1, -1, 1); // 将相机的目标焦点位置设置为坐标 (0, 0, 5)。这意味着相机将始终围绕这个点进行旋转。
    controls.maxPolarAngle = THREE.MathUtils.degToRad(80); // 设置相机的上下限为 80 度。
  }
  initEvent() {
    const { camera, renderer, css2Renderer } = this;
    // 重置宽高
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      css2Renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /*---------------私有方法---------------*/
  async _getCenterByAdcode(adcode) {
    const res = await fetch(`http://192.168.100.136:8888/getCenter?adcode=${adcode}`).then((response) => response.json());
    return res.data
  }
  //设置材质
  _setTexture() {
    const { textureLoader } = this;
    const scale = 0.2;
    const textureMap = textureLoader.load("./imgs/gz-map.jpg");
    const textureMapFx = textureLoader.load("./imgs/gz-map-fx.jpg");
    textureMap.wrapS = textureMapFx.wrapS = THREE.RepeatWrapping;
    textureMap.wrapT = textureMapFx.wrapT = THREE.RepeatWrapping;
    textureMap.flipY = textureMapFx.flipY = false;
    textureMap.rotation = textureMapFx.rotation = THREE.MathUtils.degToRad(45);
    textureMap.repeat.set(scale, scale);
    textureMapFx.repeat.set(scale, scale);
    this.topFaceMaterial = new THREE.MeshPhongMaterial({
      map: textureMap,
      color: 0xb3fffa,
      combine: THREE.MultiplyOperation,
      transparent: true,
      opacity: 1,
    });
    this.sideMaterial = new THREE.MeshLambertMaterial({
      color: 0x123024,
      transparent: true,
      opacity: 0.9,
    });
  }
  // 设置灯光
  _setSunLight() {
    const scene = this.scene;
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
  _operationData(jsondata) {
    this.map = new THREE.Group();
    const { provinceMeshList, labelList, scene, map } = this;

    // geo信息
    const features = jsondata.features;
    features.forEach((feature) => {
      // 对象
      const province = new THREE.Object3D();
      // 地址
      province.properties = feature.properties.name;
      province.isHover = false;
      // 多个情况
      if (feature.geometry.type === "MultiPolygon") {
        feature.geometry.coordinates.forEach((coordinate) => {
          coordinate.forEach((rows) => {
            const line = this._drawBoundary(rows);
            const mesh = this._drawExtrudeMesh(rows);
            province.add(line);
            province.add(mesh);
            provinceMeshList.push(mesh);
          });
        });
      }

      // 单个情况
      if (feature.geometry.type === "Polygon") {
        feature.geometry.coordinates.forEach((coordinate) => {
          const line = this._drawBoundary(coordinate);
          const mesh = this._drawExtrudeMesh(coordinate);
          province.add(line);
          province.add(mesh);
          provinceMeshList.push(mesh);
        });
      }
      const label = this._drawLabelText(feature);
      labelList.push({ name: feature.properties.name, label });
      province.add(label);
      map.add(province);
    });
    map.position.set(0, 1, -1.5);
    map.scale.set(10, 10, 10);
    map.rotation.set(
      THREE.MathUtils.degToRad(-45),
      0,
      THREE.MathUtils.degToRad(20)
    );
    scene.add(map);
    this._setMouseEvent();
  }
  /**
   * 画区域分界线
   * @param {*} polygon 区域坐标点数组
   * @returns 区域分界线
   */
  _drawBoundary(polygon) {
    const { projection } = this;
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
    line.translateZ(this.mapDepth + 0.001);
    return line;
  }
  /**
   * 绘制区域多边形
   * @param {*} polygon 区域坐标点数组
   * @returns 区域多边形
   */
  _drawExtrudeMesh(polygon) {
    const { projection, topFaceMaterial, sideMaterial } = this;
    const shape = new THREE.Shape();
    for (let i = 0; i < polygon.length; i++) {
      const [x, y] = projection(polygon[i]);
      if (i === 0) {
        shape.moveTo(x, -y);
      }
      shape.lineTo(x, -y);
    }
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: this.mapDepth,
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
  _drawLabelText(province) {
    const { projection, mapDepth } = this;
    if (!province.properties.center) return ''
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
    label.position.set(x, -y, mapDepth + 0.5);
    return label;
  }
  _setMouseEvent() {
    const { container, _handleEvent } = this;
    this.mouseEvent = _handleEvent.bind(this);
    container.addEventListener("mousemove", this.mouseEvent);
  }
  _handleEvent(e) {
    const { raycaster, map, camera, provinceMeshList } = this;
    let getBoundingClientRect = container.getBoundingClientRect();
    if (map) {
      let mouse = new THREE.Vector2();
      let x =
        ((e.clientX - getBoundingClientRect.left) /
          getBoundingClientRect.width) *
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
        this._animation(temp.parent);
      } else {
        this._animation();
      }
    }
  }
  _animation(province) {
    const { map } = this;

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
            this._resetAnimation(item);
          }
        });
      }
    } else {
      this._resetAllAnimation();
    }
  }

  _resetAnimation(province) {
    gsap.to(province.position, {
      z: 0,
      duration: 0.6,
      onComplete: () => {
        province.isHover = false;
      },
    });
  }

  _resetAllAnimation() {
    const { map } = this;
    map.children.forEach((item) => {
      this._resetAnimation(item);
    });
  }
}

const map = new ThreeMap({
  container: "#container",
});
