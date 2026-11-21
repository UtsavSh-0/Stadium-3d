import React from 'react'
import { Football } from 'lucide-react'

const LoadingScreen = ({ progress = 0 }) => {
  return (
    <div className="fixed inset-0 bg-stadium-charcoal flex flex-col items-center justify-center z-50">
      <div className="text-center space-y-6">
        <Football className="w-16 h-16 text-stadium-orange animate-pulse mx-auto" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Loading Stadium Experience</h2>
          <p className="text-gray-400">Initializing 3D environment...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-stadium-orange transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Seats Animation */}
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

export default LoadingScreen