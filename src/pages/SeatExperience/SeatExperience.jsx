import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Html, PerspectiveCamera } from '@react-three/drei'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import Stadium from '../../three/Stadium/Stadium.jsx'
import Pitch from '../../three/Pitch/Pitch.jsx'
import Lighting from '../../three/Lighting/Lighting.jsx'
import Seats from '../../three/Seats/Seats.jsx'
import useStadiumStore from '../../store/stadiumStore.js'

const SeatExperience = () => {
  const [cameraReady, setCameraReady] = useState(false)
  const [screenshot, setScreenshot] = useState(null)
  const cameraRef = useRef()
  const cameraTarget = useRef([0, 0, 0])

  const { selectedStand, selectedTier, selectedBlock, selectedRow, selectedSeat } = useStadiumStore(state => ({
    selectedStand: state.selectedStand,
    selectedTier: state.selectedTier,
    selectedBlock: state.selectedBlock,
    selectedRow: state.selectedRow,
    selectedSeat: state.selectedSeat
  }))

  // Find selected seat data
  const getSelectedSeat = () => {
    // This would normally come from the store or API
    return {
      id: `${selectedStand}-${selectedTier}-${selectedBlock}-${selectedRow}-${selectedSeat}`,
      stand: selectedStand,
      tier: selectedTier,
      block: selectedBlock,
      row: selectedRow,
      seat: selectedSeat,
      status: 'available',
      price: 150,
      x: 0,
      y: 25,
      z: 45,
      color: 0x1A4B8B
    }
  }

  const seat = getSelectedSeat()

  // Cinematic camera journey
  useEffect(() => {
    if (!cameraReady || cameraRef.current) return

    const { camera, controls } = cameraRef.current

    // Animate camera journey
    const journey = gsap.timeline()

    // Start from aerial view
    journey.to(camera.position, {
      x: 0, y: 80, z: 150,
      duration: 2,
      ease: 'power2.inOut'
    })

    // Move to stand
    journey.to(camera.position, {
      x: seat.x * 2, y: 60, z: seat.z * 2.5,
      duration: 2,
      ease: 'power2.inOut'
    }, 2)

    // Descend to block
    journey.to(camera.position, {
      x: seat.x * 1.5, y: 45, z: seat.z * 1.8,
      duration: 2,
      ease: 'power2.inOut'
    }, 4)

    // Approach row
    journey.to(camera.position, {
      x: seat.x, y: 35, z: seat.z + 30,
      duration: 2,
      ease: 'power2.inOut'
    }, 6)

    // Final seat view
    journey.to(camera.position, {
      x: seat.x, y: seat.y + 1.2, z: seat.z - 3,
      duration: 2,
      ease: 'power2.inOut'
    }, 8)

    // Update target
    journey.to(cameraTarget, {
      x: seat.x,
      y: seat.y + 0.5,
      z: seat.z + 80,
      duration: 10,
      ease: 'power2.inOut',
      onComplete: () => {
        // Capture screenshot
        captureScreenshot()
      }
    }, 0)

  }, [cameraReady, seat])

  const captureScreenshot = () => {
    if (cameraRef.current) {
      // In a real implementation, this would use the renderer's domElement
      // to capture a screenshot and pass it to the ticket
      setScreenshot('seat-view-image-placeholder')
    }
  }

  const handleTicketClick = () => {
    gsap.to('.experience-container', {
      duration: 0.5,
      opacity: 0,
      y: 20,
      ease: 'power2.in',
      onComplete: () => {
        window.history.pushState({}, '', '/ticket')
        document.dispatchEvent(new CustomEvent('routeChange'))
      }
    })
  }

  const handleVIPClick = () => {
    gsap.to('.experience-container', {
      duration: 0.5,
      opacity: 0,
      y: -20,
      ease: 'power2.in',
      onComplete: () => {
        window.history.pushState({}, '', '/vip')
        document.dispatchEvent(new CustomEvent('routeChange'))
      }
    })
  }

  return (
    <div className="experience-container h-screen w-full relative overflow-hidden">
      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 50, 120], fov: 50 }}
        className="absolute inset-0"
      >
        <color attach="background" args={['#0a0a1a']} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[50, 80, 50]} intensity={0.8} />

        <Stadium />
        <Pitch />
        <Lighting />

        <Seats
          hoveredSeat={null}
          setHoveredSeat={() => {}}
          onSelect={() => {}}
        />

        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={[0, 50, 120]}
          fov={50}
          onUpdate={(self) => {
            self.lookAt(...cameraTarget.current)
          }}
        />

        <Environment preset="sunset" />
      </Canvas>

      {/* Camera Progress */}
      <div className="absolute top-6 left-6 z-10 bg-stadium-charcoal/80 backdrop-blur-md px-4 py-3 rounded-xl border border-gray-800">
        <div className="text-xs text-gray-400 mb-2">CINEMATIC JOURNEY</div>
        <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-stadium-orange transition-all duration-300" style={{ width: '100%' }} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
        <button
          onClick={handleTicketClick}
          className="px-8 py-3 bg-stadium-orange text-black font-bold rounded-full hover:bg-white transition-all duration-300 shadow-[0_4px_20px_rgba(255,107,53,0.4)]"
        >
          Generate Ticket
        </button>

        <button
          onClick={handleVIPClick}
          className="px-8 py-3 border-2 border-stadium-orange text-stadium-orange font-bold rounded-full hover:bg-stadium-orange transition-all duration-300"
        >
          Upgrade to VIP
        </button>

        <Link
          to="/select"
          className="px-6 py-3 border-2 border-gray-600 text-gray-300 font-bold rounded-full hover:bg-gray-800 transition-all duration-300"
        >
          Change Seat
        </Link>
      </div>

      {/* Seat Info */}
      <div className="absolute top-6 right-6 z-10 w-80 bg-stadium-charcoal/80 backdrop-blur-md p-4 rounded-xl border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-3">Seat Details</h3>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Stand:</span>
            <span className="text-white">{selectedStand}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Tier:</span>
            <span className="text-white">{selectedTier}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Block:</span>
            <span className="text-white">{selectedBlock}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Row:</span>
            <span className="text-white">{selectedRow}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Seat:</span>
            <span className="text-white font-mono">{selectedSeat}</span>
          </div>

          <div className="flex justify-between text-lg font-bold">
            <span className="text-gray-400">Price:</span>
            <span className="text-stadium-orange">${seat.price}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeatExperience