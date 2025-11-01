import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Home from './pages/Home'
import Matchmaking from './pages/Matchmaking'
import Gamification from './pages/Gamification'
import Community from './pages/Community'
import Profile from './pages/Profile'

function AppContent() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const getActiveTab = () => {
    const path = location.pathname
    if (path === '/') return 'home'
    if (path === '/matchmaking') return 'match'
    if (path === '/rewards') return 'rewards'
    if (path === '/community') return 'community'
    if (path === '/profile') return 'profile'
    if (path === '/match-partner') return 'match'
    if (path === '/tournaments') return 'match'
    if (path === '/my-bookings') return 'profile'
    return 'home'
  }

  const activeTab = getActiveTab()

  const setActiveTab = (tab) => {
    switch(tab) {
      case 'home':
        navigate('/')
        break
      case 'match':
        navigate('/matchmaking')
        break
      case 'rewards':
        navigate('/rewards')
        break
      case 'community':
        navigate('/community')
        break
      case 'profile':
        navigate('/profile')
        break
      default:
        navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matchmaking" element={<Matchmaking />} />
          <Route path="/rewards" element={<Gamification />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}