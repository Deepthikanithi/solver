import React, { useState } from 'react'

const Dashboard = ({ darkMode, setDarkMode }) => {
  const [userName] = useState('pred')

  // Organizational level mock data
  const stats = {
    sessionsCompleted: 127,
    sessionsGrowth: 23,
    earningsThisMonth: 4250,
    earningsGrowth: 18,
    rating: 4.8,
    totalReviews: 89,
    completionRate: 94,
    contentGrowth: 156,
    solvedProblems: 89,
    earnings: 12450,
    streak: 45,
    badges: 12,
    reachedContent: 2340,
    totalSessions: 234,
    hoursTaught: 456
  }

  const recentEarnings = [
    {
      title: 'React Performance Issues',
      duration: '45 min session',
      timeAgo: '3 days ago',
      amount: 45.00
    },
    {
      title: 'AWS Lambda Setup',
      duration: '30 min session',
      timeAgo: '5 days ago',
      amount: 30.00
    },
    {
      title: 'Docker Container Issue',
      duration: '60 min session',
      timeAgo: '1 week ago',
      amount: 60.00
    }
  ]

  const availableSlots = [
    {
      day: 'Monday',
      level: 'Beginner',
      time: '10:00 AM - 11:00 AM',
      subject: 'Math',
      students: '0/3',
      status: 'Available',
      color: 'green'
    },
    {
      day: 'Tuesday',
      level: 'Advanced',
      time: '2:00 PM - 3:00 PM',
      subject: 'Physics',
      students: '2/4',
      status: 'Available',
      color: 'green'
    },
    {
      day: 'Wednesday',
      level: 'Expert',
      time: '4:00 PM - 5:00 PM',
      subject: 'Chemistry',
      students: '3/3',
      status: 'Booked',
      color: 'red'
    },
    {
      day: 'Thursday',
      level: 'Intermediate',
      time: '11:00 AM - 12:00 PM',
      subject: 'Biology',
      students: '1/5',
      status: 'Available',
      color: 'green'
    }
  ]

  const scheduleSlots = [
    { time: '09:00', type: 'Morning', sessions: 4 },
    { time: '10:00', type: 'Coffee', sessions: 3 },
    { time: '11:00', type: 'Study', sessions: 4 },
    { time: '14:00', type: 'Focus', sessions: 3 },
    { time: '15:00', type: 'Boost', sessions: 3 },
    { time: '16:00', type: 'Ideas', sessions: 2 }
  ]

  const upcomingSessions = [
    {
      id: 1,
      subject: 'React.js Advanced Patterns',
      student: 'Alice Johnson',
      time: '10:00 - 11:30',
      date: '2024-01-20',
      status: 'Confirmed',
      price: 85
    },
    {
      id: 2,
      subject: 'Python Data Structures',
      student: 'Bob Smith',
      time: '14:00 - 15:00',
      date: '2024-01-20',
      status: 'Confirmed',
      price: 45
    }
  ]

  const doubtPools = [
    {
      id: 1,
      title: 'React Hooks - useEffect dependency array issue',
      subject: 'React.js',
      difficulty: 'Intermediate',
      bounty: 25,
      responses: 3,
      views: 45
    },
    {
      id: 2,
      title: 'Python list comprehension vs map performance',
      subject: 'Python',
      difficulty: 'Advanced',
      bounty: 50,
      responses: 7,
      views: 89
    }
  ]

  const leaderboard = [
    { rank: 1, name: 'Alex Chen', points: 2450, earnings: 5420 },
    { rank: 2, name: 'Sarah Johnson', points: 2380, earnings: 4890 },
    { rank: 3, name: 'Mike Rodriguez', points: 2210, earnings: 4320 },
    { rank: 4, name: 'You (pred)', points: 1890, earnings: 3240, isCurrentUser: true }
  ]

  return (
    <div className={`h-full min-h-screen relative overflow-hidden transition-all duration-500 ${
      darkMode
        ? 'bg-[#00001a]'
        : 'bg-white'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
          darkMode 
            ? 'bg-white/5' 
            : 'bg-[#00001a]/5'
        }`}></div>
        <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
          darkMode 
            ? 'bg-white/3' 
            : 'bg-[#00001a]/3'
        }`}></div>
      </div>

      {/* Header */}
      <div className={`relative backdrop-blur-xl border-b shadow-lg transition-all duration-500 ${
        darkMode
          ? 'bg-[#00001a]/30 border-white/10'
          : 'bg-white/30 border-white/20'
      }`}>
        <div className="flex items-center justify-between p-6">
          <div>
            <h1 className={`text-3xl font-bold transition-colors duration-500 ${
              darkMode ? 'text-white' : 'text-[#00001a]'
            }`}>
              Welcome back, {userName}
            </h1>
            <p className={`mt-1 transition-colors duration-500 ${
              darkMode ? 'text-white/70' : 'text-[#00001a]/70'
            }`}>
              Ready to mentor and inspire today?
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              darkMode
                ? 'bg-white/20 text-white hover:bg-white/30'
                : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30'
            }`}>
              Create Tutorial
            </button>
            <button className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              darkMode
                ? 'bg-white/20 text-white hover:bg-white/30'
                : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30'
            }`}>
              View Earnings
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl transition-all duration-300 ${
                darkMode
                  ? 'bg-white/20 text-white hover:bg-white/30'
                  : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30'
              }`}
            >
              {darkMode ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="relative p-6 space-y-6">
        
        {/* Analytics Dashboard - Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
          {/* Content Growth */}
          <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 hover:shadow-3xl ${
            darkMode
              ? 'bg-[#00001a]/40 border-white/10'
              : 'bg-white/40 border-white/20'
          }`}>
            <div className="p-4">
              <div className="text-center">
                <div className={`p-2 rounded-xl mx-auto w-fit ${darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'}`}>
                  <div className={`w-6 h-6 rounded border ${darkMode ? 'border-white/50' : 'border-[#00001a]/50'}`}></div>
                </div>
                <div className={`text-xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {stats.contentGrowth}
                </div>
                <div className={`text-xs ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Content Growth
                </div>
                <div className={`text-xs font-medium ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                  +{stats.sessionsGrowth}%
                </div>
              </div>
            </div>
          </div>

          {/* Solved Problems */}
          <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 hover:shadow-3xl ${
            darkMode
              ? 'bg-[#00001a]/40 border-white/10'
              : 'bg-white/40 border-white/20'
          }`}>
            <div className="p-4">
              <div className="text-center">
                <div className={`p-2 rounded-xl mx-auto w-fit ${darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'}`}>
                  <div className={`w-6 h-6 rounded border ${darkMode ? 'border-white/50' : 'border-[#00001a]/50'}`}></div>
                </div>
                <div className={`text-xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {stats.solvedProblems}
                </div>
                <div className={`text-xs ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Solved Problems
                </div>
                <div className={`text-xs font-medium ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                  This month
                </div>
              </div>
            </div>
          </div>

          {/* Earnings */}
          <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 hover:shadow-3xl ${
            darkMode
              ? 'bg-[#00001a]/40 border-white/10'
              : 'bg-white/40 border-white/20'
          }`}>
            <div className="p-4">
              <div className="text-center">
                <div className={`p-2 rounded-xl mx-auto w-fit ${darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'}`}>
                  <div className={`w-6 h-6 rounded border ${darkMode ? 'border-white/50' : 'border-[#00001a]/50'}`}></div>
                </div>
                <div className={`text-xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  ${stats.earnings.toLocaleString()}
                </div>
                <div className={`text-xs ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Total Earnings
                </div>
                <div className={`text-xs font-medium ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                  +{stats.earningsGrowth}%
                </div>
              </div>
            </div>
          </div>

          {/* Streak */}
          <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 hover:shadow-3xl ${
            darkMode
              ? 'bg-[#00001a]/40 border-white/10'
              : 'bg-white/40 border-white/20'
          }`}>
            <div className="p-4">
              <div className="text-center">
                <div className={`p-2 rounded-xl mx-auto w-fit ${darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'}`}>
                  <div className={`w-6 h-6 rounded border ${darkMode ? 'border-white/50' : 'border-[#00001a]/50'}`}></div>
                </div>
                <div className={`text-xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {stats.streak}
                </div>
                <div className={`text-xs ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Day Streak
                </div>
                <div className={`text-xs font-medium ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                  Active
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 hover:shadow-3xl ${
            darkMode
              ? 'bg-[#00001a]/40 border-white/10'
              : 'bg-white/40 border-white/20'
          }`}>
            <div className="p-4">
              <div className="text-center">
                <div className={`p-2 rounded-xl mx-auto w-fit ${darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'}`}>
                  <div className={`w-6 h-6 rounded border ${darkMode ? 'border-white/50' : 'border-[#00001a]/50'}`}></div>
                </div>
                <div className={`text-xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {stats.badges}
                </div>
                <div className={`text-xs ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Badges Earned
                </div>
                <div className={`text-xs font-medium ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                  Achievements
                </div>
              </div>
            </div>
          </div>

          {/* Reached Content */}
          <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 hover:shadow-3xl ${
            darkMode
              ? 'bg-[#00001a]/40 border-white/10'
              : 'bg-white/40 border-white/20'
          }`}>
            <div className="p-4">
              <div className="text-center">
                <div className={`p-2 rounded-xl mx-auto w-fit ${darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'}`}>
                  <div className={`w-6 h-6 rounded border ${darkMode ? 'border-white/50' : 'border-[#00001a]/50'}`}></div>
                </div>
                <div className={`text-xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {stats.reachedContent.toLocaleString()}
                </div>
                <div className={`text-xs ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Reached Content
                </div>
                <div className={`text-xs font-medium ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                  Students
                </div>
              </div>
            </div>
          </div>

          {/* Total Sessions */}
          <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 hover:shadow-3xl ${
            darkMode
              ? 'bg-[#00001a]/40 border-white/10'
              : 'bg-white/40 border-white/20'
          }`}>
            <div className="p-4">
              <div className="text-center">
                <div className={`p-2 rounded-xl mx-auto w-fit ${darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'}`}>
                  <span className="text-xl">�</span>
                </div>
                <div className={`text-xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {stats.totalSessions}
                </div>
                <div className={`text-xs ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Total Sessions
                </div>
                <div className={`text-xs font-medium ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                  Completed
                </div>
              </div>
            </div>
          </div>

          {/* Hours Taught */}
          <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 hover:shadow-3xl ${
            darkMode
              ? 'bg-[#00001a]/40 border-white/10'
              : 'bg-white/40 border-white/20'
          }`}>
            <div className="p-4">
              <div className="text-center">
                <div className={`p-2 rounded-xl mx-auto w-fit ${darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'}`}>
                  <div className={`w-6 h-6 rounded border ${darkMode ? 'border-white/50' : 'border-[#00001a]/50'}`}></div>
                </div>
                <div className={`text-xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {stats.hoursTaught}
                </div>
                <div className={`text-xs ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Hours Taught
                </div>
                <div className={`text-xs font-medium ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                  Total time
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Schedule & Available Slots Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Weekly Schedule */}
          <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
            darkMode
              ? 'bg-[#00001a]/40 border-white/10'
              : 'bg-white/40 border-white/20'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'}`}>
                    <div className={`w-6 h-6 rounded border ${darkMode ? 'border-white/50' : 'border-[#00001a]/50'}`}></div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Weekly Schedule
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      20 slots this week
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                }`}>
                  Active
                </div>
              </div>

              {/* Week Days */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="text-center">
                    <div className={`text-sm font-medium ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      {day}
                    </div>
                    <div className={`text-xs mt-1 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>

              {/* Schedule Grid */}
              <div className="space-y-2">
                {scheduleSlots.map((slot, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    darkMode ? 'bg-[#00001a]/20 border-white/10' : 'bg-white/20 border-white/20'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'
                        }`}>
                          <span className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {slot.time.split(':')[0]}
                          </span>
                        </div>
                        <div>
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {slot.time} - {slot.type}
                          </div>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                      }`}>
                        {slot.sessions} sessions
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Weekly Heatmap */}
              <div className="mt-6">
                <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Weekly Heatmap
                </h4>
                <div className="grid grid-cols-7 gap-2">
                  {[4, 3, 4, 3, 3, 2, 1].map((sessions, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold border ${
                        sessions >= 4
                          ? darkMode ? 'bg-white/30 text-white border-white/50' : 'bg-[#00001a]/30 text-[#00001a] border-[#00001a]/50'
                          : sessions >= 3
                            ? darkMode ? 'bg-white/20 text-white border-white/30' : 'bg-[#00001a]/20 text-[#00001a] border-[#00001a]/30'
                            : sessions >= 2
                              ? darkMode ? 'bg-white/10 text-white border-white/20' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                              : darkMode ? 'bg-white/5 text-white/50 border-white/10' : 'bg-[#00001a]/5 text-[#00001a]/50 border-[#00001a]/10'
                      }`}>
                        {sessions}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Available Slots */}
          <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
            darkMode
              ? 'bg-[#00001a]/40 border-white/10'
              : 'bg-white/40 border-white/20'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'}`}>
                    <div className={`w-6 h-6 rounded border ${darkMode ? 'border-white/50' : 'border-[#00001a]/50'}`}></div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Available Slots
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      4 open • 6 students
                    </p>
                  </div>
                </div>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  darkMode
                    ? 'bg-white/20 text-white hover:bg-white/30'
                    : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30'
                }`}>
                  + Add Slot
                </button>
              </div>

              <div className="space-y-4">
                {availableSlots.map((slot, index) => (
                  <div key={index} className={`p-4 rounded-xl border transition-all duration-300 ${
                    darkMode ? 'bg-[#00001a]/20 border-white/10' : 'bg-white/20 border-white/20'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'
                        }`}>
                          <span className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {slot.day.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {slot.day}
                            </h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                            }`}>
                              {slot.level}
                            </span>
                          </div>
                          <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                            {slot.time} • {slot.subject}
                          </p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                              {slot.students} students
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        slot.status === 'Available'
                          ? darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                          : darkMode ? 'bg-white/10 text-white/70' : 'bg-[#00001a]/10 text-[#00001a]/70'
                      }`}>
                        {slot.status === 'Available' ? '● Available' : '● Booked'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions & Review Sessions Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Upcoming Sessions */}
          <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
            darkMode
              ? 'bg-[#00001a]/40 border-white/10'
              : 'bg-white/40 border-white/20'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'}`}>
                    <div className={`w-6 h-6 rounded border ${darkMode ? 'border-white/50' : 'border-[#00001a]/50'}`}></div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Upcoming Sessions
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      Your scheduled sessions
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                }`}>
                  {upcomingSessions.length} sessions
                </div>
              </div>

              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className={`p-4 rounded-xl border ${
                    darkMode ? 'bg-[#00001a]/20 border-white/10' : 'bg-white/20 border-white/20'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'
                        }`}>
                          <span className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {session.time.split(':')[0]}
                          </span>
                        </div>
                        <div>
                          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {session.subject}
                          </h4>
                          <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                            {session.student} • {session.time}
                          </p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                              ${session.price}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                            }`}>
                              {session.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Review Sessions */}
          <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
            darkMode
              ? 'bg-[#00001a]/40 border-white/10'
              : 'bg-white/40 border-white/20'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'}`}>
                    <div className={`w-6 h-6 rounded border ${darkMode ? 'border-white/50' : 'border-[#00001a]/50'}`}></div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Review Sessions
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      Sessions pending review
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                }`}>
                  3 pending
                </div>
              </div>

              <div className="space-y-4">
                {recentEarnings.map((earning, index) => (
                  <div key={index} className={`p-4 rounded-xl border ${
                    darkMode ? 'bg-[#00001a]/20 border-white/10' : 'bg-white/20 border-white/20'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'
                        }`}>
                          <span className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            ★
                          </span>
                        </div>
                        <div>
                          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {earning.title}
                          </h4>
                          <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                            {earning.duration} • {earning.timeAgo}
                          </p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              ${earning.amount.toFixed(2)}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                            }`}>
                              Pending Review
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Anonymous Doubt Pools & Leaderboard Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Anonymous Doubt Pools */}
          <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
            darkMode
              ? 'bg-[#00001a]/40 border-white/10'
              : 'bg-white/40 border-white/20'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'}`}>
                    <div className={`w-6 h-6 rounded border ${darkMode ? 'border-white/50' : 'border-[#00001a]/50'}`}></div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Anonymous Doubt Pools
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      Help students anonymously
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                }`}>
                  {doubtPools.length} active
                </div>
              </div>

              <div className="space-y-4">
                {doubtPools.map((doubt) => (
                  <div key={doubt.id} className={`p-4 rounded-xl border ${
                    darkMode ? 'bg-[#00001a]/20 border-white/10' : 'bg-white/20 border-white/20'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'
                        }`}>
                          <span className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            ?
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {doubt.title}
                          </h4>
                          <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                            {doubt.subject} • {doubt.difficulty}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                              ${doubt.bounty} bounty
                            </span>
                            <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                              {doubt.responses} responses
                            </span>
                            <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                              {doubt.views} views
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/20 text-white hover:bg-white/30'
                          : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30'
                      }`}>
                        Answer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
            darkMode
              ? 'bg-[#00001a]/40 border-white/10'
              : 'bg-white/40 border-white/20'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'}`}>
                    <div className={`w-6 h-6 rounded border ${darkMode ? 'border-white/50' : 'border-[#00001a]/50'}`}></div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Leaderboard
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      Top mentors this month
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                }`}>
                  Rank #4
                </div>
              </div>

              <div className="space-y-3">
                {leaderboard.map((mentor) => (
                  <div key={mentor.rank} className={`p-4 rounded-xl border ${
                    mentor.isCurrentUser
                      ? darkMode ? 'bg-white/20 border-white/30' : 'bg-[#00001a]/20 border-[#00001a]/30'
                      : darkMode ? 'bg-[#00001a]/20 border-white/10' : 'bg-white/20 border-white/20'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          mentor.rank === 1
                            ? darkMode ? 'bg-white/30' : 'bg-[#00001a]/30'
                            : mentor.rank === 2
                              ? darkMode ? 'bg-white/25' : 'bg-[#00001a]/25'
                              : mentor.rank === 3
                                ? darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'
                                : darkMode ? 'bg-white/15' : 'bg-[#00001a]/15'
                        }`}>
                          <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            #{mentor.rank}
                          </span>
                        </div>
                        <div>
                          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'} ${
                            mentor.isCurrentUser ? 'font-bold' : ''
                          }`}>
                            {mentor.name}
                          </h4>
                          <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                            🎯 {mentor.points.toLocaleString()} points
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          ${mentor.earnings.toLocaleString()}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                          earnings
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
