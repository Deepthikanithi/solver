import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import {
  Sun,
  Moon,
  Bell,
  MoreVertical,
  User,
  Settings,
  LogOut,
  HelpCircle,
  CreditCard,
  Shield
} from 'lucide-react'

const TopHeader = ({ darkMode, setDarkMode, setIsAuthenticated }) => {
  const location = useLocation()
  const navigate = useNavigate()

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
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, title: 'New session request', message: 'Alice Johnson wants to book a React session', time: '2 min ago', unread: true, type: 'session_request' },
    { id: 2, title: 'Session reminder', message: 'Your session with Bob Chen starts in 15 minutes', time: '10 min ago', unread: true, type: 'session_reminder' },
    { id: 3, title: 'Payment received', message: 'You received $50 for your JavaScript session', time: '1 hour ago', unread: false, type: 'payment' },
    { id: 4, title: 'New review', message: 'Carol Davis left you a 5-star review', time: '2 hours ago', unread: false, type: 'review' }
  ])
  const notificationRef = useRef(null)
  const profileRef = useRef(null)

  const unreadCount = notificationsList.filter(n => n.unread).length

  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowNotifications(false)
        setShowProfile(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
    setShowProfile(false)
  }

  const handleProfileClick = () => {
    setShowProfile(!showProfile)
    setShowNotifications(false)
  }

  const handleMarkAllRead = () => {
    setNotificationsList(prev =>
      prev.map(notification => ({ ...notification, unread: false }))
    )
  }

  const handleClearAllNotifications = () => {
    setNotificationsList([])
    setShowNotifications(false)
  }

  const handleNotificationItemClick = (notificationId, notification) => {
    // Mark notification as read
    setNotificationsList(prev =>
      prev.map(n =>
        n.id === notificationId
          ? { ...n, unread: false }
          : n
      )
    )

    // Handle different notification types
    switch (notification.type || 'default') {
      case 'session_request':
        navigate('/sessions')
        break
      case 'session_reminder':
        navigate('/sessions')
        break
      case 'payment':
        navigate('/payments')
        break
      case 'review':
        navigate('/profile')
        break
      default:
        break
    }

    // Close notifications dropdown
    setShowNotifications(false)
  }

  const handleProfileAction = (action) => {
    setShowProfile(false)

    switch (action) {
      case 'profile':
        navigate('/profile')
        break
      case 'settings':
        navigate('/settings')
        break
      case 'billing':
        navigate('/payments')
        break
      case 'help':
        navigate('/support')
        break
      case 'logout':
        if (window.confirm('Are you sure you want to sign out?')) {
          if (setIsAuthenticated) {
            setIsAuthenticated(false)
          }
          localStorage.removeItem('userToken')
          localStorage.removeItem('userData')
          navigate('/login')
        }
        break
      default:
        break
    }
  }

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

        <div className="flex items-center space-x-3 relative">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition-all duration-300 ${
              darkMode
                ? 'bg-white/10 text-white hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                : 'bg-gray-100 text-[#00001a] hover:bg-gray-200 hover:shadow-[0_0_15px_rgba(0,0,26,0.1)]'
            }`}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={handleNotificationClick}
              className={`p-2 rounded-lg transition-all duration-300 relative z-10 ${
                darkMode
                  ? 'bg-white/10 text-white hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                  : 'bg-gray-100 text-[#00001a] hover:bg-gray-200 hover:shadow-[0_0_15px_rgba(0,0,26,0.1)]'
              }`}
              title="Notifications"
              style={{ pointerEvents: 'auto' }}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && createPortal(
              <div
                className={`fixed right-4 top-16 w-80 rounded-lg border shadow-2xl ${
                  darkMode
                    ? 'bg-[#00001a] border-white/20'
                    : 'bg-white border-gray-200'
                }`}
                style={{
                  position: 'fixed',
                  zIndex: 999999,
                  boxShadow: darkMode
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                    : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className={`p-4 border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Notifications ({unreadCount})
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleMarkAllRead}
                        className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                        disabled={unreadCount === 0}
                      >
                        Mark all read
                      </button>
                      <button
                        onClick={handleClearAllNotifications}
                        className={`text-sm ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'}`}
                        disabled={notificationsList.length === 0}
                      >
                        Clear all
                      </button>
                    </div>
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notificationsList.length === 0 ? (
                    <div className="p-8 text-center">
                      <Bell size={32} className={`mx-auto mb-2 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />
                      <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        No notifications yet
                      </p>
                    </div>
                  ) : (
                    notificationsList.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationItemClick(notification.id, notification)}
                      className={`p-4 border-b transition-colors duration-200 cursor-pointer ${
                        darkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'
                      } ${notification.unread ? (darkMode ? 'bg-white/5' : 'bg-blue-50') : ''}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.unread ? 'bg-blue-500' : 'bg-transparent'
                        }`} />
                        <div className="flex-1">
                          <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {notification.title}
                          </p>
                          <p className={`text-sm mt-1 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                            {notification.message}
                          </p>
                          <p className={`text-xs mt-1 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                    ))
                  )}
                </div>
              </div>,
              document.body
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={handleProfileClick}
              className={`p-2 rounded-lg transition-all duration-300 z-10 ${
                darkMode
                  ? 'bg-white/10 text-white hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                  : 'bg-gray-100 text-[#00001a] hover:bg-gray-200 hover:shadow-[0_0_15px_rgba(0,0,26,0.1)]'
              }`}
              title="Profile menu"
              style={{ pointerEvents: 'auto' }}
            >
              <MoreVertical size={18} />
            </button>

            {/* Profile Dropdown */}
            {showProfile && createPortal(
              <div
                className={`fixed right-4 top-16 w-56 rounded-lg border shadow-2xl ${
                  darkMode
                    ? 'bg-[#00001a] border-white/20'
                    : 'bg-white border-gray-200'
                }`}
                style={{
                  position: 'fixed',
                  zIndex: 999999,
                  boxShadow: darkMode
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                    : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className={`p-4 border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-white/10' : 'bg-gray-100'
                    }`}>
                      <User size={20} className={darkMode ? 'text-white' : 'text-[#00001a]'} />
                    </div>
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        John Doe
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        john@example.com
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        Premium Member
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => handleProfileAction('profile')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors duration-200 ${
                      darkMode ? 'text-white hover:bg-white/10' : 'text-[#00001a] hover:bg-gray-100'
                    }`}
                  >
                    <User size={16} />
                    <span>View Profile</span>
                  </button>
                  <button
                    onClick={() => handleProfileAction('settings')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors duration-200 ${
                      darkMode ? 'text-white hover:bg-white/10' : 'text-[#00001a] hover:bg-gray-100'
                    }`}
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => handleProfileAction('billing')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors duration-200 ${
                      darkMode ? 'text-white hover:bg-white/10' : 'text-[#00001a] hover:bg-gray-100'
                    }`}
                  >
                    <CreditCard size={16} />
                    <span>Billing</span>
                  </button>
                  <button
                    onClick={() => handleProfileAction('help')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors duration-200 ${
                      darkMode ? 'text-white hover:bg-white/10' : 'text-[#00001a] hover:bg-gray-100'
                    }`}
                  >
                    <HelpCircle size={16} />
                    <span>Help & Support</span>
                  </button>
                  <div className={`border-t my-2 ${darkMode ? 'border-white/10' : 'border-gray-200'}`} />
                  <button
                    onClick={() => handleProfileAction('logout')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors duration-200 ${
                      darkMode ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>,
              document.body
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopHeader
