import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { QrCode } from 'lucide-react'
import useStadiumStore from '../../store/stadiumStore.js'
import useBookingStore from '../../store/bookingStore.js'

const Ticket = () => {
  const [ticketAnimation, setTicketAnimation] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const ticketRef = useRef()
  const { selectedStand, selectedTier, selectedBlock, selectedRow, selectedSeat } = useStadiumStore(state => ({
    selectedStand: state.selectedStand,
    selectedTier: state.selectedTier,
    selectedBlock: state.selectedBlock,
    selectedRow: state.selectedRow,
    selectedSeat: state.selectedSeat
  }))

  const { booking, bookSeat } = useBookingStore()

  useEffect(() => {
    // Animate ticket appearance
    if (!ticketAnimation) {
      gsap.from(ticketRef.current, {
        scale: 0.5,
        opacity: 0,
        rotationX: -30,
        duration: 1,
        ease: 'back.out(1.7)',
        onComplete: () => setTicketAnimation(true)
      })
    }
  }, [ticketAnimation])

  // Generate ticket data
  const ticket = {
    id: booking?.id || `BK${Date.now().toString(36).toUpperCase().slice(0, 8)}`,
    stadium: 'Omnya Lab Stadium',
    stand: selectedStand || 'South',
    block: selectedBlock || 'G',
    tier: selectedTier || 'Middle',
    row: selectedRow || 15,
    seat: selectedSeat || 42,
    gate: 'D',
    price: 150,
    date: new Date().toISOString().split('T')[0],
    time: '15:00'
  }

  const handleDownload = () => {
    // In a real implementation, this would generate a PDF with the seat view image
    setDownloadUrl('ticket-download')
  }

  return (
    <div className="min-h-screen w-full bg-stadium-charcoal flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Your Ticket</h1>
        <p className="text-gray-400">Confirm your booking</p>
      </div>

      {/* Digital Ticket */}
      <div
        ref={ticketRef}
        className="w-full max-w-md bg-gradient-to-br from-stadium-charcoal to-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl mb-8"
      >
        {/* Ticket Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">OMNYA LAB STADIUM</h2>
          <div className="bg-stadium-orange text-black px-3 py-1 rounded-full text-sm font-bold">
            {ticket.date}
          </div>
        </div>

        {/* QR Code */}
        <div className="bg-white p-4 rounded-lg mb-6">
          <div className="w-32 h-32 mx-auto flex items-center justify-center">
            <QrCode size={120} color="#0a0a1a" />
          </div>
        </div>

        {/* Seat Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-xs text-gray-400 mb-1">STAND</div>
            <div className="text-lg font-bold text-white">{ticket.stand} STAND</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">BLOCK</div>
            <div className="text-lg font-bold text-white">Block {ticket.block}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">ROW</div>
            <div className="text-lg font-bold text-white">Row {ticket.row}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">SEAT</div>
            <div className="text-lg font-bold text-white">Seat {ticket.seat}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">GATE</div>
            <div className="text-lg font-bold text-white">Gate {ticket.gate}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">PRICE</div>
            <div className="text-lg font-bold text-stadium-orange">${ticket.price}</div>
          </div>
        </div>

        {/* Booking Reference */}
        <div className="bg-gray-800/50 rounded-lg p-3 mb-6">
          <div className="text-xs text-gray-400 mb-1">Booking Reference</div>
          <div className="font-mono text-stadium-orange text-lg">{ticket.id}</div>
        </div>

        {/* Seat View Image Placeholder */}
        <div className="bg-gray-800/30 rounded-lg h-48 mb-6 flex items-center justify-center border border-gray-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-stadium-orange rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl font-bold text-black">{ticket.seat}</span>
            </div>
            <p className="text-gray-400 text-sm">Your view from Seat {ticket.seat}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleDownload}
            className="w-full py-3 bg-stadium-orange text-black font-bold rounded-full hover:bg-white transition-all duration-300"
          >
            Download PDF Ticket
          </button>

          <button
            onClick={() => {
              // Navigate to VIP
              window.history.pushState({}, '', '/vip')
              document.dispatchEvent(new CustomEvent('routeChange'))
            }}
            className="w-full py-3 border-2 border-stadium-orange text-stadium-orange font-bold rounded-full hover:bg-stadium-orange transition-all duration-300"
          >
            Upgrade to VIP Skybox
          </button>

          <Link
            to="/"
            className="block py-3 text-center text-gray-400 hover:text-white transition-all duration-300"
          >
            ← Explore Another Seat
          </Link>
        </div>
      </div>

      {/* VIP Upgrade CTA */}
      <div className="bg-gradient-to-r from-stadium-orange to-orange-600 rounded-xl p-6 max-w-md text-center">
        <h3 className="text-xl font-bold text-black mb-2">Enjoy Premium Hospitality</h3>
        <p className="text-black/90 mb-4">
          Upgrade to our exclusive VIP Skybox for private hospitality and panoramic views
        </p>
        <Link
          to="/vip"
          className="inline-block bg-black text-stadium-orange px-6 py-2 font-bold rounded-full hover:bg-gray-900 transition-all duration-300"
        >
          Upgrade Now
        </Link>
      </div>
    </div>
  )
}

export default Ticket