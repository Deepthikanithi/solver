import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopHeader from './components/TopHeader'
import Dashboard from './pages/Dashboard'
import Sessions from './pages/Sessions'
import Profile from './pages/Profile'
import Verification from './pages/Verification'
import SkillVerification from './pages/SkillVerification'
import IdentityVerification from './pages/IdentityVerification'
import Content from './pages/Content'
import Earnings from './pages/Earnings'
import Analytics from './pages/Analytics'
import Payments from './pages/Payments'
import Community from './pages/Community'
import Settings from './pages/Settings'
import Support from './pages/Support'
import Login from './pages/Login'
import Register from './pages/Register'
import Landing from './pages/Landing'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Update body class when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkMode])

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    )
  }

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} setIsAuthenticated={setIsAuthenticated} />
        <div className={`flex-1 overflow-auto ${darkMode ? 'bg-[#1a1f2e]' : 'bg-gray-50'}`}>
          {/* Persistent Top Header - Integrated into main content */}
          <TopHeader darkMode={darkMode} setDarkMode={setDarkMode} />

          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
            <Route path="/sessions" element={<Sessions darkMode={darkMode} />} />
            <Route path="/content" element={<Content darkMode={darkMode} />} />
            <Route path="/earnings" element={<Earnings darkMode={darkMode} />} />
            <Route path="/profile" element={<Profile darkMode={darkMode} />} />
            <Route path="/verification" element={<Verification darkMode={darkMode} />} />
            <Route path="/skill-verification" element={<SkillVerification darkMode={darkMode} />} />
            <Route path="/identity-verification" element={<IdentityVerification darkMode={darkMode} />} />
            <Route path="/analytics" element={<Analytics darkMode={darkMode} />} />
            <Route path="/community" element={<Community darkMode={darkMode} />} />
            <Route path="/support" element={<Support darkMode={darkMode} />} />
            <Route path="/payments" element={<Payments darkMode={darkMode} />} />
            <Route path="/settings" element={<Settings darkMode={darkMode} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
