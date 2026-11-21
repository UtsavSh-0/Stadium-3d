import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Explore from './pages/Explore/Explore.jsx'
import SeatSelection from './pages/SeatSelection/SeatSelection.jsx'
import SeatExperience from './pages/SeatExperience/SeatExperience.jsx'
import Ticket from './pages/Ticket/Ticket.jsx'
import VIP from './pages/VIP/VIP.jsx'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'

function App() {
  return (
    <div className="min-h-screen bg-stadium-charcoal text-white flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/select" element={<SeatSelection />} />
          <Route path="/experience" element={<SeatExperience />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/vip" element={<VIP />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App