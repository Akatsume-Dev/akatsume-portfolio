'use client'

import { useRef, useMemo, Component, ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

class OrbErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

function GoldOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  const ringGeo = useMemo(() => new THREE.TorusGeometry(1.65, 0.016, 8, 120), [])
  const sphereGeo = useMemo(() => new THREE.SphereGeometry(1, 64, 64), [])
  const innerGeo = useMemo(() => new THREE.SphereGeometry(0.82, 32, 32), [])

  const goldMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#C9A84C'),
    emissive: new THREE.Color('#7a5c10'),
    emissiveIntensity: 0.4,
    metalness: 0.95,
    roughness: 0.08,
    transparent: true,
    opacity: 0.95,
  }), [])

  const innerMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#E4C76B'),
    emissive: new THREE.Color('#C9A84C'),
    emissiveIntensity: 0.6,
    transparent: true,
    opacity: 0.12,
  }), [])

  const ring1Mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#C9A84C'),
    emissive: new THREE.Color('#C9A84C'),
    emissiveIntensity: 0.7,
    metalness: 1,
    roughness: 0.05,
    transparent: true,
    opacity: 0.75,
  }), [])

  const ring2Mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#E4C76B'),
    emissive: new THREE.Color('#E4C76B'),
    emissiveIntensity: 0.35,
    metalness: 1,
    roughness: 0.05,
    transparent: true,
    opacity: 0.32,
  }), [])

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
      <mesh ref={meshRef} geometry={sphereGeo} material={goldMat} />
      <mesh geometry={innerGeo} material={innerMat} />
      <mesh ref={ring1Ref} geometry={ringGeo} material={ring1Mat} />
      <mesh ref={ring2Ref} geometry={ringGeo} material={ring2Mat} rotation={[Math.PI / 2 + 0.9, 0.4, 0]} />
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

  const mat = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color('#C9A84C'),
    size: 0.022,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  }), [])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return <points ref={ref} geometry={geo} material={mat} />
}

export default function HeroOrb() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <OrbErrorBoundary>
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
      </OrbErrorBoundary>
    </div>
  )
}
