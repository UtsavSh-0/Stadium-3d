import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import Stadium from '../../three/Stadium/Stadium.jsx'
import Pitch from '../../three/Pitch/Pitch.jsx'
import Lighting from '../../three/Lighting/Lighting.jsx'
import Seats from '../../three/Seats/Seats.jsx'
import useStadiumStore from '../../store/stadiumStore.js'
import { SEAT_COLORS } from '../../three/Seats/SeatData.js'

const SeatSelection = () => {
  const {
    selectedStand, selectStand,
    selectedTier, selectTier,
    selectedBlock, selectBlock,
    selectedRow, selectRow,
    selectedSeat, selectSeat,
    tiers, getAvailableBlocks, getAvailableRows, getAvailableSeats
  } = use(state => ({
    selectedStand: state.selectedStand,
    selectStand: state.selectStand,
    selectedTier: state.selectedTier,
    selectTier: state.selectTier,
    selectedBlock: state.selectedBlock,
    selectBlock: state.selectBlock,
    selectedRow: state.selectedRow,
    selectRow: state.selectRow,
    selectedSeat: state.selectedSeat,
    selectSeat: state.selectSeat,
    tiers: state.tiers,
    blocks: state.blocks,
    getAvailableBlocks: state.getAvailableBlocks,
    getAvailableRows: state.getAvailableRows,
    getAvailableSeats: state.getAvailableSeats
  }))

  const [hoveredSeat, setHoveredSeat] = useState(null)
  const [cameraPosition, setCameraPosition] = useState([0, 60, 120])

  // Available options
  const blocks = selectedStand ? getAvailableBlocks() : []
  const rows = selectedBlock ? getAvailableRows() : []
  const seats = selectedRow ? getAvailableSeats(selectedRow) : []

  const handleStandSelect = (stand) => {
    gsap.to(`.stand-${stand.toLowerCase()}`, {
      duration: 0.5,
      ease: 'power2.inOut'
    })
    selectStand(stand)
    selectBlock(null)
    selectRow(null)
    selectSeat(null)
  }

  const handleBlockSelect = (block) => {
    selectBlock(block)
    selectRow(null)
    selectSeat(null)
  }

  const handleRowSelect = (row) => {
    selectRow(row)
    selectSeat(null)
  }

  const handleSeatSelect = (seat) => {
    selectSeat(seat.num)
    setHoveredSeat(seat)
  }

  const handleProceed = () => {
    if (selectedSeat) {
      gsap.to('.seat-selection-container', {
        duration: 0.5,
        opacity: 0,
        y: 20,
        ease: 'power2.in',
        onComplete: () => {
          // Navigate to experience page
          window.history.pushState({}, '', '/experience')
          document.dispatchEvent(new CustomEvent('routeChange'))
        }
      })
    }
  }

  const getStandPosition = (stand) => {
    const positions = {
      North: [0, 5, 60],
      South: [0, 5, -60],
      East: [55, 5, 0],
      West: [-55, 5, 0]
    }
    return positions[stand] || [0, 5, 0]
  }

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* 3D Scene */}
      <Canvas
        camera={{ position: cameraPosition, fov: 50 }}
        className="absolute inset-0"
      >
        <color attach="background" args={['#0a0a1a']} />
        <ambientLight intensity={0.3} />
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
      <div className="absolute inset-y-6 left-6 z-10 w-80 bg-stadium-charcoal/80 backdrop-blur-md rounded-xl border border-gray-800 m-6 overflow-y-auto">
        <div className="p-6 space-y-6">
          <h3 className="text-xl font-bold text-white">Select Your Seat</h3>

          {/* Step 1: Stand Selection */}
          <div>
            <h4 className="text-sm text-gray-400 mb-2">1. Choose Stand</h4>
            <div className="grid grid-cols-2 gap-2">
              {['North', 'South', 'East', 'West'].map((stand) => (
                <button
                  key={stand}
                  onClick={() => handleStandSelect(stand)}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                    selectedStand === stand
                      ? 'bg-stadium-orange text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {stand} Stand
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Tier Selection */}
          {selectedStand && (
            <div>
              <h4 className="text-sm text-gray-400 mb-2">2. Choose Tier</h4>
              <div className="grid grid-cols-3 gap-2">
                {tiers.map((tier) => (
                  <button
                    key={tier}
                    onClick={() => selectTier(tier)}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                      selectedTier === tier
                        ? 'bg-stadium-orange text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Block Selection */}
          {selectedTier && (
            <div>
              <h4 className="text-sm text-gray-400 mb-2">3. Choose Block</h4>
              <div className="grid grid-cols-4 gap-1">
                {blocks.map((block) => (
                  <button
                    key={block}
                    onClick={() => handleBlockSelect(block)}
                    className={`px-2 py-1 rounded text-xs font-bold transition-all duration-300 ${
                      selectedBlock === block
                        ? 'bg-stadium-orange text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {block}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Row Selection */}
          {selectedBlock && (
            <div>
              <h4 className="text-sm text-gray-400 mb-2">4. Choose Row</h4>
              <div className="grid grid-cols-5 gap-1 max-h-32 overflow-y-auto">
                {rows.slice(0, 20).map((row) => (
                  <button
                    key={row}
                    onClick={() => handleRowSelect(row)}
                    className={`px-2 py-1 rounded text-xs transition-all duration-300 ${
                      selectedRow === row
                        ? 'bg-stadium-orange text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {row}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Seat Selection */}
          {selectedRow && (
            <div>
              <h4 className="text-sm text-gray-400 mb-2">5. Choose Seat</h4>
              <div className="grid grid-cols-10 gap-1 max-h-32 overflow-y-auto">
                {seats.map((seat) => (
                  <button
                    key={seat.num}
                    onClick={() => handleSeatSelect(seat)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      selectedSeat === seat.num
                        ? 'bg-orange-500 text-black'
                        : seat.status === 'available'
                          ? 'bg-blue-600 hover:bg-blue-500'
                          : seat.status === 'reserved'
                            ? 'bg-yellow-500'
                            : 'bg-gray-600'
                    }`}
                    title={`Seat ${seat.num} - $${seat.price}`}
                  >
                    {seat.num}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Proceed Button */}
          {selectedSeat && (
            <div className="pt-4">
              <button
                onClick={handleProceed}
                className="w-full px-6 py-3 bg-stadium-orange text-black font-bold rounded-full hover:bg-white transition-all duration-300 shadow-[0_4px_20px_rgba(255,107,53,0.4)]"
              >
                Continue to Experience
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="pt-4 border-t border-gray-700">
            <button
              onClick={() => window.history.back()}
              className="w-full px-4 py-2 text-gray-400 hover:text-white transition-all duration-300"
            >
              ← Back to Stadium
            </button>
          </div>
        </div>
      </div>

      {/* Camera Position Info */}
      <div className="absolute top-6 right-6 bg-stadium-charcoal/80 backdrop-blur-md px-4 py-3 rounded-xl border border-gray-800 text-sm">
        <div className="text-gray-400">Camera View</div>
        <div className="text-white font-mono">
          {selectedStand ? `${selectedStand} Stand` : 'Aerial'}
        </div>
        {selectedSeat && (
          <div className="text-stadium-orange text-xs mt-1">
            Selected: Seat {selectedSeat}, Row {selectedRow}
          </div>
        )}
      </div>
    </div>
  )
}

export default SeatSelection