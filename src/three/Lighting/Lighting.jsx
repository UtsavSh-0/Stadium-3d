import React, { useState } from 'react'
import { DirectionalLightHelper, AmbientLight } from 'three'

const Lighting = () => {
  const [preset, setPreset] = useState('daylight')

  const getLighting = () => {
    switch (preset) {
      case 'daylight':
        return {
          ambient: { intensity: 0.4, color: '#ffffff' },
          directional: {
            intensity: 1.5,
            color: '#ffffff',
            position: [50, 80, 50],
            castShadow: true,
            shadow: {
              camera: {
                left: -150,
                right: 150,
                top: 150,
                bottom: -150
              }
            }
          }
        }

      case 'goldenHour':
        return {
          ambient: { intensity: 0.3, color: '#FFD700' },
          directional: {
            intensity: 1.2,
            color: '#FFA500',
            position: [30, 60, -30],
            castShadow: true
          }
        }

      case 'evening':
        return {
          ambient: { intensity: 0.2, color: '#87CEEB' },
          directional: {
            intensity: 0.8,
            color: '#FFFFFF',
            position: [50, 40, 50],
            castShadow: true
          }
        }

      case 'night':
        return {
          ambient: { intensity: 0.1, color: '#0A0A2A' },
          directional: {
            intensity: 0.4,
            color: '#FFFFFF',
            position: [50, 60, 50],
            castShadow: true
          }
        }

      default:
        return getLighting('daylight')
    }
  }

  const lighting = getLighting()

  return (
    <group>
      {/* Ambient Light - Base illumination */}
      <ambientLight
        intensity={lighting.ambient.intensity}
        color={lighting.ambient.color}
      />

      {/* Main Directional Light - Sun */}
      <directionalLight
        intensity={lighting.directional.intensity}
        color={lighting.directional.color}
        position={lighting.directional.position}
        castShadow={lighting.directional.castShadow}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={lighting.directional.shadow?.camera?.left}
        shadow-camera-right={lighting.directional.shadow?.camera?.right}
        shadow-camera-top={lighting.directional.shadow?.camera?.top}
        shadow-camera-bottom={lighting.directional.shadow?.camera?.bottom}
      />

      {/* Stadium Interior Lights */}
      <pointLight
        position={[0, 40, 0]}
        intensity={0.5}
        color="#ffffff"
        distance={80}
        decay={1.5}
      />

      {/* Roof Lighting Strips */}
      <pointLight
        position={[0, 44, 0]}
        intensity={0.3}
        color="#8B1A1A"
        distance={60}
      />
    </group>
  )
}

export default Lighting