import * as THREE from "three/webgpu";
import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import getLayer from "./getLayer";

const bgSprites = getLayer({
  numSprites: 8,
  radius: 10,
  z: -10.5,
  size: 24,
  opacity: 0.2,
  path: "./rad-grad.png"
})

function IcoSphere() {
  const ref = React.useRef<THREE.Mesh>(null!);

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry />
      <meshStandardMaterial color={0xffff00} />
    </mesh>
  );
}

function App() {
  return (
    <Canvas gl={async (props) => {
      const renderer = new THREE.WebGPURenderer({
        canvas: props.canvas instanceof HTMLCanvasElement ? props.canvas : undefined,
        antialias: props.antialias ?? true,
        alpha: props.alpha ?? true,
        powerPreference: "high-performance",
      });
      await renderer.init();
      return renderer;
    }}>
      <IcoSphere />
      <hemisphereLight args={[0xffffff, 0x000000, 1.0]} />
      <primitive object={bgSprites} />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
