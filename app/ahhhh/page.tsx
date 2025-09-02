'use client';
import { useRef, useState, useEffect } from "react";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, TransformControls } from "@react-three/drei";
import { TextureLoader } from "three";
import * as THREE from 'three'
import styles from "./page.module.css";

function Background() {
  const { scene } = useThree();

  const loader = new TextureLoader();
  const texture = loader.load(
      "/tears_of_steel_bridge_2k_robot5.jpg",
  );
  texture.magFilter = THREE.LinearFilter; // what the flip is this?
  texture.minFilter = THREE.LinearFilter; // what the flip is this?
  texture.colorSpace = THREE.SRGBColorSpace;

  const shader = THREE.ShaderLib.equirect;

  const material = new THREE.ShaderMaterial({
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide,
  });

  material.uniforms.tEquirect.value = texture;
  const plane = new THREE.SphereGeometry(20, 20, 20);

  const bgMesh = new THREE.Mesh(plane, material);
  scene.add(bgMesh);

  // scene.background = texture;
  return null;
}

type HotspotProps = {
  position: [number, number, number] | THREE.Vector3;
  label: string;
  onClick?: () => void;
};

function Hotspot({ position, label, onClick }: HotspotProps){ 
  return (
    <group position={position}>
      {/* Small sphere marker at a fixed spot */}
      <mesh onClick={onClick}> 
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.6} /> 
      </mesh> 
      {/* Optional label that stays attached to the 3D point */} 
      <Html center distanceFactor={25}>
          <div style={{ background: "rgba(0,0,0,0.7)", color: "white", padding: "10px 16px", borderRadius: "12px", fontSize: "96px", fontWeight: "bold", pointerEvents: "none", }} > 
            {label} 
          </div> 
        </Html> 
      </group> 
    ); 
  }

type HotspotImageProps = {
  position: [number, number, number] | THREE.Vector3;
  src: string;
  width?: number;   // optional, default value
  height?: number;  // optional, default value
  onClick?: () => void;
};

function HotspotImage({ position, src, width = 10, height = 10, onClick }: HotspotImageProps) {
  const texture = useLoader(THREE.TextureLoader, src); //HOW TO CREATE CSS OUTLINE ON THE TEXTURE????
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  // Make the plane always face the camera
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
    }
  });

  return (
    <mesh ref={meshRef} position={position} onClick={onClick}>
      <planeGeometry args={[width, height]} /> {/* use props */}
      <meshBasicMaterial map={texture} transparent /> {/* keep transparency if PNG */}
    </mesh>
  );
}

function DebugMarker({ initialPosition }: { initialPosition: THREE.Vector3 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const transformRef = useRef<any>(null);
  const [position, setPosition] = useState(initialPosition);

  const { camera, gl } = useThree();

  // Only assign object when mesh exists
  useEffect(() => {
    if (meshRef.current && transformRef.current) {
      transformRef.current.attach(meshRef.current);
    }
  }, []);

  // Keep marker on sphere
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(
        meshRef.current.position.clone().normalize().multiplyScalar(19.9)
      );
      setPosition(meshRef.current.position.clone());
    }
  });

  return (
    <>
      <TransformControls ref={transformRef} camera={camera} domElement={gl.domElement} />
      <mesh
        ref={meshRef}
        position={position}
        // onClick={() =>
        //   alert(
        //     `Marker position: [${position.x.toFixed(2)}, ${position.y.toFixed(
        //       2
        //     )}, ${position.z.toFixed(2)}]`
        //   )
        // }
        onClick={() => {
          const originalVectorLength = Math.sqrt(5*5 + 1*1 + (-5)*(-5));
          const radius = 19.9;
          
          // Convert current marker position back to "HotspotImage-style" coordinates
          const hotspotStylePos = position.clone().divideScalar(radius).multiplyScalar(originalVectorLength);

          alert(
            `Hotspot-style position: [${hotspotStylePos.x.toFixed(2)}, ${hotspotStylePos.y.toFixed(2)}, ${hotspotStylePos.z.toFixed(2)}]`
          );
        }}
      >
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
}

export default function TeaserPage() {
  return (
    <div className={styles.page}>
      <div>
        <Canvas camera={{ position: [0, 0, 10], fov: 120}}>
          <OrbitControls/>
          <Background />
          
          {/* BIRD MAN */}
          <HotspotImage
            position={new THREE.Vector3(1.7, 1.9, 6.34).normalize().multiplyScalar(19.9)}
            src="/panorama/birdwarp.png"
            width={10}   // custom width
            height={30}   // custom height
            onClick={() => alert("clicked on: MR BIRD")}
          />

          {/* BIRD MAN LABEL */}
          {/* <Hotspot
            position={new THREE.Vector3(-1.7, 1.9, 6.34).normalize().multiplyScalar(19.9)}
            label="MR BIRD"
            onClick={() => alert("clicked on: MR BIRD")}
          /> */}

          <DebugMarker initialPosition={new THREE.Vector3(5, 1, -5)} />

          <ambientLight intensity={0.5}/>
          <spotLight intensity={400} position={[0, 5, 10]} angle={0.3} />
        </Canvas>
      </div>
    </div>
  );
  }