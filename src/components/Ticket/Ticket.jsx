import React from 'react'
import { QrCode } from 'lucide-react'

const Ticket = ({ seat, onClose }) => {
  return (
    <div className="bg-gradient-to-br from-stadium-charcoal to-gray-900 rounded-2xl p-8 border border-gray-800 max-w-md mx-auto">
      {/* Ticket Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">OMNYA LAB STADIUM</h2>
        <div className="bg-stadium-orange text-black px-3 py-1 rounded-full text-sm font-bold">
          {new Date().toISOString().split('T')[0]}
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
          <div className="text-lg font-bold text-white">{seat.stand} STAND</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">BLOCK</div>
          <div className="text-lg font-bold text-white">Block {seat.block}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">ROW</div>
          <div className="text-lg font-bold text-white">Row {seat.row}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">SEAT</div>
          <div className="text-lg font-bold text-white">Seat {seat.seat}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">GATE</div>
          <div className="text-lg font-bold text-white">Gate {seat.gate || 'D'}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">PRICE</div>
          <div className="text-lg font-bold text-stadium-orange">${seat.price}</div>
        </div>
      </div>

      {/* Booking Reference */}
      <div className="bg-gray-800/50 rounded-lg p-3 mb-6">
        <div className="text-xs text-gray-400 mb-1">Booking Reference</div>
        <div className="font-mono text-stadium-orange text-lg">
          BK{Date.now().toString(36).toUpperCase().slice(0, 8)}
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full py-3 bg-stadium-orange text-black font-bold rounded-full hover:bg-white transition-all duration-300"
      >
        Close
      </button>
    </div>
  )
}

export default Ticket