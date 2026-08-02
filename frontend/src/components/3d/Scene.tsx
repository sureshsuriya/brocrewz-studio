
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GlassCube = ({ position, color, scale }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(Math.random() * 100);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      time.current += delta;
      // Rotation
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      // Float
      meshRef.current.position.y = position[1] + Math.sin(time.current) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      {/* @ts-ignore */}
      <meshPhysicalMaterial 
        color={color} 
        transmission={0.9} 
        opacity={1} 
        metalness={0} 
        roughness={0} 
        ior={1.5} 
        thickness={0.5} 
        specularIntensity={1} 
      />
    </mesh>
  );
};

const SimpleParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  const particlesCount = 200;
  const posArray = new Float32Array(particlesCount * 3);
  for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* @ts-ignore */}
        <bufferAttribute 
          attach="attributes-position" 
          count={particlesCount} 
          array={posArray} 
          itemSize={3} 
        />
      </bufferGeometry>
      {/* @ts-ignore */}
      <pointsMaterial size={0.05} color="#D4AF37" transparent opacity={0.6} />
    </points>
  );
};

const CinematicScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="w-full h-full">
      {/* @ts-ignore */}
      <ambientLight intensity={0.5} />
      {/* @ts-ignore */}
      <directionalLight position={[10, 10, 5]} intensity={1} color="#D4AF37" />
      {/* @ts-ignore */}
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4F8CFF" />
      
      <SimpleParticles />
      
      <GlassCube position={[-3, 1, -2]} color="#D4AF37" scale={1.5} />
      <GlassCube position={[3, -1, -3]} color="#4F8CFF" scale={1.2} />
      <GlassCube position={[0, -2, -5]} color="#C9CDD4" scale={2} />
    </Canvas>
  );
};

export default CinematicScene;
