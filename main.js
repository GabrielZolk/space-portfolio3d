import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(170);
renderer.render(scene, camera)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; 
controls.enablePan = false; 

function addStars() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(450));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(2000).fill().forEach(addStars);

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture;

// const moonTexture2 = new THREE.TextureLoader().load('moonmap.jpg')

// const moonTexture = new THREE.TextureLoader().load('moon.jpg')
// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial({
//     map: moonTexture,
//     normalMap: moonTexture2
//   })
// );
// scene.add(moon)

// moon.position.set(30, 0, 0);

const loader = new GLTFLoader();

loader.load('./models/solar_system2/scene.gltf', function (gltf) {
  const solarSystem = gltf.scene;
  scene.add(solarSystem);
  solarSystem.position.set(-10, 0, 0);
});

loader.load('./models/rocket/scene.gltf', function (gltf) {
  const rocket = gltf.scene;
  scene.add(rocket);
  rocket.position.set(-32, -10, 25);
  rocket.rotation.x = 5;
});

loader.load('./models/cartoon_rocket/scene.gltf', function (gltf) {
  const cartooRocket = gltf.scene;
  scene.add(cartooRocket);
  cartooRocket.position.set(-20, 20, 25);
  cartooRocket.rotation.x = 10;
});

loader.load('./models/astronaut_swimming/scene.gltf', function (gltf) {
  const astronaut = gltf.scene;
  scene.add(astronaut);
  astronaut.position.set(-10, -10, 150);
  astronaut.rotation.y = 10;
});


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  const rotationAngle = -0.001;

  camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationAngle);
  camera.lookAt(scene.position);

  // moon.rotation.y += 0.001;
  controls.update();
}

animate();
