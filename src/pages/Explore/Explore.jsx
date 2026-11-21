import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stars, Html } from '@react-three/drei'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Stadium from '../../three/Stadium/Stadium.jsx'
import Pitch from '../../three/Pitch/Pitch.jsx'
import Lighting from '../../three/Lighting/Lighting.jsx'
import Seats from '../../three/Seats/Seats.jsx'
import { SEATS_DATA } from '../../three/Seats/SeatData.js'

const Explore = () => {
  const [lightingPreset, setLightingPreset] = useState('daylight')
  const [hoveredSeat, setHoveredSeat] = useState(null)
  const cameraPresets = useRef({
    aerial: [0, 80, 150],
    stand: [0, 60, 120],
    block: [0, 45, 100],
    seat: [0, 35, 80]
  })

  const handleLightingChange = (preset) => {
    gsap.to(cameraPresets.current, {
      duration: 1,
      ease: 'power2.inOut'
    })
    setLightingPreset(preset)
  }

  const handleSeatSelect = (seat) => {
    setHoveredSeat(seat)
  }

  return (
    <div className="h-screen w-full relative">
      {/* 3D Scene */}
      <Canvas
        camera={{ position: cameraPresets.current.aerial, fov: 40 }}
        className="absolute inset-0"
      >
        <color attach="background" args={['#0a0a1a']} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[50, 80, 50]} intensity={0.8} />

        <Stadium />
        <Pitch />
        <Lighting />

        <Seats
          hoveredSeat={hoveredSeat}
          setHoveredSeat={setHoveredSeat}
          onSelect={handleSeatSelect}
        />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={40}
          maxDistance={300}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          makeDefault
        />

        <Environment preset="sunset" />
      </Canvas>

      {/* Control Panel */}
      <div className="absolute top-6 left-6 bg-stadium-charcoal/80 backdrop-blur-md p-6 rounded-xl border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-4">Lighting</h3>

        <div className="space-y-3">
          {['daylight', 'goldenHour', 'evening', 'night'].map((preset) => (
            <button
              key={preset}
              onClick={() => handleLightingChange(preset)}
              className={`w-full px-4 py-2 rounded-lg transition-all duration-300 ${
                lightingPreset === preset
                  ? 'bg-stadium-orange text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {preset === 'daylight' && 'Daylight'}
              {preset === 'goldenHour' && 'Golden Hour'}
              {preset === 'evening' && 'Evening'}
              {preset === 'night' && 'Night Match'}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-6 right-6 flex gap-4">
        <Link
          to="/select"
          className="px-6 py-3 bg-stadium-orange text-black font-bold rounded-full hover:bg-white transition-all duration-300"
        >
          Select Seat
        </Link>

        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 border-2 border-stadium-orange text-stadium-orange font-bold rounded-full hover:bg-stadium-orange transition-all duration-300"
        >
          Back
        </button>
      </div>

      {/* Stats */}
      <div className="absolute top-6 right-6 bg-stadium-charcoal/80 backdrop-blur-md px-4 py-3 rounded-xl border border-gray-800">
        <div className="text-sm text-gray-400">Total Seats</div>
        <div className="text-2xl font-bold text-white">{SEATS_DATA.totalSeats?.toLocaleString() || '100,000+'}</div>
      </div>
    </div>
  )
}

export default Explore