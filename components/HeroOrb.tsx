'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function GoldOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  const ringGeo = useMemo(() => new THREE.TorusGeometry(1.65, 0.016, 8, 120), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15
      meshRef.current.rotation.z = t * 0.07
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.09
      ring1Ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.15
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.06
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.12
    }
  })

  return (
    <group ref={groupRef}>
      {/* Core distorted sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 80, 80]} />
        <MeshDistortMaterial
          color="#C9A84C"
          emissive="#7a5c10"
          emissiveIntensity={0.4}
          metalness={0.95}
          roughness={0.08}
          distort={0.3}
          speed={1.5}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.82, 32, 32]} />
        <meshStandardMaterial
          color="#E4C76B"
          emissive="#C9A84C"
          emissiveIntensity={0.6}
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Ring 1 */}
      <mesh ref={ring1Ref} geometry={ringGeo}>
        <meshStandardMaterial
          color="#C9A84C"
          emissive="#C9A84C"
          emissiveIntensity={0.7}
          metalness={1}
          roughness={0.05}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref} geometry={ringGeo} rotation={[Math.PI / 2 + 0.9, 0.4, 0]}>
        <meshStandardMaterial
          color="#E4C76B"
          emissive="#E4C76B"
          emissiveIntensity={0.35}
          metalness={1}
          roughness={0.05}
          transparent
          opacity={0.32}
        />
      </mesh>
    </group>
  )
}

function Particles() {
  const ref = useRef<THREE.Points>(null)

  const geo = useMemo(() => {
    const count = 55
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 1.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#C9A84C" size={0.022} transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

export default function HeroOrb() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[4, 3, 3]} intensity={2.5} color="#C9A84C" />
        <pointLight position={[-3, -2, -2]} intensity={1} color="#E4C76B" />
        <pointLight position={[0, 0, 5]} intensity={0.6} color="#ffffff" />
        <GoldOrb />
        <Particles />
      </Canvas>
    </div>
  )
}
