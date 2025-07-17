import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Home,
  Calendar,
  BookOpen,
  DollarSign,
  User,
  Shield,
  BarChart,
  Users,
  HelpCircle,
  Settings,
  Bell,
  Sun,
  Moon,
  MessageCircle,
  Plus,
  Eye,
  FileText,
  Star
} from 'lucide-react'

const DashboardReference = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('Dashboard')

  const handleCreateTutorial = () => {
    navigate('/content')
  }

  const handleViewEarnings = () => {
    navigate('/earnings')
  }

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Sessions', path: '/sessions' },
    { icon: BookOpen, label: 'Content Creator', path: '/content' },
    { icon: DollarSign, label: 'Earnings', path: '/earnings' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Shield, label: 'Verification', path: '/verification' },
    { icon: BarChart, label: 'Analytics', path: '/analytics' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: HelpCircle, label: 'Support', path: '/support' }
  ]

  return (
    <div className="min-h-screen flex" style={{
      background: darkMode 
        ? 'linear-gradient(135deg, #00001a 0%, #1a1a2e 50%, #16213e 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
    }}>
      {/* Background Radiance Effects - ENHANCED */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Sidebar - ENHANCED GLASSMORPHISM */}
      <div className="w-64 flex flex-col relative z-10" style={{
        background: darkMode
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(30px)',
        borderRight: darkMode
          ? '2px solid rgba(255, 255, 255, 0.2)'
          : '2px solid rgba(0, 0, 0, 0.1)',
        boxShadow: darkMode
          ? '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 50px rgba(255, 255, 255, 0.1)'
          : '0 30px 80px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 1), 0 0 50px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Logo - ENHANCED GLASSMORPHISM */}
        <div className="p-6" style={{
          borderBottom: darkMode
            ? '2px solid rgba(255, 255, 255, 0.2)'
            : '2px solid rgba(0, 0, 0, 0.1)'
        }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
              background: darkMode
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(30px)',
              boxShadow: darkMode
                ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
              border: darkMode
                ? '1px solid rgba(255, 255, 255, 0.2)'
                : '1px solid rgba(0, 0, 0, 0.1)'
            }}>
              <span className="text-lg font-bold" style={{ color: darkMode ? '#ffffff' : '#1f2937' }}>S</span>
            </div>
            <span className="text-xl font-bold" style={{ color: darkMode ? '#ffffff' : '#1f2937' }}>SynapMentor</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setActiveSection(item.label)
                  navigate(item.path)
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-300 hover:scale-105 relative group"
                style={{
                  background: activeSection === item.label
                    ? (darkMode
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'rgba(255, 255, 255, 0.8)')
                    : (darkMode
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(255, 255, 255, 0.3)'),
                  backdropFilter: 'blur(20px)',
                  border: darkMode
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: activeSection === item.label
                    ? (darkMode
                        ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)')
                    : (darkMode
                        ? '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        : '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)'),
                  color: activeSection === item.label
                    ? (darkMode ? '#ffffff' : '#1f2937')
                    : (darkMode ? '#d1d5db' : '#6b7280')
                }}
              >
                {/* Radiance Effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <item.icon className="w-5 h-5 relative z-10" />
                <span className="font-medium relative z-10">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* User Profile */}
        <div className="p-4" style={{
          borderTop: darkMode
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{
              background: darkMode
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(20px)'
            }}>
              <span className="text-sm font-bold" style={{ color: darkMode ? '#ffffff' : '#1f2937' }}>P</span>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: darkMode ? '#ffffff' : '#1f2937' }}>pred</p>
              <p className="text-xs" style={{ color: darkMode ? '#d1d5db' : '#6b7280' }}>Expert</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-4 flex items-center justify-between" style={{
          background: darkMode
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: darkMode
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          <div>
            <h1 className="text-xl font-semibold" style={{
              color: darkMode ? '#ffffff' : '#1f2937'
            }}>Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-lg transition-all duration-300 hover:scale-105 relative group"
              style={{
                background: darkMode
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                border: darkMode
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: darkMode
                  ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                color: darkMode ? '#ffffff' : '#6b7280'
              }}
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              <Bell className="w-5 h-5 relative z-10" />
            </button>
            <button
              onClick={() => setDarkMode && setDarkMode(!darkMode)}
              className="p-2 rounded-lg transition-all duration-300 hover:scale-105 relative group"
              style={{
                background: darkMode
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                border: darkMode
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: darkMode
                  ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                color: darkMode ? '#ffffff' : '#6b7280'
              }}
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              {darkMode ? <Sun className="w-5 h-5 relative z-10" /> : <Moon className="w-5 h-5 relative z-10" />}
            </button>
            <div className="w-8 h-8 rounded-full" style={{
              background: darkMode
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(20px)'
            }}></div>
          </div>
        </header>

        {/* Dashboard Content - EXACT REPLICA OF REFERENCE */}
        <main className="flex-1 p-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{
                color: darkMode ? '#ffffff' : '#1f2937'
              }}>Welcome back, pred</h2>
              <div className="flex gap-3">
                <button
                  onClick={handleCreateTutorial}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 relative group"
                  style={{
                    background: darkMode
                      ? 'rgba(0, 0, 0, 0.4)'
                      : 'rgba(0, 0, 0, 0.9)',
                    backdropFilter: 'blur(30px)',
                    border: darkMode
                      ? '2px solid rgba(255, 255, 255, 0.2)'
                      : '2px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: darkMode
                      ? '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.1)'
                      : '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.9), 0 0 30px rgba(0, 0, 0, 0.1)',
                    color: '#ffffff'
                  }}
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gray-500/20 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <FileText className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Create Tutorial</span>
                </button>
                <button
                  onClick={handleViewEarnings}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 relative group"
                  style={{
                    background: darkMode
                      ? 'rgba(59, 130, 246, 0.4)'
                      : 'rgba(37, 99, 235, 0.9)',
                    backdropFilter: 'blur(30px)',
                    border: darkMode
                      ? '2px solid rgba(59, 130, 246, 0.3)'
                      : '2px solid rgba(37, 99, 235, 0.1)',
                    boxShadow: darkMode
                      ? '0 20px 60px rgba(59, 130, 246, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 30px rgba(59, 130, 246, 0.2)'
                      : '0 20px 60px rgba(37, 99, 235, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.9), 0 0 30px rgba(37, 99, 235, 0.1)',
                    color: '#ffffff'
                  }}
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <Eye className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">View Earnings</span>
                </button>
              </div>
            </div>

            {/* Stats Cards Row - EXACT REPLICA */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {/* Sessions Completed */}
              <div className="p-4 rounded-lg backdrop-blur-xl hover:scale-105 transition-all duration-300" style={{
                background: darkMode
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(255, 255, 255, 0.95)',
                border: darkMode
                  ? '2px solid rgba(255, 255, 255, 0.2)'
                  : '2px solid rgba(0, 0, 0, 0.1)',
                boxShadow: darkMode
                  ? '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 50px rgba(255, 255, 255, 0.1)'
                  : '0 30px 80px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 1), 0 0 50px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="text-sm mb-1" style={{
                  color: darkMode ? '#d1d5db' : '#6b7280'
                }}>Sessions Completed</div>
                <div className="text-2xl font-bold" style={{
                  color: darkMode ? '#ffffff' : '#1f2937'
                }}>0</div>
              </div>

              {/* Earnings This Month */}
              <div className="p-4 rounded-lg backdrop-blur-xl hover:scale-105 transition-all duration-300" style={{
                background: darkMode
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(255, 255, 255, 0.95)',
                border: darkMode
                  ? '2px solid rgba(255, 255, 255, 0.2)'
                  : '2px solid rgba(0, 0, 0, 0.1)',
                boxShadow: darkMode
                  ? '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 50px rgba(255, 255, 255, 0.1)'
                  : '0 30px 80px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 1), 0 0 50px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="text-sm mb-1" style={{
                  color: darkMode ? '#d1d5db' : '#6b7280'
                }}>Earnings This Month</div>
                <div className="text-2xl font-bold" style={{
                  color: darkMode ? '#ffffff' : '#1f2937'
                }}>$0.00</div>
                <div className="w-full rounded-full h-1 mt-2" style={{
                  background: darkMode
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)'
                }}>
                  <div className="h-1 rounded-full" style={{
                    width: '0%',
                    background: darkMode ? '#ffffff' : '#1f2937'
                  }}></div>
                </div>
              </div>

              {/* Rating */}
              <div className="p-4 rounded-lg backdrop-blur-xl hover:scale-105 transition-all duration-300" style={{
                background: darkMode
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(255, 255, 255, 0.95)',
                border: darkMode
                  ? '2px solid rgba(255, 255, 255, 0.2)'
                  : '2px solid rgba(0, 0, 0, 0.1)',
                boxShadow: darkMode
                  ? '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 50px rgba(255, 255, 255, 0.1)'
                  : '0 30px 80px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 1), 0 0 50px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="text-sm mb-1" style={{
                  color: darkMode ? '#d1d5db' : '#6b7280'
                }}>Rating</div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold" style={{
                    color: darkMode ? '#ffffff' : '#1f2937'
                  }}>0.0</span>
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
              </div>

              {/* Completion Rate */}
              <div className="p-4 rounded-lg backdrop-blur-xl hover:scale-105 transition-all duration-300" style={{
                background: darkMode
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(255, 255, 255, 0.95)',
                border: darkMode
                  ? '2px solid rgba(255, 255, 255, 0.2)'
                  : '2px solid rgba(0, 0, 0, 0.1)',
                boxShadow: darkMode
                  ? '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 50px rgba(255, 255, 255, 0.1)'
                  : '0 30px 80px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 1), 0 0 50px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="text-sm mb-1" style={{
                  color: darkMode ? '#d1d5db' : '#6b7280'
                }}>Completion Rate</div>
                <div className="text-2xl font-bold" style={{
                  color: darkMode ? '#ffffff' : '#1f2937'
                }}>0%</div>
              </div>
            </div>
          </div>

          {/* Main Content Grid - EXACT REPLICA */}
          <div className="grid grid-cols-2 gap-6">
            {/* Active Sessions */}
            <div className="rounded-lg p-6 backdrop-blur-xl hover:scale-105 transition-all duration-300" style={{
              background: darkMode
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(255, 255, 255, 0.95)',
              border: darkMode
                ? '2px solid rgba(255, 255, 255, 0.2)'
                : '2px solid rgba(0, 0, 0, 0.1)',
              boxShadow: darkMode
                ? '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 50px rgba(255, 255, 255, 0.1)'
                : '0 30px 80px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 1), 0 0 50px rgba(0, 0, 0, 0.1)'
            }}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold" style={{
                  color: darkMode ? '#ffffff' : '#1f2937'
                }}>Active Sessions</h3>
                <p className="text-sm" style={{
                  color: darkMode ? '#d1d5db' : '#6b7280'
                }}>Your ongoing sessions with users</p>
              </div>
              <div className="flex flex-col items-center justify-center py-12">
                <MessageCircle className="w-12 h-12 mb-4" style={{
                  color: darkMode ? '#6b7280' : '#d1d5db'
                }} />
                <h4 className="text-lg font-medium mb-2" style={{
                  color: darkMode ? '#ffffff' : '#1f2937'
                }}>No active sessions</h4>
                <p className="text-sm text-center" style={{
                  color: darkMode ? '#d1d5db' : '#6b7280'
                }}>You don't have any ongoing sessions with users</p>
              </div>
            </div>

            {/* Recent Earnings */}
            <div className="rounded-lg p-6 backdrop-blur-xl hover:scale-105 transition-all duration-300" style={{
              background: darkMode
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(255, 255, 255, 0.95)',
              border: darkMode
                ? '2px solid rgba(255, 255, 255, 0.2)'
                : '2px solid rgba(0, 0, 0, 0.1)',
              boxShadow: darkMode
                ? '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 50px rgba(255, 255, 255, 0.1)'
                : '0 30px 80px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 1), 0 0 50px rgba(0, 0, 0, 0.1)'
            }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold" style={{
                    color: darkMode ? '#ffffff' : '#1f2937'
                  }}>Recent Earnings</h3>
                  <p className="text-sm" style={{
                    color: darkMode ? '#d1d5db' : '#6b7280'
                  }}>Your recent session payments</p>
                </div>
                <button
                  onClick={handleViewEarnings}
                  className="text-sm transition-colors hover:scale-105"
                  style={{
                    color: darkMode ? '#60a5fa' : '#2563eb'
                  }}
                >
                  View Detailed Earnings
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3" style={{
                  borderBottom: darkMode
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(0, 0, 0, 0.1)'
                }}>
                  <div>
                    <p className="font-medium text-sm" style={{
                      color: darkMode ? '#ffffff' : '#1f2937'
                    }}>React Performance Issues</p>
                    <p className="text-xs" style={{
                      color: darkMode ? '#d1d5db' : '#6b7280'
                    }}>45 min session • 3 days ago</p>
                  </div>
                  <span className="text-green-500 font-medium text-sm">+$45.00</span>
                </div>
                <div className="flex items-center justify-between py-3" style={{
                  borderBottom: darkMode
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(0, 0, 0, 0.1)'
                }}>
                  <div>
                    <p className="font-medium text-sm" style={{
                      color: darkMode ? '#ffffff' : '#1f2937'
                    }}>AWS Lambda Setup</p>
                    <p className="text-xs" style={{
                      color: darkMode ? '#d1d5db' : '#6b7280'
                    }}>30 min session • 5 days ago</p>
                  </div>
                  <span className="text-green-500 font-medium text-sm">+$30.00</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-sm" style={{
                      color: darkMode ? '#ffffff' : '#1f2937'
                    }}>Docker Container Issue</p>
                    <p className="text-xs" style={{
                      color: darkMode ? '#d1d5db' : '#6b7280'
                    }}>60 min session • 1 week ago</p>
                  </div>
                  <span className="text-green-500 font-medium text-sm">+$60.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - EXACT REPLICA */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            {/* Upcoming Sessions */}
            <div className="rounded-lg p-6 backdrop-blur-xl hover:scale-105 transition-all duration-300" style={{
              background: darkMode
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(255, 255, 255, 0.95)',
              border: darkMode
                ? '2px solid rgba(255, 255, 255, 0.2)'
                : '2px solid rgba(0, 0, 0, 0.1)',
              boxShadow: darkMode
                ? '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 50px rgba(255, 255, 255, 0.1)'
                : '0 30px 80px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 1), 0 0 50px rgba(0, 0, 0, 0.1)'
            }}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold" style={{
                  color: darkMode ? '#ffffff' : '#1f2937'
                }}>Upcoming Sessions</h3>
                <p className="text-sm" style={{
                  color: darkMode ? '#d1d5db' : '#6b7280'
                }}>Your scheduled sessions with users</p>
              </div>
              <div className="flex flex-col items-center justify-center py-12">
                <Calendar className="w-12 h-12 mb-4" style={{
                  color: darkMode ? '#6b7280' : '#d1d5db'
                }} />
                <h4 className="text-lg font-medium mb-2" style={{
                  color: darkMode ? '#ffffff' : '#1f2937'
                }}>No upcoming sessions</h4>
                <p className="text-sm text-center" style={{
                  color: darkMode ? '#d1d5db' : '#6b7280'
                }}>You don't have any scheduled sessions</p>
              </div>
            </div>

            {/* Expert Profile */}
            <div className="rounded-lg p-6 backdrop-blur-xl hover:scale-105 transition-all duration-300" style={{
              background: darkMode
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(255, 255, 255, 0.95)',
              border: darkMode
                ? '2px solid rgba(255, 255, 255, 0.2)'
                : '2px solid rgba(0, 0, 0, 0.1)',
              boxShadow: darkMode
                ? '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 50px rgba(255, 255, 255, 0.1)'
                : '0 30px 80px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 1), 0 0 50px rgba(0, 0, 0, 0.1)'
            }}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold" style={{
                  color: darkMode ? '#ffffff' : '#1f2937'
                }}>Expert Profile</h3>
                <p className="text-sm" style={{
                  color: darkMode ? '#d1d5db' : '#6b7280'
                }}>Your expertise and reputation</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2" style={{
                    color: darkMode ? '#ffffff' : '#1f2937'
                  }}>Expertise Domains</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs rounded-full" style={{
                      background: darkMode
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)',
                      color: darkMode ? '#d1d5db' : '#6b7280'
                    }}>Frontend Development</span>
                    <span className="px-3 py-1 text-xs rounded-full" style={{
                      background: darkMode
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)',
                      color: darkMode ? '#d1d5db' : '#6b7280'
                    }}>React.js</span>
                    <span className="px-3 py-1 text-xs rounded-full" style={{
                      background: darkMode
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)',
                      color: darkMode ? '#d1d5db' : '#6b7280'
                    }}>TypeScript</span>
                    <span className="px-3 py-1 text-xs rounded-full" style={{
                      background: darkMode
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)',
                      color: darkMode ? '#d1d5db' : '#6b7280'
                    }}>Redux</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1" style={{
                    color: darkMode ? '#ffffff' : '#1f2937'
                  }}>Current Rate</h4>
                  <p className="text-lg font-bold" style={{
                    color: darkMode ? '#ffffff' : '#1f2937'
                  }}>$25/hour</p>
                </div>
              </div>
            </div>
          </div>

          {/* Your Content Section - EXACT REPLICA */}
          <div className="mt-6 rounded-lg p-6 backdrop-blur-xl hover:scale-105 transition-all duration-300" style={{
            background: darkMode
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(255, 255, 255, 0.95)',
            border: darkMode
              ? '2px solid rgba(255, 255, 255, 0.2)'
              : '2px solid rgba(0, 0, 0, 0.1)',
            boxShadow: darkMode
              ? '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 50px rgba(255, 255, 255, 0.1)'
              : '0 30px 80px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 1), 0 0 50px rgba(0, 0, 0, 0.1)'
          }}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold" style={{
                color: darkMode ? '#ffffff' : '#1f2937'
              }}>Your Content</h3>
              <p className="text-sm" style={{
                color: darkMode ? '#d1d5db' : '#6b7280'
              }}>Tutorials and resources you've created</p>
            </div>
            <div className="flex flex-col items-center justify-center py-12">
              <FileText className="w-12 h-12 mb-4" style={{
                color: darkMode ? '#6b7280' : '#d1d5db'
              }} />
              <h4 className="text-lg font-medium mb-2" style={{
                color: darkMode ? '#ffffff' : '#1f2937'
              }}>No content created yet</h4>
              <p className="text-sm text-center" style={{
                color: darkMode ? '#d1d5db' : '#6b7280'
              }}>Start creating tutorials to help other developers</p>
            </div>
          </div>

          {/* Success Message - EXACT REPLICA */}
          <div className="mt-6 rounded-lg p-4 backdrop-blur-xl hover:scale-105 transition-all duration-300" style={{
            background: darkMode
              ? 'rgba(34, 197, 94, 0.2)'
              : 'rgba(34, 197, 94, 0.15)',
            border: darkMode
              ? '2px solid rgba(34, 197, 94, 0.4)'
              : '2px solid rgba(34, 197, 94, 0.3)',
            boxShadow: darkMode
              ? '0 20px 60px rgba(34, 197, 94, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2), 0 0 30px rgba(34, 197, 94, 0.2)'
              : '0 20px 60px rgba(34, 197, 94, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.9), 0 0 30px rgba(34, 197, 94, 0.1)'
          }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-600">Login successful</span>
            </div>
            <p className="text-sm text-green-600">Welcome back!</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardReference
