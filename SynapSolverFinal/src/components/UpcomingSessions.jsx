import React, { useState } from 'react'
import { Calendar, BookOpen, Video, Eye, User } from 'lucide-react'

const UpcomingSessions = ({ darkMode }) => {
  const [viewMode, setViewMode] = useState('today') // today, week, month
  const [selectedSession, setSelectedSession] = useState(null)
  
  const upcomingSessions = [
    {
      id: 1,
      subject: 'React.js Advanced Patterns',
      student: {
        name: 'Alice Johnson',
        email: 'alice.j@email.com',
        avatar: 'AJ',
        level: 'Advanced',
        rating: 4.9,
        timezone: 'EST'
      },
      schedule: {
        date: '2024-01-20',
        startTime: '10:00',
        endTime: '11:30',
        duration: 90,
        type: 'One-on-One'
      },
      details: {
        price: 85,
        status: 'Confirmed',
        meetingLink: 'https://meet.google.com/abc-def-ghi',
        notes: 'Focus on custom hooks and context patterns',
        materials: ['React Hooks Guide', 'Context API Examples']
      },
      preparation: {
        completed: true,
        checklist: [
          { item: 'Review student background', done: true },
          { item: 'Prepare code examples', done: true },
          { item: 'Set up development environment', done: true },
          { item: 'Test meeting link', done: false }
        ]
      }
    },
    {
      id: 2,
      subject: 'Python Data Structures',
      student: {
        name: 'Bob Smith',
        email: 'bob.smith@email.com',
        avatar: 'BS',
        level: 'Intermediate',
        rating: 4.6,
        timezone: 'PST'
      },
      schedule: {
        date: '2024-01-20',
        startTime: '14:00',
        endTime: '15:00',
        duration: 60,
        type: 'Group Session'
      },
      details: {
        price: 45,
        status: 'Confirmed',
        meetingLink: 'https://zoom.us/j/123456789',
        notes: 'Cover lists, dictionaries, and sets with practical examples',
        materials: ['Python Basics', 'Data Structure Examples']
      },
      preparation: {
        completed: false,
        checklist: [
          { item: 'Review student background', done: true },
          { item: 'Prepare code examples', done: false },
          { item: 'Set up development environment', done: false },
          { item: 'Test meeting link', done: false }
        ]
      }
    },
    {
      id: 3,
      subject: 'System Design Fundamentals',
      student: {
        name: 'Carol Davis',
        email: 'carol.d@email.com',
        avatar: 'CD',
        level: 'Expert',
        rating: 4.8,
        timezone: 'GMT'
      },
      schedule: {
        date: '2024-01-21',
        startTime: '16:00',
        endTime: '18:00',
        duration: 120,
        type: 'One-on-One'
      },
      details: {
        price: 150,
        status: 'Pending Confirmation',
        meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
        notes: 'Deep dive into microservices architecture and scalability patterns',
        materials: ['System Design Primer', 'Scalability Patterns']
      },
      preparation: {
        completed: false,
        checklist: [
          { item: 'Review student background', done: false },
          { item: 'Prepare architecture diagrams', done: false },
          { item: 'Set up whiteboard tools', done: false },
          { item: 'Test meeting link', done: false }
        ]
      }
    }
  ]

  const getStatusColor = (status) => {
    if (darkMode) {
      switch (status) {
        case 'Confirmed': return 'bg-green-500/20 text-green-400'
        case 'Pending Confirmation': return 'bg-yellow-500/20 text-yellow-400'
        case 'Cancelled': return 'bg-red-500/20 text-red-400'
        default: return 'bg-gray-500/20 text-gray-400'
      }
    } else {
      switch (status) {
        case 'Confirmed': return 'bg-[#00001a]/10 text-[#00001a]'
        case 'Pending Confirmation': return 'bg-[#00001a]/15 text-[#00001a]'
        case 'Cancelled': return 'bg-[#00001a]/20 text-[#00001a]'
        default: return 'bg-[#00001a]/5 text-[#00001a]/70'
      }
    }
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-400'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400'
      case 'Advanced': return 'bg-orange-500/20 text-orange-400'
      case 'Expert': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getTimeUntilSession = (date, time) => {
    const sessionDateTime = new Date(`${date} ${time}`)
    const now = new Date()
    const diffMs = sessionDateTime - now
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)
    
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''}`
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''}`
    return 'Starting soon'
  }

  const handleQuickAction = (sessionId, action) => {
    console.log(`${action} for session ${sessionId}`)
    // Handle quick actions like join, reschedule, cancel
  }

  const filteredSessions = upcomingSessions.filter(session => {
    const sessionDate = new Date(session.schedule.date)
    const today = new Date()
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    const monthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)

    switch (viewMode) {
      case 'today':
        return sessionDate.toDateString() === today.toDateString()
      case 'week':
        return sessionDate >= today && sessionDate <= weekFromNow
      case 'month':
        return sessionDate >= today && sessionDate <= monthFromNow
      default:
        return true
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold flex items-center gap-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
          <Calendar size={24} className={darkMode ? 'text-blue-400' : 'text-[#00001a]'} />
          Upcoming Sessions Preview
        </h2>
        <div className="flex space-x-2">
          {['today', 'week', 'month'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                viewMode === mode
                  ? darkMode
                    ? 'bg-white/20 text-white'
                    : 'bg-[#00001a]/20 text-[#00001a]'
                  : darkMode
                    ? 'bg-[#00001a]/20 text-white/70 hover:bg-[#00001a]/30'
                    : 'bg-white/20 text-[#00001a]/70 hover:bg-white/30'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 hover:shadow-3xl ${
              darkMode
                ? 'bg-[#00001a]/40 border-white/10'
                : 'bg-white/40 border-white/20'
            }`}
          >
            <div className="p-6">
              {/* Session Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl ${
                    darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'
                  }`}>
                    <BookOpen size={24} className={darkMode ? 'text-blue-400' : 'text-[#00001a]'} />
                  </div>
                  <div>
                    <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {session.subject}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      {getTimeUntilSession(session.schedule.date, session.schedule.startTime)} away
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(session.details.status)}`}>
                    {session.details.status}
                  </span>
                  <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    ${session.details.price}
                  </span>
                </div>
              </div>

              {/* Student Info */}
              <div className={`p-3 rounded-xl mb-4 ${
                darkMode ? 'bg-[#00001a]/20' : 'bg-white/20'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{session.student.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {session.student.name}
                      </h4>
                      <div className="flex items-center space-x-1">
                        <span className={`text-sm ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {session.student.rating}
                        </span>
                        <span className="text-yellow-400">⭐</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(session.student.level)}`}>
                        {session.student.level}
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                        {session.student.timezone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Info */}
              <div className={`p-3 rounded-xl mb-4 ${
                darkMode ? 'bg-[#00001a]/20' : 'bg-white/20'
              }`}>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className={`${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Date:</span>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {session.schedule.date}
                    </p>
                  </div>
                  <div>
                    <span className={`${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Time:</span>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {session.schedule.startTime} - {session.schedule.endTime}
                    </p>
                  </div>
                  <div>
                    <span className={`${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Duration:</span>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {session.schedule.duration} min
                    </p>
                  </div>
                  <div>
                    <span className={`${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Type:</span>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {session.schedule.type}
                    </p>
                  </div>
                </div>
              </div>

              {/* Preparation Status */}
              <div className={`p-3 rounded-xl mb-4 ${
                darkMode ? 'bg-[#00001a]/20' : 'bg-white/20'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Preparation Status
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    session.preparation.completed
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {session.preparation.completed ? 'Complete' : 'In Progress'}
                  </span>
                </div>
                <div className="space-y-1">
                  {session.preparation.checklist.slice(0, 2).map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className={`text-xs ${item.done ? 'text-green-400' : 'text-yellow-400'}`}>
                        {item.done ? '✅' : '⏳'}
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                        {item.item}
                      </span>
                    </div>
                  ))}
                  {session.preparation.checklist.length > 2 && (
                    <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                      +{session.preparation.checklist.length - 2} more items
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleQuickAction(session.id, 'join')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      : 'bg-green-500/20 text-green-600 hover:bg-green-500/30'
                  }`}
                >
                  <Video size={16} className="mr-2" />
                  Join
                </button>
                <button
                  onClick={() => handleQuickAction(session.id, 'reschedule')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/20 text-white hover:bg-white/30'
                      : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30'
                  }`}
                >
                  <Calendar size={16} className="mr-2" />
                  Reschedule
                </button>
                <button
                  onClick={() => setSelectedSession(session)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/20 text-white hover:bg-white/30'
                      : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30'
                  }`}
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSessions.length === 0 && (
        <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
          darkMode
            ? 'bg-[#00001a]/40 border-white/10'
            : 'bg-white/40 border-white/20'
        }`}>
          <div className="p-12 text-center">
            <div className="flex justify-center mb-4">
              <Calendar size={64} className={darkMode ? 'text-white/30' : 'text-gray-400'} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              No Upcoming Sessions
            </h3>
            <p className={`${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
              No sessions scheduled for {viewMode === 'today' ? 'today' : `this ${viewMode}`}.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpcomingSessions
