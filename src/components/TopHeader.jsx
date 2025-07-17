import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const TopHeader = ({ darkMode, setDarkMode }) => {
  const location = useLocation()

  // Get page name from current route
  const getPageName = () => {
    const path = location.pathname
    switch (path) {
      case '/dashboard':
        return 'Dashboard'
      case '/sessions':
        return 'Sessions'
      case '/content':
        return 'Content Creator'
      case '/earnings':
        return 'Earnings'
      case '/profile':
        return 'Profile'
      case '/verification':
        return 'Verification Hub'
      case '/identity-verification':
        return 'Identity Verification'
      case '/skill-verification':
        return 'Skill Verification'
      case '/analytics':
        return 'Analytics'
      case '/community':
        return 'Community'
      case '/support':
        return 'Support'
      case '/payments':
        return 'Payments'
      case '/settings':
        return 'Settings'
      default:
        return 'Dashboard'
    }
  }
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const notifications = [
    { id: 1, title: 'New session request', message: 'Alice Johnson wants to book a React session', time: '2 min ago', unread: true },
    { id: 2, title: 'Session reminder', message: 'Your session with Bob Chen starts in 15 minutes', time: '10 min ago', unread: true },
    { id: 3, title: 'Payment received', message: 'You received $50 for your JavaScript session', time: '1 hour ago', unread: false },
    { id: 4, title: 'New review', message: 'Carol Davis left you a 5-star review', time: '2 hours ago', unread: false }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <div className={`border-b transition-all duration-500 backdrop-blur-xl ${
      darkMode ? 'border-white/10 bg-[#00001a]/80' : 'border-gray-200 bg-white/80'
    }`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            {getPageName()}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition-all duration-300 ${
              darkMode
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-gray-100 text-[#00001a] hover:bg-gray-200'
            }`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* Notifications */}
          <button className={`p-2 rounded-lg transition-all duration-300 ${
            darkMode
              ? 'bg-white/10 text-white hover:bg-white/20'
              : 'bg-gray-100 text-[#00001a] hover:bg-gray-200'
          }`}>
            🔔
          </button>

          {/* Profile Menu */}
          <button className={`p-2 rounded-lg transition-all duration-300 ${
            darkMode
              ? 'bg-white/10 text-white hover:bg-white/20'
              : 'bg-gray-100 text-[#00001a] hover:bg-gray-200'
          }`}>
            ⋮
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopHeader
