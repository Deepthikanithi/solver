import React, { useState } from 'react'

const ReviewSessions = ({ darkMode }) => {
  const [filter, setFilter] = useState('pending') // pending, approved, rejected
  
  const [pendingSessions] = useState([
    {
      id: 1,
      student: {
        name: 'John Doe',
        email: 'john.doe@email.com',
        level: 'Beginner',
        rating: 4.5,
        previousSessions: 12
      },
      session: {
        subject: 'React.js Fundamentals',
        date: '2024-01-20',
        time: '14:00 - 15:00',
        duration: 60,
        type: 'One-on-One',
        description: 'Need help understanding React hooks and state management',
        requirements: 'Basic JavaScript knowledge required',
        price: 45
      },
      requestedAt: '2024-01-15 10:30',
      status: 'pending'
    },
    {
      id: 2,
      student: {
        name: 'Sarah Wilson',
        email: 'sarah.w@email.com',
        level: 'Intermediate',
        rating: 4.8,
        previousSessions: 25
      },
      session: {
        subject: 'Advanced Python',
        date: '2024-01-22',
        time: '16:00 - 17:30',
        duration: 90,
        type: 'Group Session',
        description: 'Advanced Python concepts including decorators and metaclasses',
        requirements: 'Intermediate Python knowledge',
        price: 65
      },
      requestedAt: '2024-01-16 09:15',
      status: 'pending'
    },
    {
      id: 3,
      student: {
        name: 'Mike Johnson',
        email: 'mike.j@email.com',
        level: 'Advanced',
        rating: 4.9,
        previousSessions: 45
      },
      session: {
        subject: 'System Design',
        date: '2024-01-25',
        time: '10:00 - 12:00',
        duration: 120,
        type: 'One-on-One',
        description: 'System design for large-scale applications, microservices architecture',
        requirements: 'Experience with distributed systems',
        price: 120
      },
      requestedAt: '2024-01-17 14:20',
      status: 'pending'
    }
  ])

  const handleSessionAction = (sessionId, action) => {
    console.log(`${action} session ${sessionId}`)
    // Handle approve/reject logic here
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      case 'approved': return 'bg-green-500/20 text-green-400'
      case 'rejected': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-400'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400'
      case 'Advanced': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const filteredSessions = pendingSessions.filter(session => 
    filter === 'all' || session.status === filter
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
          📋 Review Sessions
        </h2>
        <div className="flex space-x-2">
          {['pending', 'approved', 'rejected', 'all'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === filterType
                  ? darkMode
                    ? 'bg-white/20 text-white'
                    : 'bg-[#00001a]/20 text-[#00001a]'
                  : darkMode
                    ? 'bg-[#00001a]/20 text-white/70 hover:bg-[#00001a]/30'
                    : 'bg-white/20 text-[#00001a]/70 hover:bg-white/30'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.map((sessionRequest) => (
          <div
            key={sessionRequest.id}
            className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
              darkMode
                ? 'bg-[#00001a]/40 border-white/10'
                : 'bg-white/40 border-white/20'
            }`}
          >
            <div className="p-6">
              {/* Session Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'
                  }`}>
                    <span className="text-2xl">📚</span>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {sessionRequest.session.subject}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      Requested on {sessionRequest.requestedAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(sessionRequest.status)}`}>
                    {sessionRequest.status.charAt(0).toUpperCase() + sessionRequest.status.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                  }`}>
                    ${sessionRequest.session.price}
                  </span>
                </div>
              </div>

              {/* Session Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Student Information */}
                <div className={`p-4 rounded-xl ${
                  darkMode ? 'bg-[#00001a]/20' : 'bg-white/20'
                }`}>
                  <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    👤 Student Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Name:</span>
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {sessionRequest.student.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Email:</span>
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {sessionRequest.student.email}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Level:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(sessionRequest.student.level)}`}>
                        {sessionRequest.student.level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Rating:</span>
                      <div className="flex items-center space-x-1">
                        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {sessionRequest.student.rating}
                        </span>
                        <span className="text-yellow-400">⭐</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Previous Sessions:</span>
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {sessionRequest.student.previousSessions}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Session Details */}
                <div className={`p-4 rounded-xl ${
                  darkMode ? 'bg-[#00001a]/20' : 'bg-white/20'
                }`}>
                  <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    📅 Session Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Date & Time:</span>
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {sessionRequest.session.date} • {sessionRequest.session.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Duration:</span>
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {sessionRequest.session.duration} minutes
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Type:</span>
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {sessionRequest.session.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Price:</span>
                      <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        ${sessionRequest.session.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description & Requirements */}
              <div className="mt-6 space-y-4">
                <div className={`p-4 rounded-xl ${
                  darkMode ? 'bg-[#00001a]/20' : 'bg-white/20'
                }`}>
                  <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    📝 Description
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    {sessionRequest.session.description}
                  </p>
                </div>
                
                <div className={`p-4 rounded-xl ${
                  darkMode ? 'bg-[#00001a]/20' : 'bg-white/20'
                }`}>
                  <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    ⚡ Requirements
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    {sessionRequest.session.requirements}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              {sessionRequest.status === 'pending' && (
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => handleSessionAction(sessionRequest.id, 'approve')}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        : 'bg-green-500/20 text-green-600 hover:bg-green-500/30'
                    }`}
                  >
                    ✅ Approve Session
                  </button>
                  <button
                    onClick={() => handleSessionAction(sessionRequest.id, 'reject')}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : 'bg-red-500/20 text-red-600 hover:bg-red-500/30'
                    }`}
                  >
                    ❌ Reject Session
                  </button>
                  <button
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/20 text-white hover:bg-white/30'
                        : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30'
                    }`}
                  >
                    💬 Message Student
                  </button>
                </div>
              )}
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
            <div className="text-6xl mb-4">📭</div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              No Sessions to Review
            </h3>
            <p className={`${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
              All caught up! No {filter} sessions at the moment.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewSessions
