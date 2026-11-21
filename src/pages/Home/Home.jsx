import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stars } from '@react-three/drei'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import Stadium from '../../three/Stadium/Stadium.jsx'
import Pitch from '../../three/Pitch/Pitch.jsx'
import Lighting from '../../three/Lighting/Lighting.jsx'
import Seats from '../../three/Seats/Seats.jsx'
import { SEATS_DATA } from '../../three/Seats/SeatData.js'

const Home = () => {
  const [mounted, setMounted] = useState(false)
  const titleRef = useRef()
  const buttonsRef = useRef([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)

    // GSAP animation
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      })
    }

    if (buttonsRef.current.length > 0) {
      gsap.from(buttonsRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.7
      })
    }

    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-stadium-charcoal flex items-center justify-center z-50">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-stadium-orange">OMNYA LAB STADIUM</h1>
          <div className="w-48 h-1 bg-stadium-orange mx-auto rounded-full animate-pulse" />
          <div className="flex justify-center space-x-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-stadium-orange rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 3D Stadium Background */}
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

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={40}
          maxDistance={300}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />

        <Environment preset="sunset" />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center px-6">
          <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold text-white tracking-wider mb-8">
            OMNYA LAB STADIUM
            <span className="block text-2xl md:text-4xl text-stadium-orange mt-2 font-normal">
              Experience Your Perfect Seat
            </span>
          </h1>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/explore"
              className="px-10 py-4 bg-stadium-orange text-black font-bold rounded-full hover:bg-white transition-all duration-300 shadow-[0_4px_20px_rgba(255,107,53,0.4)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.3)]"
            >
              Explore Stadium
            </Link>

            <Link
              to="/select"
              className="px-10 py-4 border-2 border-stadium-orange text-stadium-orange font-bold rounded-full hover:bg-stadium-orange transition-all duration-300"
            >
              Book Your Seat
            </Link>
          </div>

          <div className="mt-8 flex items-center space-x-4 text-gray-400">
            <span className="w-12 h-px bg-gray-600" />
            <span className="text-sm">Live 3D Stadium Experience</span>
            <span className="w-12 h-px bg-gray-600" />
          </div>
        </div>
      </div>

      {/* 3D Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-2 text-gray-400">
        <div className="w-2 h-2 bg-stadium-orange rounded-full animate-pulse" />
        <span className="text-xs">LIVE 3D</span>
      </div>
    </div>
  )
}

export default Home