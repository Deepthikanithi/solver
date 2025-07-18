import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Copy, Star, BookOpen, Calendar, Clock, Monitor, Globe,
  Users, Timer, FileText, Bell, BellOff, Video, Eye,
  MessageCircle, User, DollarSign, PlayCircle
} from 'lucide-react'

const Sessions = ({ darkMode }) => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('overview')
  const [showBookingLink, setShowBookingLink] = useState(false)
  const [showFaceVerification, setShowFaceVerification] = useState(false)
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Comprehensive mock data for all session features
  const sessionStats = {
    totalSessions: 127,
    activeSessions: 2,
    upcomingSessions: 8,
    completedSessions: 117,
    totalHours: 234.5,
    avgRating: 4.8,
    responseRate: 98,
    onTimeRate: 95
  }

  const mockSessions = {
    upcoming: [
      {
        id: 'UP001',
        student: 'Alice Johnson',
        topic: 'React Fundamentals & Hooks',
        date: '2025-07-15',
        time: '14:00 - 15:00',
        type: 'Individual',
        status: 'Confirmed',
        avatar: 'AJ',
        platform: 'Google Meet',
        faceVerified: false,
        reminderSet: true,
        difficulty: 'Intermediate',
        sessionNotes: 'Focus on useState and useEffect hooks',
        studentTimezone: 'EST'
      },
      {
        id: 'UP002',
        student: 'Bob Chen',
        topic: 'JavaScript ES6 & Modern Features',
        date: '2025-07-16',
        time: '10:00 - 11:30',
        type: 'Team Session',
        status: 'Pending',
        avatar: 'BC',
        platform: 'Microsoft Teams',
        participants: 3,
        faceVerified: false,
        reminderSet: false,
        difficulty: 'Advanced',
        sessionNotes: 'Team learning session for startup developers',
        studentTimezone: 'PST'
      },
      {
        id: 'UP003',
        student: 'Carol Davis',
        topic: 'Node.js APIs & Database Integration',
        date: '2025-07-17',
        time: '16:00 - 17:00',
        type: 'Bulk Minutes',
        status: 'Confirmed',
        avatar: 'CD',
        platform: 'SynapMentor Meet',
        bulkMinutes: 120,
        faceVerified: true,
        reminderSet: true,
        difficulty: 'Expert',
        sessionNotes: 'Advanced backend development concepts',
        studentTimezone: 'GMT'
      }
    ],
    active: [
      {
        id: 'AC001',
        student: 'David Wilson',
        topic: 'CSS Grid & Flexbox Mastery',
        startTime: '14:30',
        duration: '45 min',
        type: 'Individual',
        participants: 1,
        status: 'Live',
        avatar: 'DW',
        platform: 'SynapMentor Meet',
        features: {
          screenShare: true,
          whiteboard: true,
          recording: true,
          chat: true,
          captions: true,
          fileSharing: true,
          reactions: true,
          handRaise: false,
          muteAll: false,
          voiceActive: true
        },
        sessionQuality: 'HD',
        connectionStatus: 'Excellent'
      },
      {
        id: 'AC002',
        student: 'Emma Rodriguez',
        topic: 'Python Data Science Fundamentals',
        startTime: '15:45',
        duration: '30 min',
        type: 'Bulk Minutes',
        participants: 1,
        status: 'Live',
        avatar: 'ER',
        platform: 'Google Meet',
        features: {
          screenShare: false,
          whiteboard: false,
          recording: true,
          chat: true,
          captions: false,
          fileSharing: false,
          reactions: true,
          handRaise: true,
          muteAll: false,
          voiceActive: true
        },
        sessionQuality: 'HD',
        connectionStatus: 'Good'
      }
    ],
    completed: [
      {
        id: 'CM001',
        student: 'Emma Brown',
        topic: 'React Hooks & State Management',
        date: '2025-07-10',
        duration: '60 min',
        rating: 5,
        recorded: true,
        type: 'Individual',
        review: 'Excellent session! Very clear explanations and practical examples.',
        files: ['react-hooks-notes.pdf', 'code-examples.zip', 'session-recording.mp4'],
        avatar: 'EB',
        earnings: 60,
        completionStatus: 'Completed',
        followUpScheduled: false
      },
      {
        id: 'CM002',
        student: 'Michael Chen',
        topic: 'Vue.js Components & Composition API',
        date: '2025-07-12',
        duration: '90 min',
        rating: 4.8,
        recorded: true,
        type: 'Team Session',
        review: 'Great team collaboration session. Learned a lot about Vue 3.',
        files: ['vue-components-guide.pdf', 'composition-api-examples.js'],
        avatar: 'MC',
        earnings: 135,
        completionStatus: 'Completed',
        followUpScheduled: true
      },
      {
        id: 'CM003',
        student: 'Sarah Johnson',
        topic: 'TypeScript Advanced Types',
        date: '2025-07-08',
        duration: '75 min',
        rating: 4.9,
        recorded: true,
        type: 'Individual',
        review: 'Amazing deep dive into TypeScript. Highly recommended!',
        files: ['typescript-advanced.pdf', 'type-examples.ts', 'session-recording.mp4'],
        avatar: 'SJ',
        earnings: 112.5,
        completionStatus: 'Completed',
        followUpScheduled: false
      }
    ],
    rescheduled: [
      {
        id: 'RS001',
        student: 'Sarah Davis',
        topic: 'TypeScript Basics & Configuration',
        originalDate: '2025-07-13',
        newDate: '2025-07-20',
        time: '15:00 - 16:00',
        reason: 'Student scheduling conflict',
        type: 'Individual',
        avatar: 'SD',
        rescheduledBy: 'Student',
        newTimeConfirmed: true
      },
      {
        id: 'RS002',
        student: 'Alex Thompson',
        topic: 'React Native Development',
        originalDate: '2025-07-14',
        newDate: '2025-07-21',
        time: '13:00 - 14:30',
        reason: 'Mentor availability change',
        type: 'Individual',
        avatar: 'AT',
        rescheduledBy: 'Mentor',
        newTimeConfirmed: false
      }
    ],
    cancelled: [
      {
        id: 'CN001',
        student: 'John Smith',
        topic: 'Angular Components & Services',
        date: '2025-07-11',
        time: '11:00 - 12:00',
        reason: 'Technical issues - Internet connectivity',
        type: 'Individual',
        refunded: true,
        avatar: 'JS',
        cancelledBy: 'Student',
        refundAmount: 60
      },
      {
        id: 'CN002',
        student: 'Lisa Wang',
        topic: 'Database Design Principles',
        date: '2025-07-09',
        time: '16:00 - 17:30',
        reason: 'Emergency - Family situation',
        type: 'Individual',
        refunded: true,
        avatar: 'LW',
        cancelledBy: 'Student',
        refundAmount: 90
      }
    ]
  }

  // Calendar and availability data
  const availabilityData = {
    '2025-07-15': { slots: ['09:00', '14:00', '16:00'], booked: ['14:00'] },
    '2025-07-16': { slots: ['10:00', '13:00', '15:00'], booked: ['10:00'] },
    '2025-07-17': { slots: ['11:00', '14:00', '16:00'], booked: ['16:00'] },
    '2025-07-18': { slots: ['09:00', '12:00', '15:00'], booked: [] },
    '2025-07-19': { slots: ['10:00', '13:00', '17:00'], booked: ['13:00'] }
  }

  const bookingLink = "https://synapmentor.com/book/pred-mentor"

  // Enhanced handler functions
  const copyBookingLink = () => {
    navigator.clipboard.writeText(bookingLink)
    console.log('Booking link copied to clipboard')
    // You can add a toast notification here instead of alert
  }

  const handleFaceVerification = (sessionId) => {
    setShowFaceVerification(true)
    console.log(`🔍 Starting face verification for session: ${sessionId}`)

    // Simulate face verification process
    setTimeout(() => {
      setShowFaceVerification(false)
      console.log('Face verification successful! You can now join the session.')
      // Update session data to mark as face verified
      const session = mockSessions.upcoming.find(s => s.id === sessionId)
      if (session) session.faceVerified = true
    }, 3000)
  }

  const handleCalendarIntegration = (platform) => {
    console.log(`Integrating with ${platform} Calendar`)
    // Implement actual calendar integration logic here
    window.open(`https://calendar.${platform.toLowerCase()}.com`, '_blank')
  }

  const toggleSessionFeature = (sessionId, feature) => {
    console.log(`Toggling ${feature} for session: ${sessionId}`)
    // Implement actual feature toggle logic here
    const session = mockSessions.active.find(s => s.id === sessionId)
    if (session && session.features) {
      session.features[feature] = !session.features[feature]
    }
  }

  const handleFileShare = (sessionId) => {
    console.log(`Opening file share for session: ${sessionId}`)
    // Implement file sharing functionality
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.multiple = true
    fileInput.click()
  }

  const handleWhiteboard = (sessionId) => {
    console.log(`Opening whiteboard for session: ${sessionId}`)
    // Implement whiteboard functionality
    window.open(`/whiteboard/${sessionId}`, '_blank')
  }

  const handleReactions = (sessionId, reaction) => {
    console.log(`Reaction ${reaction} sent in session: ${sessionId}`)
    // Implement reaction functionality
    // This would typically send the reaction to other participants
  }

  const joinSession = (sessionId) => {
    const session = mockSessions.upcoming.find(s => s.id === sessionId)

    if (!session?.faceVerified) {
      handleFaceVerification(sessionId)
      return
    }

    console.log(`🚀 Joining session: ${sessionId}`)
    navigate(`/sessions/live/${sessionId}`)
  }

  const extendSession = (sessionId, minutes) => {
    console.log(`Extending session ${sessionId} by ${minutes} minutes`)
    // Implement session extension logic
    const session = mockSessions.active.find(s => s.id === sessionId)
    if (session) {
      // Update session end time
      console.log(`Session ${sessionId} extended by ${minutes} minutes`)
    }
  }

  const scheduleReminder = (sessionId, minutes) => {
    console.log(`Reminder set for ${minutes} minutes before session ${sessionId}`)
    // Implement reminder scheduling logic
    const reminderTime = new Date(Date.now() + (minutes * 60 * 1000))
    console.log(`Reminder scheduled for: ${reminderTime.toLocaleString()}`)
  }

  const handleSessionReview = (sessionId) => {
    console.log(`Opening review for session: ${sessionId}`)
    // Navigate to review page or open review modal
    navigate(`/sessions/review/${sessionId}`)
  }

  const downloadRecording = (sessionId) => {
    console.log(`Downloading recording for session: ${sessionId}`)
    // Implement recording download logic
    const downloadUrl = `/api/sessions/${sessionId}/recording`
    window.open(downloadUrl, '_blank')
  }

  const downloadFile = (fileName) => {
    console.log(`Downloading file: ${fileName}`)
    // Implement file download logic
    const downloadUrl = `/api/files/${fileName}`
    window.open(downloadUrl, '_blank')
  }

  // Calendar helper functions
  const getMonthYear = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return `${months[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode ? 'bg-[#00001a]' : 'bg-gray-50'
    }`}>

      {/* Face Verification Modal */}
      {showFaceVerification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className={`group p-8 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden max-w-md w-full mx-4 ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20'
              : 'rounded-lg bg-white border-gray-200'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}>
            <div className="relative z-10 text-center">
              <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm border ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-[#00001a]/10 border-[#00001a]/20'
              }`}>
                <svg className={`w-10 h-10 ${darkMode ? 'text-white/70' : 'text-[#00001a]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Face Verification
              </h3>
              <p className={`text-sm mb-4 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                Please look at the camera for verification before joining the session
              </p>
              <div className="animate-pulse">
                <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
                  <div className={`w-1/2 h-2 rounded-full animate-pulse ${darkMode ? 'bg-blue-500' : 'bg-[#00001a]'}`}></div>
                </div>
                <p className={`text-xs mt-2 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                  Verifying identity...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Sessions & Bookings
            </h1>
            <p className={`mt-1 text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
              Manage your mentoring sessions, bookings, and video calls
            </p>
          </div>

          {/* Action Buttons - Same style as Dashboard */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setShowBookingLink(!showBookingLink)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-500 ${
                darkMode
                  ? 'bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-2xl shadow-lg'
                  : 'bg-white text-[#00001a] border border-gray-300 hover:bg-gray-50'
              }`}
              style={darkMode ? {
                boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              } : {}}
              onMouseEnter={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.1)';
                }
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              My Booking Link
            </button>
            <button
              onClick={() => setActiveSection('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-500 ${
                darkMode
                  ? 'bg-white/5 text-white/90 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl shadow-lg'
                  : 'bg-gray-800 text-white border border-gray-800 hover:bg-gray-700'
              }`}
              style={darkMode ? {
                boxShadow: '0 4px 20px rgba(255, 255, 255, 0.05)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              } : {}}
              onMouseEnter={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.05)';
                }
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Session Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="p-4 space-y-6">

        {/* Booking Link Modal */}
        {showBookingLink && (
          <div className={`group p-5 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
            } else {
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
            } else {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
          }}>
            <div className="relative z-10">
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Your Profile Booking Link
              </h3>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={bookingLink}
                  readOnly
                  className={`flex-1 px-4 py-3 rounded-lg border backdrop-blur-sm ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-gray-50 border-gray-200 text-[#00001a]'
                  }`}
                />
                <button
                  onClick={copyBookingLink}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm border ${
                    darkMode
                      ? 'bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/25 hover:shadow-lg'
                      : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                  }`}
                >
                  <Copy size={16} className="mr-2" />
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Session Stats Cards - Same style as Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-6">
          {/* Total Sessions */}
          <div className={`group p-4 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
            } else {
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
            } else {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
          }}>
            <div className="relative z-10">
              <h3 className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                Total Sessions
              </h3>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {sessionStats.totalSessions}
              </div>
            </div>
          </div>

          {/* Active Sessions */}
          <div className={`group p-4 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
            } else {
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
            } else {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
          }}>
            <div className="relative z-10">
              <h3 className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                Active Sessions
              </h3>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {sessionStats.activeSessions}
              </div>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className={`group p-4 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
            } else {
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
            } else {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
          }}>
            <div className="relative z-10">
              <h3 className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                Upcoming Sessions
              </h3>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {sessionStats.upcomingSessions}
              </div>
            </div>
          </div>

          {/* Completed Sessions */}
          <div className={`group p-4 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
            } else {
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
            } else {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
          }}>
            <div className="relative z-10">
              <h3 className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                Completed Sessions
              </h3>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {sessionStats.completedSessions}
              </div>
            </div>
          </div>

          {/* Total Hours */}
          <div className={`group p-4 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
            } else {
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
            } else {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
          }}>
            <div className="relative z-10">
              <h3 className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                Total Hours
              </h3>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {sessionStats.totalHours}
              </div>
            </div>
          </div>

          {/* Average Rating */}
          <div className={`group p-4 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
            } else {
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
            } else {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
          }}>
            <div className="relative z-10">
              <h3 className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                Average Rating
              </h3>
              <div className={`text-2xl font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {sessionStats.avgRating} <Star size={20} className={darkMode ? 'text-yellow-400' : 'text-[#00001a]'} fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Response Rate */}
          <div className={`group p-4 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
            } else {
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
            } else {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
          }}>
            <div className="relative z-10">
              <h3 className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                Response Rate
              </h3>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {sessionStats.responseRate}%
              </div>
            </div>
          </div>

          {/* On-Time Rate */}
          <div className={`group p-4 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
            } else {
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
            } else {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
          }}>
            <div className="relative z-10">
              <h3 className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                On-Time Rate
              </h3>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {sessionStats.onTimeRate}%
              </div>
            </div>
          </div>
        </div>

        {/* Active Sessions - Live Session Management */}
        <div className={`group p-8 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
          darkMode
            ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
            : 'rounded-lg bg-white border-gray-200'
        }`}
        style={darkMode ? {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        } : {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
          } else {
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
          }
        }}
        onMouseLeave={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
          } else {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }
        }}>
          <div className="relative z-10">
            <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Active Sessions
            </h3>

            {mockSessions.active.length > 0 && (
              <div className="space-y-6">
                <div className={`p-6 rounded-lg border backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                  darkMode ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20' : 'bg-white border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md'
                }`}>
                  <p className={`text-center ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Active Session Placeholder
                  </p>
                </div>
              </div>
            )}

            {mockSessions.active.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border ${
                  darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-200 border-gray-300'
                }`}>
                  <svg className={`w-10 h-10 ${darkMode ? 'text-white/50' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  No Active Sessions
                </h4>
                <p className={`text-sm text-center ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                  You don't have any live sessions running at the moment
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className={`group p-8 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
          darkMode
            ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
            : 'rounded-lg bg-white border-gray-200'
        }`}
        style={darkMode ? {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        } : {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
          } else {
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
          }
        }}
        onMouseLeave={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
          } else {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }
        }}>
          <div className="relative z-10">
            <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Upcoming Sessions
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockSessions.upcoming.map((session) => (
                <div
                  key={session.id}
                  className={`p-6 rounded-lg border backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                    darkMode ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20' : 'bg-white border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md'
                  }`}
                  style={darkMode ? {
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  } : {
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (darkMode) {
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)';
                    } else {
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (darkMode) {
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                    } else {
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                    }
                  }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold backdrop-blur-sm border ${
                        darkMode ? 'bg-blue-500/15 text-blue-400 border-blue-500/30' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                      }`}>
                        {session.avatar}
                      </div>
                      <div>
                        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {session.student}
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                          {session.type} • {session.difficulty}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm border ${
                      session.status === 'Confirmed'
                        ? darkMode ? 'bg-green-500/15 text-green-400 border-green-500/30' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                        : darkMode ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' : 'bg-[#00001a]/15 text-[#00001a] border-[#00001a]/25'
                    }`}>
                      {session.status}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className={`font-medium mb-2 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      <BookOpen size={16} className={darkMode ? 'text-blue-400' : 'text-[#00001a]'} />
                      {session.topic}
                    </h4>
                    <div className={`text-sm space-y-1 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      <p className="flex items-center gap-2">
                        <Calendar size={14} className={darkMode ? 'text-green-400' : 'text-[#00001a]/70'} />
                        {session.date}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={14} className={darkMode ? 'text-orange-400' : 'text-[#00001a]/70'} />
                        {session.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <Monitor size={14} className={darkMode ? 'text-purple-400' : 'text-[#00001a]/70'} />
                        {session.platform}
                      </p>
                      <p className="flex items-center gap-2">
                        <Globe size={14} className={darkMode ? 'text-cyan-400' : 'text-[#00001a]/70'} />
                        {session.studentTimezone}
                      </p>
                      {session.participants && (
                        <p className="flex items-center gap-2">
                          <Users size={14} className={darkMode ? 'text-indigo-400' : 'text-[#00001a]/70'} />
                          {session.participants} participants
                        </p>
                      )}
                      {session.bulkMinutes && (
                        <p className="flex items-center gap-2">
                          <Timer size={14} className={darkMode ? 'text-red-400' : 'text-[#00001a]/70'} />
                          {session.bulkMinutes} bulk minutes
                        </p>
                      )}
                      {session.sessionNotes && (
                        <p className="flex items-center gap-2">
                          <FileText size={14} className={darkMode ? 'text-gray-400' : 'text-[#00001a]/70'} />
                          {session.sessionNotes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => joinSession(session.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm border ${
                        session.faceVerified
                          ? darkMode
                            ? 'bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/25'
                            : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                          : darkMode
                            ? 'bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25'
                            : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                      }`}
                    >
                      {session.faceVerified ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Join Session
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Verify & Join
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => scheduleReminder(session.id, 15)}
                      className={`px-3 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm border ${
                        session.reminderSet
                          ? darkMode
                            ? 'bg-green-500/15 text-green-400 border-green-500/30'
                            : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                          : darkMode
                            ? 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                            : 'bg-white text-[#00001a]/70 border-[#00001a]/20 hover:bg-[#00001a]/5'
                      }`}
                    >
                      {session.reminderSet ?
                        <Bell size={16} className={darkMode ? 'text-green-400' : 'text-[#00001a]'} /> :
                        <BellOff size={16} className={darkMode ? 'text-gray-400' : 'text-[#00001a]/70'} />
                      }
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Availability Analytics & Calendar Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar Integration */}
          <div className={`group p-8 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
            } else {
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
            } else {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
          }}>
            <div className="relative z-10">
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Calendar Integration
              </h3>

              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h4 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {getMonthYear()}
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={goToPreviousMonth}
                    className={`p-2 rounded-lg transition-all duration-300 backdrop-blur-sm border ${
                      darkMode ? 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    ←
                  </button>
                  <button
                    onClick={goToNextMonth}
                    className={`p-2 rounded-lg transition-all duration-300 backdrop-blur-sm border ${
                      darkMode ? 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Calendar Integration Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => handleCalendarIntegration('Google')}
                  className={`p-4 rounded-lg border transition-all duration-300 backdrop-blur-sm ${
                    darkMode ? 'bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20 hover:bg-[#00001a]/15'
                  }`}
                >
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="font-semibold">Google Calendar</p>
                    <p className="text-xs opacity-70">Sync availability</p>
                  </div>
                </button>
                <button
                  onClick={() => handleCalendarIntegration('Microsoft')}
                  className={`p-4 rounded-lg border transition-all duration-300 backdrop-blur-sm ${
                    darkMode ? 'bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20 hover:bg-[#00001a]/15'
                  }`}
                >
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="font-semibold">Microsoft Calendar</p>
                    <p className="text-xs opacity-70">Sync availability</p>
                  </div>
                </button>
              </div>

              {/* Available Slots Preview */}
              <div className="space-y-3">
                <h5 className={`font-medium ${darkMode ? 'text-white/80' : 'text-[#00001a]/80'}`}>
                  Available Slots This Week
                </h5>
                {Object.entries(availabilityData).slice(0, 3).map(([date, data]) => (
                  <div key={date} className={`p-3 rounded-lg border backdrop-blur-sm ${
                    darkMode ? 'bg-white/3 border-white/10' : 'bg-white border-gray-300 shadow-sm'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </span>
                      <div className="flex gap-2">
                        {data.slots.map((slot) => (
                          <span
                            key={slot}
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              data.booked.includes(slot)
                                ? darkMode ? 'bg-red-500/15 text-red-400' : 'bg-[#00001a] text-white'
                                : darkMode ? 'bg-green-500/15 text-green-400' : 'bg-[#00001a]/10 text-[#00001a]'
                            }`}
                          >
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Availability Analytics */}
          <div className={`group p-8 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
            } else {
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
            } else {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
          }}>
            <div className="relative z-10">
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Availability Analytics
              </h3>

              {/* Analytics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-lg border backdrop-blur-sm ${
                  darkMode ? 'bg-white/3 border-white/10' : 'bg-white border-gray-300 shadow-sm'
                }`}>
                  <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Weekly Availability
                  </h4>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    85%
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                    +5% from last week
                  </p>
                </div>

                <div className={`p-4 rounded-lg border backdrop-blur-sm ${
                  darkMode ? 'bg-white/3 border-white/10' : 'bg-white border-gray-300 shadow-sm'
                }`}>
                  <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Booking Rate
                  </h4>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    72%
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                    +8% from last week
                  </p>
                </div>

                <div className={`p-4 rounded-lg border backdrop-blur-sm ${
                  darkMode ? 'bg-white/3 border-white/10' : 'bg-white border-gray-300 shadow-sm'
                }`}>
                  <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Peak Hours
                  </h4>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    2-6 PM
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                    Most popular time
                  </p>
                </div>

                <div className={`p-4 rounded-lg border backdrop-blur-sm ${
                  darkMode ? 'bg-white/3 border-white/10' : 'bg-white border-gray-300 shadow-sm'
                }`}>
                  <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    No-Show Rate
                  </h4>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    3%
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                    -2% from last week
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <h5 className={`font-medium ${darkMode ? 'text-white/80' : 'text-[#00001a]/80'}`}>
                  Quick Actions
                </h5>
                <div className="grid grid-cols-1 gap-2">
                  <button className={`p-3 rounded-lg border transition-all duration-300 backdrop-blur-sm text-left ${
                    darkMode ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20' : 'bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Update Availability
                      </span>
                      <svg className={`w-4 h-4 ${darkMode ? 'text-white/50' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                  <button className={`p-3 rounded-lg border transition-all duration-300 backdrop-blur-sm text-left ${
                    darkMode ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20' : 'bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        View Detailed Analytics
                      </span>
                      <svg className={`w-4 h-4 ${darkMode ? 'text-white/50' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Sessions with Recordings & Reviews */}
        <div className={`group p-8 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
          darkMode
            ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
            : 'rounded-lg bg-white border-gray-200'
        }`}
        style={darkMode ? {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        } : {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
          } else {
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
          }
        }}
        onMouseLeave={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
          } else {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }
        }}>
          <div className="relative z-10">
            <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Completed Sessions
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockSessions.completed.map((session) => (
                <div
                  key={session.id}
                  className={`p-6 rounded-lg border backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                    darkMode ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20' : 'bg-white border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md'
                  }`}
                  style={darkMode ? {
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  } : {
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (darkMode) {
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)';
                    } else {
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (darkMode) {
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                    } else {
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                    }
                  }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold backdrop-blur-sm border ${
                        darkMode ? 'bg-green-500/15 text-green-400 border-green-500/30' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                      }`}>
                        {session.avatar}
                      </div>
                      <div>
                        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {session.student}
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                          {session.type} • ${session.earnings}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < Math.floor(session.rating)
                                ? darkMode ? 'text-yellow-400' : 'text-[#00001a]'
                                : darkMode ? 'text-gray-600' : 'text-[#00001a]/30'
                            }`}
                            fill={i < Math.floor(session.rating) ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                      <span className={`text-sm font-medium ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                        {session.rating}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className={`font-medium mb-2 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      <BookOpen size={16} className={darkMode ? 'text-blue-400' : 'text-[#00001a]'} />
                      {session.topic}
                    </h4>
                    <div className={`text-sm space-y-1 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      <p className="flex items-center gap-2">
                        <Calendar size={14} className={darkMode ? 'text-green-400' : 'text-[#00001a]/70'} />
                        {session.date}
                      </p>
                      <p className="flex items-center gap-2">
                        <Timer size={14} className={darkMode ? 'text-orange-400' : 'text-[#00001a]/70'} />
                        {session.duration}
                      </p>
                      <p className="flex items-center gap-2">
                        <DollarSign size={14} className={darkMode ? 'text-green-400' : 'text-[#00001a]/70'} />
                        Earned: ${session.earnings}
                      </p>
                      {session.recorded && (
                        <p className="flex items-center gap-2">
                          <PlayCircle size={14} className={darkMode ? 'text-purple-400' : 'text-[#00001a]/70'} />
                          Recording available
                        </p>
                      )}
                    </div>
                    <p className={`text-sm mt-2 italic ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                      "{session.review}"
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Files */}
                    <div>
                      <h5 className={`text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-[#00001a]/80'}`}>
                        Session Files
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {session.files.map((file, index) => (
                          <button
                            key={index}
                            onClick={() => downloadFile(file)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 backdrop-blur-sm border ${
                              darkMode ? 'bg-gray-500/15 text-gray-400 border-gray-500/30 hover:bg-gray-500/25' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                            }`}
                          >
                            {file}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {session.recorded && (
                        <button
                          onClick={() => downloadRecording(session.id)}
                          className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm border ${
                            darkMode ? 'bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25' : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                          }`}
                        >
                          Download Recording
                        </button>
                      )}
                      <button
                        onClick={() => handleSessionReview(session.id)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm border ${
                          darkMode ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/25' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20 hover:bg-[#00001a]/15'
                        }`}
                      >
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rescheduled & Cancelled Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rescheduled Sessions */}
          <div className={`group p-8 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
            } else {
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
            } else {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
          }}>
            <div className="relative z-10">
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Rescheduled Sessions
              </h3>
              <div className="space-y-4">
                {mockSessions.rescheduled.map((session) => (
                  <div
                    key={session.id}
                    className={`p-4 rounded-lg border backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                      darkMode ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20' : 'bg-white border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md'
                    }`}
                    style={darkMode ? {
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    } : {
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (darkMode) {
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)';
                      } else {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (darkMode) {
                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                      } else {
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                      }
                    }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold backdrop-blur-sm border ${
                        darkMode ? 'bg-orange-500/15 text-orange-400 border-orange-500/30' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                      }`}>
                        {session.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {session.student}
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                          {session.topic}
                        </p>
                      </div>
                    </div>
                    <div className={`text-sm space-y-1 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      <p className="flex items-center gap-2">
                        <Calendar size={14} className={darkMode ? 'text-red-400' : 'text-[#00001a]/70'} />
                        Original: {session.originalDate}
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar size={14} className={darkMode ? 'text-green-400' : 'text-[#00001a]/70'} />
                        New: {session.newDate} at {session.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <MessageCircle size={14} className={darkMode ? 'text-blue-400' : 'text-[#00001a]/70'} />
                        Reason: {session.reason}
                      </p>
                      <p className="flex items-center gap-2">
                        <User size={14} className={darkMode ? 'text-purple-400' : 'text-[#00001a]/70'} />
                        By: {session.rescheduledBy}
                      </p>
                    </div>
                    <div className="mt-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm border ${
                        session.newTimeConfirmed
                          ? darkMode ? 'bg-green-500/15 text-green-400 border-green-500/30' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                          : darkMode ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' : 'bg-[#00001a]/15 text-[#00001a] border-[#00001a]/25'
                      }`}>
                        {session.newTimeConfirmed ? '✅ Confirmed' : '⏳ Pending Confirmation'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cancelled Sessions */}
          <div className={`group p-8 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
            } else {
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
            } else {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
          }}>
            <div className="relative z-10">
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Cancelled Sessions
              </h3>
              <div className="space-y-4">
                {mockSessions.cancelled.map((session) => (
                  <div
                    key={session.id}
                    className={`p-4 rounded-lg border backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                      darkMode ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20' : 'bg-white border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md'
                    }`}
                    style={darkMode ? {
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    } : {
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (darkMode) {
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)';
                      } else {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (darkMode) {
                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                      } else {
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                      }
                    }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold backdrop-blur-sm border ${
                        darkMode ? 'bg-red-500/15 text-red-400 border-red-500/30' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                      }`}>
                        {session.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {session.student}
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                          {session.topic}
                        </p>
                      </div>
                    </div>
                    <div className={`text-sm space-y-1 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      <p className="flex items-center gap-2">
                        <Calendar size={14} className={darkMode ? 'text-red-400' : 'text-[#00001a]/70'} />
                        Date: {session.date} at {session.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <MessageCircle size={14} className={darkMode ? 'text-blue-400' : 'text-[#00001a]/70'} />
                        Reason: {session.reason}
                      </p>
                      <p className="flex items-center gap-2">
                        <User size={14} className={darkMode ? 'text-purple-400' : 'text-[#00001a]/70'} />
                        Cancelled by: {session.cancelledBy}
                      </p>
                      {session.refunded && (
                        <p className="flex items-center gap-2">
                          <DollarSign size={14} className={darkMode ? 'text-green-400' : 'text-[#00001a]/70'} />
                          Refund: ${session.refundAmount}
                        </p>
                      )}
                    </div>
                    <div className="mt-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm border ${
                        session.refunded
                          ? darkMode ? 'bg-green-500/15 text-green-400 border-green-500/30' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                          : darkMode ? 'bg-red-500/15 text-red-400 border-red-500/30' : 'bg-[#00001a]/20 text-[#00001a] border-[#00001a]/30'
                      }`}>
                        {session.refunded ? 'Refunded' : 'No Refund'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Minutes & Team Sessions */}
        <div className={`group p-8 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
          darkMode
            ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
            : 'rounded-lg bg-white border-gray-200'
        }`}
        style={darkMode ? {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        } : {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
          } else {
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
          }
        }}
        onMouseLeave={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
          } else {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }
        }}>
          <div className="relative z-10">
            <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Bulk Minutes & Team Sessions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Bulk Minutes Overview */}
              <div className={`p-6 rounded-lg border backdrop-blur-sm ${
                darkMode ? 'bg-white/3 border-white/10' : 'bg-white border-gray-300 shadow-sm'
              }`}>
                <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Bulk Minutes
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Available:</span>
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>450 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Used:</span>
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>120 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Remaining:</span>
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>330 min</span>
                  </div>
                </div>
              </div>

              {/* Team Sessions */}
              <div className={`p-6 rounded-lg border backdrop-blur-sm ${
                darkMode ? 'bg-white/3 border-white/10' : 'bg-white border-gray-300 shadow-sm'
              }`}>
                <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Team Sessions
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Active Teams:</span>
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Max Participants:</span>
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Team Rate:</span>
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>$35/hr</span>
                  </div>
                </div>
              </div>

              {/* Session Features */}
              <div className={`p-6 rounded-lg border backdrop-blur-sm ${
                darkMode ? 'bg-white/3 border-white/10' : 'bg-white border-gray-300 shadow-sm'
              }`}>
                <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Session Features
                </h4>
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    <span className={darkMode ? 'text-green-500' : 'text-[#00001a]'}>✓</span>
                    <span>Screen Sharing</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    <span className={darkMode ? 'text-green-500' : 'text-[#00001a]'}>✓</span>
                    <span>Whiteboard</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    <span className={darkMode ? 'text-green-500' : 'text-[#00001a]'}>✓</span>
                    <span>Recording</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    <span className={darkMode ? 'text-green-500' : 'text-[#00001a]'}>✓</span>
                    <span>File Sharing</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className={`p-6 rounded-lg border backdrop-blur-sm ${
                darkMode ? 'bg-white/3 border-white/10' : 'bg-white border-gray-300 shadow-sm'
              }`}>
                <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  <button className={`w-full p-2 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                    darkMode ? 'bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20 hover:bg-[#00001a]/15'
                  }`}>
                    View Analytics
                  </button>
                  <button className={`w-full p-2 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                    darkMode ? 'bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/25' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20 hover:bg-[#00001a]/15'
                  }`}>
                    Settings
                  </button>
                  <button className={`w-full p-2 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                    darkMode ? 'bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20 hover:bg-[#00001a]/15'
                  }`}>
                    Reports
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sessions
