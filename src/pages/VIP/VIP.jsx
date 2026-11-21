import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import Stadium from '../../three/Stadium/Stadium.jsx'
import Pitch from '../../three/Pitch/Pitch.jsx'
import Lighting from '../../three/Lighting/Lighting.jsx'
import VIPBox from '../../three/VIP/VIPBox.jsx'
import Seats from '../../three/Seats/Seats.jsx'

const VIP = () => {
  const [cameraReady, setCameraReady] = useState(false)
  const cameraRef = useRef()
  const ticketAnimationRef = useRef()
  const [ticketAnimation, setTicketAnimation] = useState(false)
  const [upgraded, setUpgraded] = useState(false)

  // Cinematic journey to VIP
  useEffect(() => {
    if (!cameraReady || cameraRef.current) return

    const { camera } = cameraRef.current

    // Animate camera journey
    const journey = gsap.timeline()

    // Start from aerial view
    journey.to(camera.position, {
      x: 0, y: 80, z: 150,
      duration: 2,
      ease: 'power2.inOut'
    })

    // Move to VIP location
    journey.to(camera.position, {
      x: 0, y: 60, z: 100,
      duration: 2,
      ease: 'power2.inOut'
    }, 2)

    // Descend to VIP approach
    journey.to(camera.position, {
      x: 0, y: 45, z: 65,
      duration: 2,
      ease: 'power2.inOut'
    }, 4)

    // Final VIP view
    journey.to(camera.position, {
      x: 0, y: 50, z: 30,
      duration: 2,
      ease: 'power2.inOut'
    }, 6)

    journey.to(camera.lookAt, {
      x: 0, y: 45, z: 45,
      duration: 2,
      ease: 'power2.inOut'
    }, 6)

  }, [cameraReady])

  const handleUpgrade = () => {
    if (!upgraded) {
      gsap.to('.upgrade-overlay', {
        duration: 0.5,
        opacity: 1,
        ease: 'power2.out'
      })

      setTimeout(() => {
        setUpgraded(true)
        gsap.to('.upgrade-overlay', {
          duration: 0.5,
          opacity: 0,
          ease: 'power2.in'
        })

        // Animate VIP ticket
        setTicketAnimation(true)
      }, 1000)
    }
  }

  const handleVIPConfirm = () => {
    setTicketAnimation(true)
  }

  return (
    <div className="h-screen w-full relative overflow-hidden">
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

        {!upgraded && (
          <VIPBox onUpgrade={handleUpgrade} />
        )}

        {upgraded && (
          <mesh position={[0, 42, 45]}>
            <boxGeometry args={[30, 8, 20]} />
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.1}
              metalness={0.5}
              transparent={true}
              opacity={0.95}
            />
          </mesh>
        )}

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
        />

        <Environment preset="sunset" />
      </Canvas>

      {/* Upgrade Overlay */}
      <div className="upgrade-overlay fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 opacity-0">
        <div className="bg-stadium-charcoal rounded-2xl p-8 max-w-md text-center border border-gray-800">
          <h3 className="text-2xl font-bold text-white mb-4">Upgrade to VIP</h3>
          <p className="text-gray-400 mb-6">
            Gain exclusive access to our premium Skybox with private hospitality
          </p>

          <div className="space-y-3">
            <button
              onClick={handleVIPConfirm}
              className="w-full py-3 bg-stadium-orange text-black font-bold rounded-full hover:bg-white transition-all duration-300"
            >
              Confirm VIP Upgrade - $250
            </button>

            <button
              onClick={() => {
                gsap.to('.upgrade-overlay', {
                  duration: 0.5,
                  opacity: 0,
                  ease: 'power2.in'
                })
              }}
              className="w-full py-3 border-2 border-gray-600 text-gray-400 font-bold rounded-full hover:bg-gray-800 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* VIP Ticket Animation */}
      {ticketAnimation && upgraded && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div
            ref={ticketAnimationRef}
            className="bg-gradient-to-br from-stadium-charcoal to-gray-900 rounded-2xl p-8 max-w-md mx-4 border border-gray-800"
          >
            <h3 className="text-2xl font-bold text-center text-white mb-6">VIP TICKET</h3>

            <div className="bg-white p-4 rounded-lg mb-6">
              <div className="w-24 h-24 mx-auto flex items-center justify-center">
                <span className="text-3xl font-bold text-black">VIP</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-xs text-gray-400 mb-1">Skybox</div>
                <div className="font-bold text-white">Premium Box</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Price</div>
                <div className="font-bold text-stadium-orange">$250</div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-3 mb-6">
              <div className="text-xs text-gray-400 mb-1">Booking Reference</div>
              <div className="font-mono text-stadium-orange">BKVIP{Date.now().toString(36).toUpperCase().slice(0, 8)}</div>
            </div>

            <button
              onClick={() => {
                // Download or print
                alert('Ticket ready for download/print!')
              }}
              className="w-full py-3 bg-stadium-orange text-black font-bold rounded-full hover:bg-white transition-all duration-300"
            >
              Download VIP Ticket
            </button>

            <Link
              to="/ticket"
              className="block mt-4 text-gray-400 hover:text-white transition-all duration-300"
            >
              ← View Main Ticket
            </Link>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute top-6 right-6 z-10 bg-stadium-charcoal/80 backdrop-blur-md px-4 py-3 rounded-xl border border-gray-800">
        <div className="text-xs text-gray-400 mb-2">VIP Skybox</div>
        <div className="text-white font-bold">Premium Lounge</div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 border-2 border-stadium-orange text-stadium-orange font-bold rounded-full hover:bg-stadium-orange transition-all duration-300"
        >
          Back to Seat
        </button>

        <Link
          to="/ticket"
          className="px-8 py-3 bg-stadium-orange text-black font-bold rounded-full hover:bg-white transition-all duration-300"
        >
          View Ticket
        </Link>
      </div>
    </div>
  )
}

export default VIP