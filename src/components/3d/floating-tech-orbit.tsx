"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const TECH_COLORS = ["#60A5FA", "#34D399", "#F472B6", "#FBBF24", "#818CF8", "#22D3EE"]
const RING_COUNT = 3
const ICONS_PER_RING = 8

function TechRing({ radius, yOffset, color, speed, phase }: { radius: number; yOffset: number; color: string; speed: number; phase: number }) {
  const groupRef = useRef<THREE.Group>(null!)
  const ringRef = useRef<THREE.Mesh>(null!)

  const iconPositions = useMemo(() => {
    const pos: { angle: number; scale: number }[] = []
    for (let i = 0; i < ICONS_PER_RING; i++) {
      pos.push({
        angle: (i / ICONS_PER_RING) * Math.PI * 2,
        scale: 0.08 + Math.random() * 0.06,
      })
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * speed + phase
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + phase) * 0.1
  })

  return (
    <group ref={groupRef} position={[0, yOffset, 0]}>
      {/* Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Orbiting dots */}
      {iconPositions.map((icon, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(icon.angle) * radius,
            Math.sin(icon.angle) * radius * 0.3,
            Math.sin(icon.angle) * radius,
          ]}
        >
          <sphereGeometry args={[icon.scale, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      ))}

      {/* Glow dot */}
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      {Array.from({ length: RING_COUNT }).map((_, i) => (
        <TechRing
          key={i}
          radius={1.2 + i * 0.8}
          yOffset={(i - 1) * 0.3}
          color={TECH_COLORS[i % TECH_COLORS.length]}
          speed={0.1 + i * 0.05}
          phase={i * 1.5}
        />
      ))}
    </>
  )
}

export function FloatingTechOrbit() {
  return (
    <div className="w-full h-[400px] relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
