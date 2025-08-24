'use client';
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";
import * as THREE from 'three'
import styles from "./page.module.css";

function Background() {
  const { scene } = useThree();

  const loader = new TextureLoader();
  const texture = loader.load(
      "https://threejsfundamentals.org/threejs/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg"
  );
  texture.magFilter = THREE.LinearFilter; // what the flip is this?
  texture.minFilter = THREE.LinearFilter; // what the flip is this?

  const shader = THREE.ShaderLib.equirect;

  const material = new THREE.ShaderMaterial({
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide
  });

  material.uniforms.tEquirect.value = texture;
  const plane = new THREE.SphereGeometry(20, 20, 20);

  const bgMesh = new THREE.Mesh(plane, material);
  scene.add(bgMesh);

  // scene.background = texture;
  return null;
}

export default function TeaserPage() {
  return (
    <div className={styles.page}>
      <div>
        <Canvas camera={{ position: [0, 0, 40], fov: 120}}>
          <OrbitControls/>
          <Background />
          <ambientLight intensity={0.5}/>
          <spotLight intensity={400} position={[0, 5, 10]} angle={0.3} />
        </Canvas>
      </div>
    </div>
  );
  }