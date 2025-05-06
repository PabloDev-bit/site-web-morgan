'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense, useRef } from 'react';

function Canape() {
  const group = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    group.current.rotation.y += delta * 0.1;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={group} dispose={null}>
      {/* Base */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.5, 1]} />
        <meshStandardMaterial 
          color="#4a4a4a" 
          roughness={0.2} 
          metalness={0.3} 
          emissive="#002244" 
          emissiveIntensity={0.2} 
        />
      </mesh>

      {/* Dossier */}
      <mesh position={[0, 0.75, -0.45]} castShadow>
        <boxGeometry args={[3, 1, 0.1]} />
        <meshStandardMaterial 
          color="#5e5e5e" 
          roughness={0.2} 
          metalness={0.3} 
          emissive="#001122" 
          emissiveIntensity={0.15} 
        />
      </mesh>

      {/* Accoudoirs */}
      {[-1.55, 1.55].map((x) => (
        <mesh key={x} position={[x, 0.5, 0]} castShadow>
          <boxGeometry args={[0.2, 1, 1]} />
          <meshStandardMaterial 
            color="#6b6b6b" 
            roughness={0.2} 
            metalness={0.3} 
            emissive="#001122" 
            emissiveIntensity={0.15} 
          />
        </mesh>
      ))}

      {/* Coussins */}
      {[-0.7, 0.7].map((x) => (
        <mesh key={x} position={[x, 0.55, 0]} castShadow>
          <boxGeometry args={[1.2, 0.4, 0.9]} />
          <meshStandardMaterial 
            color="#999" 
            roughness={0.4} 
            metalness={0.1} 
            emissive="#001133" 
            emissiveIntensity={0.1} 
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Canape3D() {
  return (
    <Canvas 
      shadows 
      style={{ height: 450 }} 
      camera={{ position: [0, 1, 5], fov: 50 }}
    >
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />

      <ambientLight intensity={0.3} />
      <directionalLight 
        castShadow 
        position={[5, 5, 5]} 
        intensity={1.2} 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
      />

      <Suspense fallback={null}>
        <Canape />
      </Suspense>

      <OrbitControls 
        enablePan={false} 
        minDistance={3} 
        maxDistance={7} 
      />
    </Canvas>
  );
}
