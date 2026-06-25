'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei'
import * as THREE from 'three'

function GoldOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current || !ringRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.12
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.06
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.08
    ringRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.15
  })

  const ringGeometry = useMemo(() => new THREE.TorusGeometry(1.7, 0.018, 8, 120), [])

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      {/* Core orb */}
      <Sphere ref={meshRef} args={[1, 80, 80]}>
        <MeshDistortMaterial
          color="#C9A84C"
          emissive="#8B6914"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
          distort={0.35}
          speed={1.5}
          transparent
          opacity={0.92}
        />
      </Sphere>

      {/* Inner glow sphere */}
      <Sphere args={[0.85, 40, 40]}>
        <meshStandardMaterial
          color="#E4C76B"
          emissive="#C9A84C"
          emissiveIntensity={0.5}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Orbit ring */}
      <mesh ref={ringRef} geometry={ringGeometry}>
        <meshStandardMaterial
          color="#C9A84C"
          emissive="#C9A84C"
          emissiveIntensity={0.6}
          metalness={1}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Second tilted ring */}
      <mesh geometry={ringGeometry} rotation={[Math.PI / 2 + 0.8, 0.5, 0]}>
        <meshStandardMaterial
          color="#E4C76B"
          emissive="#E4C76B"
          emissiveIntensity={0.3}
          metalness={1}
          roughness={0.1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  )
}

function Particles() {
  const count = 60
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  const pointsRef = useRef<THREE.Points>(null)
  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#C9A84C" size={0.025} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function HeroOrb() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 3, 3]} intensity={2} color="#C9A84C" />
        <pointLight position={[-3, -2, -3]} intensity={0.8} color="#E4C76B" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />
        <GoldOrb />
        <Particles />
      </Canvas>
    </div>
  )
}
