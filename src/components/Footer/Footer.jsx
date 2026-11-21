import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-stadium-charcoal border-t border-gray-800 py-6 mt-auto">
      <div className="container mx-auto px-6 text-center text-gray-400">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Omnya Lab Stadium. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Premium stadium booking experience. Select your seat, see the view, own the experience.
        </p>
      </div>
    </footer>
  )
}

export default Footer