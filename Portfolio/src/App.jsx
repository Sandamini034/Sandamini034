import * as THREE from "three"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import {useRef, useEffect} from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function App() {

  const mountRef = useRef(null);

  useEffect(() => {
  const canvas = mountRef.current;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(window.innerWidth, window.innerHeight);

  const loader = new GLTFLoader();
  loader.load(
    './mask_man.glb',
    (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.5, 0.7, 0.5);
      scene.add(model);
    },
    undefined,
    (error) => {
      console.error('Error loading model:', error);
    }
  )

  const controls = new OrbitControls(camera,renderer.domElement);
  controls.update();

  const resize = () =>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  const animate = ()=>{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  camera.position.z = 5;
  animate();

  window.addEventListener("resize",resize);

  return()=>{
    window.removeEventListener("resize",resize);
    renderer.dispose();
  }

  },[])

  return (
    <canvas ref={mountRef} style={{display:"block"}}></canvas>
  )
}

export default App
