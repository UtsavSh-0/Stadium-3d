import React from 'react'
import { Mesh, PlaneGeometry } from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

const Pitch = () => {
  return (
    <group>
      {/* Grass Pitch */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 80, 1, 1]} />
        <meshStandardMaterial
          color="#2e8b57"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* White Lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[0.5, 80, 1, 1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Halfway Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[120, 0.5, 1, 1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Center Circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[8, 10, 64]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Goals */}
      <group>
        {/* Left Goal */}
        <mesh position={[-50, 0.5, 0]}>
          <boxGeometry args={[0.5, 2, 8]} />
          <meshStandardMaterial color="#808080" />
        </mesh>
        <mesh position={[-50, 0.5, -4.05]}>
          <cylinderGeometry args={[0.3, 0.3, 2, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-50, 0.5, 4.05]}>
          <cylinderGeometry args={[0.3, 0.3, 2, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        {/* Right Goal */}
        <mesh position={[50, 0.5, 0]}>
          <boxGeometry args={[0.5, 2, 8]} />
          <meshStandardMaterial color="#808080" />
        </mesh>
        <mesh position={[50, 0.5, -4.05]}>
          <cylinderGeometry args={[0.3, 0.3, 2, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[50, 0.5, 4.05]}>
          <cylinderGeometry args={[0.3, 0.3, 2, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  )
}

export default Pitch