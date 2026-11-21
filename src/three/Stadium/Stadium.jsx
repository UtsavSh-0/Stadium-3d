import React from 'react'
import { useGLTF } from '@react-three/drei'

const Stadium = () => {
  return (
    <group>
      {/* Stadium Bowl Structure - Oval */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <torusGeometry args={[78, 3, 16, 100]} />
        <meshStandardMaterial
          color="#4a4a4a"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Main Roof - White Membrane */}
      <mesh position={[0, 45, 0]}>
        <cylinderGeometry args={[85, 85, 2, 32]} />
        <meshStandardMaterial
          color="#f5f5f5"
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* Roof Support Structures */}
      <group position={[0, 35, 0]}>
        <mesh position={[-70, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 20, 8]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.4} roughness={0.3} />
        </mesh>
        <mesh position={[70, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 20, 8]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.4} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, -70]}>
          <cylinderGeometry args={[1.5, 1.5, 20, 8]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.4} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 70]}>
          <cylinderGeometry args={[1.5, 1.5, 20, 8]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.4} roughness={0.3} />
        </mesh>
      </group>

      {/* Outer Structure */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 2, 0]}>
        <torusGeometry args={[83, 6, 12, 80]} />
        <meshStandardMaterial
          color="#3a3a3a"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Floodlights */}
      <group>
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const radius = 90
          return (
            <group key={i} position={[Math.cos(angle) * radius, 50, Math.sin(angle) * radius]}>
              <mesh rotation={[0, angle + Math.PI / 2, Math.PI / 2]}>
                <cylinderGeometry args={[0.2, 0.2, 15, 8]} />
                <meshStandardMaterial color="#2c3e50" metalness={0.5} roughness={0.3} />
              </mesh>
              <pointLight
                position={[0, 10, 0]}
                intensity={2}
                color="#f5f5f5"
                distance={100}
                decay={2}
              />
            </group>
          )
        })}
      </group>
    </group>
  )
}

export default Stadium