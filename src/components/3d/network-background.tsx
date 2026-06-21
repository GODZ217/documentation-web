"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const NODE_COUNT = 80
const CONNECTION_DISTANCE = 2.5
const SPREAD = 8

function Nodes() {
  const meshRef = useRef<THREE.Points>(null!)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(NODE_COUNT * 3)
    for (let i = 0; i < NODE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * SPREAD
      pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD
      pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    return geo
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.03
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1
  })

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        color="#60A5FA"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function Connections() {
  const lineRef = useRef<THREE.LineSegments>(null!)

  const geometry = useMemo(() => {
    const nodes: THREE.Vector3[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * SPREAD,
          (Math.random() - 0.5) * SPREAD,
          (Math.random() - 0.5) * SPREAD,
        ),
      )
    }

    const pairs: number[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j])
        if (dist < CONNECTION_DISTANCE && Math.random() < 0.15) {
          pairs.push(nodes[i].x, nodes[i].y, nodes[i].z)
          pairs.push(nodes[j].x, nodes[j].y, nodes[j].z)
        }
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pairs, 3))
    return geo
  }, [])

  useFrame((state) => {
    if (!lineRef.current) return
    lineRef.current.rotation.y = state.clock.elapsedTime * 0.03
    lineRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1
  })

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#3B82F6" transparent opacity={0.15} />
    </lineSegments>
  )
}

function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null!)

  const orbs = useMemo(() => {
    const items: {
      position: [number, number, number]
      color: string
      size: number
    }[] = []
    const colors = ["#60A5FA", "#818CF8", "#34D399", "#F472B6", "#FBBF24"]
    for (let i = 0; i < 12; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.5 + Math.random() * 3
      items.push({
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ],
        color: colors[i % colors.length],
        size: 0.04 + Math.random() * 0.06,
      })
    }
    return items
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.015) * 0.08
  })

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position}>
          <sphereGeometry args={[orb.size, 8, 8]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <Nodes />
      <Connections />
      <FloatingOrbs />
    </>
  )
}

export function NetworkBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
