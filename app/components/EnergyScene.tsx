"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, PerspectiveCamera } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function EnergyCore() {
  const group = useRef<THREE.Group>(null);
  const orb = useRef<THREE.Mesh>(null);
  const panel = useRef<THREE.Group>(null);

  const linePoints = useMemo(() => {
    return Array.from({ length: 18 }, (_, row) => {
      const z = row * 0.42 - 3.6;
      return [
        new THREE.Vector3(-3.8, -1.15, z),
        new THREE.Vector3(3.8, -1.15, z),
      ];
    });
  }, []);

  const verticalPoints = useMemo(() => {
    return Array.from({ length: 13 }, (_, col) => {
      const x = col * 0.64 - 3.84;
      return [
        new THREE.Vector3(x, -1.15, -3.6),
        new THREE.Vector3(x, -1.15, 3.6),
      ];
    });
  }, []);

  useFrame(({ clock, pointer }) => {
    const time = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = pointer.x * 0.16 + Math.sin(time * 0.22) * 0.08;
      group.current.rotation.x = -0.28 + pointer.y * 0.08;
    }
    if (orb.current) {
      const scale = 1 + Math.sin(time * 1.8) * 0.06;
      orb.current.scale.setScalar(scale);
    }
    if (panel.current) {
      panel.current.rotation.z = Math.sin(time * 0.35) * 0.035;
    }
  });

  return (
    <group ref={group} position={[0, -0.15, 0]}>
      <group ref={panel} rotation={[-0.9, 0, 0]} position={[0, -0.25, 0]}>
        {linePoints.map((points, index) => (
          <Line key={`h-${index}`} points={points} color="#19e08a" transparent opacity={0.24} lineWidth={1} />
        ))}
        {verticalPoints.map((points, index) => (
          <Line key={`v-${index}`} points={points} color="#00c853" transparent opacity={0.18} lineWidth={1} />
        ))}
        <mesh position={[0, -1.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[8.2, 8.2, 24, 24]} />
          <meshStandardMaterial color="#06231a" metalness={0.38} roughness={0.44} transparent opacity={0.46} />
        </mesh>
      </group>

      <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.45}>
        <mesh ref={orb} position={[0, 0.45, 0]}>
          <icosahedronGeometry args={[1.15, 4]} />
          <meshStandardMaterial color="#19e08a" emissive="#0a8f4f" emissiveIntensity={0.6} metalness={0.52} roughness={0.18} wireframe />
        </mesh>
        <mesh position={[0, 0.45, 0]}>
          <sphereGeometry args={[0.72, 32, 32]} />
          <meshStandardMaterial color="#00c853" emissive="#00a84d" emissiveIntensity={0.35} roughness={0.22} transparent opacity={0.28} />
        </mesh>
      </Float>

      {Array.from({ length: 10 }, (_, index) => {
        const angle = (index / 10) * Math.PI * 2;
        const radius = 2.3 + (index % 3) * 0.34;
        return (
          <Float key={index} speed={1 + index * 0.08} rotationIntensity={0.6} floatIntensity={0.8}>
            <mesh position={[Math.cos(angle) * radius, Math.sin(index) * 0.35, Math.sin(angle) * radius]}>
              <boxGeometry args={[0.42, 0.05, 0.28]} />
              <meshStandardMaterial color={index % 2 ? "#00c853" : "#19e08a"} emissive={index % 2 ? "#1f7a3d" : "#0a8f4f"} emissiveIntensity={0.32} metalness={0.45} roughness={0.24} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

export function EnergyScene() {
  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <PerspectiveCamera makeDefault position={[0, 1.2, 6.4]} fov={42} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 4, 5]} intensity={1.8} color="#e8fbff" />
        <pointLight position={[-3, 1, 2]} intensity={4} color="#19e08a" />
        <pointLight position={[3, -1, -2]} intensity={3.2} color="#00c853" />
        <EnergyCore />
      </Canvas>
    </div>
  );
}
