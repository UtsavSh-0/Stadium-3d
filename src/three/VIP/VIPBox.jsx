import React from 'react'
import { View } from '@react-three/drei'

const VIPBox = ({ onUpgrade }) => {
  return (
    <group>
      {/* VIP Skybox Structure */}
      <mesh position={[0, 42, 45]}>
        <boxGeometry args={[30, 8, 20]} />
        <meshStandardMaterial
          color="#f0f0f0"
          roughness={0.1}
          metalness={0.4}
          transparent={true}
          opacity={0.95}
        />
      </mesh>

      {/* Glass Windows */}
      <mesh position={[-14, 42, 45]}>
        <boxGeometry args={[2, 6, 20]} />
        <meshStandardMaterial
          color="#87CEEB"
          roughness={0.05}
          metalness={0.7}
          transparent={true}
          opacity={0.3}
          emissive={0.1}
          emissiveColor="#ffffff"
        />
      </mesh>

      <mesh position={[14, 42, 45]}>
        <boxGeometry args={[2, 6, 20]} />
        <meshStandardMaterial
          color="#87CEEB"
          roughness={0.05}
          metalness={0.7}
          transparent={true}
          opacity={0.3}
          emissive={0.1}
          emissiveColor="#ffffff"
        />
      </mesh>

      {/* VIP Furniture - Lounge Seats */}
      <group position={[0, 38, 50]}>
        <mesh position={[-4, 0, 0]}>
          <boxGeometry args={[3, 1, 3]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[4, 0, 0]}>
          <boxGeometry args={[3, 1, 3]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.3} roughness={0.4} />
        </mesh>
      </group>

      {/* VIP Table */}
      <mesh position={[0, 39, 45]}>
        <boxGeometry args={[8, 0.5, 4]} />
        <meshStandardMaterial color="#8B1A1A" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* VIP Badge */}
      <mesh position={[0, 40, 36]}>
        <boxGeometry args={[2, 1.5, 0.3]} />
        <meshStandardMaterial color="#ff6b35" emissive={0.2} emissiveColor="#ff6b35" />
      </mesh>

      {/* Upgrade Button */}
      <mesh position={[0, 43, 45]} onClick={onUpgrade}>
        <boxGeometry args={[4, 0.5, 2]} />
        <meshStandardMaterial color="#28a745" />
      </mesh>
    </group>
  )
}

export default VIPBox