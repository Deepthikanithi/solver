import React, { useState } from 'react'

const Analytics = ({ darkMode }) => {
  const [timeframe, setTimeframe] = useState('month')
  
  const analyticsData = {
    contentGrowth: { value: 15, trend: 'up', change: '+5%' },
    solvedProblems: { value: 127, trend: 'up', change: '+12' },
    earnings: { value: 2450.50, trend: 'up', change: '+18%' },
    streak: { value: 7, trend: 'up', change: '+2 days' },
    reachedContent: { value: 1250, trend: 'up', change: '+85' },
    totalSessions: { value: 45, trend: 'up', change: '+8' },
    hoursTaught: { value: 67.5, trend: 'up', change: '+12.5h' },
    badges: [
      { name: 'Top Mentor', icon: '🥇', earned: true },
      { name: 'Problem Solver', icon: '🎯', earned: true },
      { name: 'Streak Master', icon: '🔥', earned: true },
      { name: 'Content Creator', icon: '📚', earned: false },
      { name: 'Community Helper', icon: '🤝', earned: true }
    ]
  }

  const graphData = [
    { day: 'Mon', sessions: 8, earnings: 320 },
    { day: 'Tue', sessions: 6, earnings: 240 },
    { day: 'Wed', sessions: 10, earnings: 400 },
    { day: 'Thu', sessions: 7, earnings: 280 },
    { day: 'Fri', sessions: 9, earnings: 360 },
    { day: 'Sat', sessions: 5, earnings: 200 },
    { day: 'Sun', sessions: 3, earnings: 120 }
  ]

  const StatCard = ({ title, value, icon, trend, change, suffix = '' }) => (
    <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 hover:shadow-3xl ${
      darkMode
        ? 'bg-[#00001a]/40 border-white/10'
        : 'bg-white/40 border-white/20'
    }`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${
            darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'
          }`}>
            <span className="text-2xl">{icon}</span>
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend === 'up' 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            <span>{trend === 'up' ? '↗' : '↘'}</span>
            <span>{change}</span>
          </div>
        </div>
        <div>
          <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
            {title}
          </p>
          <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
          📊 Analytics Dashboard
        </h2>
        <div className="flex space-x-2">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                timeframe === period
                  ? darkMode
                    ? 'bg-white/20 text-white'
                    : 'bg-[#00001a]/20 text-[#00001a]'
                  : darkMode
                    ? 'bg-[#00001a]/20 text-white/70 hover:bg-[#00001a]/30'
                    : 'bg-white/20 text-[#00001a]/70 hover:bg-white/30'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Content Growth"
          value={analyticsData.contentGrowth.value}
          icon="📈"
          trend={analyticsData.contentGrowth.trend}
          change={analyticsData.contentGrowth.change}
          suffix="%"
        />
        <StatCard
          title="Solved Problems"
          value={analyticsData.solvedProblems.value}
          icon="✅"
          trend={analyticsData.solvedProblems.trend}
          change={analyticsData.solvedProblems.change}
        />
        <StatCard
          title="Earnings"
          value={`$${analyticsData.earnings.value}`}
          icon="💰"
          trend={analyticsData.earnings.trend}
          change={analyticsData.earnings.change}
        />
        <StatCard
          title="Current Streak"
          value={analyticsData.streak.value}
          icon="🔥"
          trend={analyticsData.streak.trend}
          change={analyticsData.streak.change}
          suffix=" days"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Reached Content"
          value={analyticsData.reachedContent.value}
          icon="👥"
          trend={analyticsData.reachedContent.trend}
          change={analyticsData.reachedContent.change}
        />
        <StatCard
          title="Total Sessions"
          value={analyticsData.totalSessions.value}
          icon="📚"
          trend={analyticsData.totalSessions.trend}
          change={analyticsData.totalSessions.change}
        />
        <StatCard
          title="Hours Taught"
          value={analyticsData.hoursTaught.value}
          icon="⏰"
          trend={analyticsData.hoursTaught.trend}
          change={analyticsData.hoursTaught.change}
          suffix="h"
        />
      </div>

      {/* Performance Graph */}
      <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
        darkMode
          ? 'bg-[#00001a]/40 border-white/10'
          : 'bg-white/40 border-white/20'
      }`}>
        <div className="p-6">
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            📊 Weekly Performance Graph
          </h3>
          <div className="grid grid-cols-7 gap-4">
            {graphData.map((data, index) => (
              <div key={index} className="text-center">
                <div className={`text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  {data.day}
                </div>
                <div className="relative h-32 flex flex-col justify-end">
                  <div 
                    className={`rounded-t-lg transition-all duration-500 ${
                      darkMode ? 'bg-white/30' : 'bg-[#00001a]/30'
                    }`}
                    style={{ height: `${(data.sessions / 10) * 100}%` }}
                  ></div>
                </div>
                <div className={`text-xs mt-2 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                  {data.sessions} sessions
                </div>
                <div className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                  ${data.earnings}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badge System */}
      <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
        darkMode
          ? 'bg-[#00001a]/40 border-white/10'
          : 'bg-white/40 border-white/20'
      }`}>
        <div className="p-6">
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            🏆 Achievement Badges
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {analyticsData.badges.map((badge, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl text-center transition-all duration-300 ${
                  badge.earned
                    ? darkMode
                      ? 'bg-white/20 border-white/30'
                      : 'bg-[#00001a]/20 border-[#00001a]/30'
                    : darkMode
                      ? 'bg-[#00001a]/10 border-white/10 opacity-50'
                      : 'bg-white/10 border-white/20 opacity-50'
                } border`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <p className={`text-sm font-medium ${
                  darkMode ? 'text-white' : 'text-[#00001a]'
                }`}>
                  {badge.name}
                </p>
                {badge.earned && (
                  <div className={`text-xs mt-1 ${
                    darkMode ? 'text-white/70' : 'text-[#00001a]/70'
                  }`}>
                    Earned
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
