import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Explore Stadium', path: '/explore' },
    { name: 'Select Seat', path: '/select' },
    { name: 'VIP Experience', path: '/vip' }
  ]

  return (
    <header className="fixed top-0 z-50 w-full bg-stadium-charcoal/90 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="text-2xl font-bold text-stadium-orange">
          OMNYA LAB STADIUM
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-stadium-orange ${
                location.pathname === item.path ? 'text-stadium-orange' : 'text-gray-300'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-300 hover:text-stadium-orange focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-stadium-charcoal/95 backdrop-blur-md border-b border-gray-800">
          <div className="px-6 py-4 space-y-2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="block text-base font-medium text-gray-300 hover:text-stadium-orange transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header