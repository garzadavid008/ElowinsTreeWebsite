'use client';
import { useRef, useState, useEffect } from "react";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, TransformControls } from "@react-three/drei";

import { TextureLoader } from "three";
import * as THREE from 'three'

import styles from "./page.module.css";
import Unmute from "@/components/Unmute"
import Mute from "@/components/Mute"

function Background() {

  const texture = useLoader(THREE.TextureLoader, "/tears_of_steel_bridge_2k.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;

  const { scene } = useThree();
  scene.background = texture;

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
          <div className={styles.hotspotText} > 
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
  // useFrame(() => {
  //   if (meshRef.current) {
  //     meshRef.current.lookAt(camera.position);
  //   }
  // });

  // A better implementation that locks the roll so the plane stays upright
  useFrame(() => {
    if (meshRef.current) {
      // Copy camera quaternion
      const target = new THREE.Vector3();
      camera.getWorldPosition(target);

      // Look at camera, but force the "up" vector to world up (0,1,0)
      meshRef.current.lookAt(target.x, meshRef.current.position.y, target.z);
    }
  });


  return (
    <group>
        <mesh ref={meshRef} position={position} onClick={onClick}>
            <planeGeometry args={[width, height]} /> {/* use props */}
            <meshBasicMaterial map={texture} transparent /> {/* keep transparency if PNG */}
        </mesh>
    </group>
  );
}

// function DebugMarker({ initialPosition }: { initialPosition: THREE.Vector3 }) {
//   const meshRef = useRef<THREE.Mesh>(null);
//   const transformRef = useRef<any>(null);
//   const [position, setPosition] = useState(initialPosition);

//   const { camera, gl } = useThree();

//   // Only assign object when mesh exists
//   useEffect(() => {
//     if (meshRef.current && transformRef.current) {
//       transformRef.current.attach(meshRef.current);
//     }
//   }, []);

//   // Keep marker on sphere
//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.position.copy(
//         meshRef.current.position.clone().normalize().multiplyScalar(19.9)
//       );
//       setPosition(meshRef.current.position.clone());
//     }
//   });

//   return (
//     <>
//       <TransformControls ref={transformRef} camera={camera} domElement={gl.domElement} />
//       <mesh
//         ref={meshRef}
//         position={position}
//         // onClick={() =>
//         //   alert(
//         //     `Marker position: [${position.x.toFixed(2)}, ${position.y.toFixed(
//         //       2
//         //     )}, ${position.z.toFixed(2)}]`
//         //   )
//         // }
//         onClick={() => {
//           const originalVectorLength = Math.sqrt(5*5 + 1*1 + (-5)*(-5));
//           const radius = 19.9;
          
//           // Convert current marker position back to "HotspotImage-style" coordinates
//           const hotspotStylePos = position.clone().divideScalar(radius).multiplyScalar(originalVectorLength);

//           alert(
//             `Hotspot-style position: [${hotspotStylePos.x.toFixed(2)}, ${hotspotStylePos.y.toFixed(2)}, ${hotspotStylePos.z.toFixed(2)}]`
//           );
//         }}
//       >
//         <sphereGeometry args={[0.5, 16, 16]} />
//         <meshStandardMaterial color="red" />
//       </mesh>
//     </>
//   );
// }

export default function TeaserPage() {
    const [active, setActive] = useState<"Cloud Catching" | "Bird in the Hand" | "wireBox"| "Flashback" | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [soundOn, setSoundOn] = useState(true);

    const handleImageClick = (song: "Cloud Catching" | "Bird in the Hand" | "wireBox" | "Flashback") => {
        if (active === song){
            const link = document.createElement("a");
            link.href = `/${song}.wav`
            link.download = song
            link.click()
        } else {
            setActive(song)
        }
    }

    const resetAll = () => setActive(null);

    useEffect(() =>{
        if (audioRef.current) {
            audioRef.current.muted = !soundOn;
            if (active) audioRef.current.play();
          }
    }, [active, soundOn]);

  return (
    <div className={styles.page}>

      <div className="relative w-full h-screen">
      {active != null && (
            <div className={styles.soundContainer} onClick={() => setSoundOn(prev => !prev)}>
                <span>
                    {soundOn ? <Unmute/> : <Mute/>}
                </span>
                <audio ref={audioRef} src={`/sounds/${active} Sample.mp3`} loop/>
            </div>
        )} 

        <Canvas 
            camera={{ position: [0, 0, 10], fov: 120}}
            onPointerMissed={() => resetAll()}
        >

          <OrbitControls/>

          <Background /> 

          {/* AMOND */}
          <HotspotImage
            position={new THREE.Vector3(-8, 3, 13.29).normalize().multiplyScalar(19.9)}
            src="/panorama/amondwarp.png"
            width={10}   // custom width
            height={26}   // custom height
            onClick={() => handleImageClick("Flashback")}
          />

          {/* AMOND LABEL */}
          {active === "Flashback" && (
            <Hotspot
                position={new THREE.Vector3(-8, 15, 13.29).normalize().multiplyScalar(19.9)}
                label="Download Flashback.wav"
            />
          )}
          
          {/* BIRD MAN */}
          <HotspotImage
            position={new THREE.Vector3(2.5, 1.7, 7.00).normalize().multiplyScalar(19.9)}
            src="/panorama/birdwarp.png"
            width={10}   // custom width
            height={30}   // custom height
            onClick={() => handleImageClick("Bird in the Hand")}
            />

          {/* BIRD MAN LABEL */}
          {active === "Bird in the Hand" && (
            <Hotspot
                position={new THREE.Vector3(2.5, 9.00, 7.00).normalize().multiplyScalar(19.9)}
                label="Download Bird in the Hand.wav"
            />
          )}

          {/* CloudCatching */}
          <HotspotImage
            position={new THREE.Vector3(6.90, 1.38, -2.50).normalize().multiplyScalar(20)}
            src="/panorama/cloudwarp.png"
            width={25}   // custom width
            height={36}   // custom height
            onClick={() => handleImageClick("Cloud Catching")}
          />

          {/* Cloud Catching */}
          {active === "Cloud Catching" && (
            <Hotspot
                position={new THREE.Vector3(8.90, 9.38, -2.50).normalize().multiplyScalar(19.9)}
                label="Download Cloud Catching.wav"
            />
          )}


          {/* <DebugMarker initialPosition={new THREE.Vector3(5, 1, -5)} /> */}

          {/* WIREBOX */}
          <HotspotImage
            position={new THREE.Vector3(-4.15, -2, -5.24).normalize().multiplyScalar(19.9)}
            src="/panorama/wirewarp.png"
            width={11}   // custom width
            height={11}   // custom height
            onClick={() => handleImageClick("wireBox")}
          />

          {/* WIREBOX LABEL */}
          {active === "wireBox" && (
            <Hotspot
                position={new THREE.Vector3(-4.15, 1, -5.24).normalize().multiplyScalar(19.9)}
                label="Download wireBox.wav"
            />
          )}

          {/* <DebugMarker initialPosition={new THREE.Vector3(5, 1, -5)} /> */}

          <ambientLight intensity={0.5}/>
        
          <spotLight intensity={400} position={[0, 5, 10]} angle={0.3} />

        </Canvas>
      </div>
    </div>
  );
  }