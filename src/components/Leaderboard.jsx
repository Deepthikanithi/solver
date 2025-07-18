import React, { useState } from 'react'

const Leaderboard = ({ darkMode }) => {
  const [timeframe, setTimeframe] = useState('month') // week, month, year, all-time
  const [category, setCategory] = useState('overall') // overall, earnings, sessions, ratings
  
  const leaderboardData = {
    overall: [
      {
        rank: 1,
        name: 'Alex Chen',
        avatar: '👨‍💻',
        points: 2450,
        earnings: 5420.50,
        sessions: 89,
        rating: 4.9,
        subjects: ['React', 'Node.js', 'Python'],
        badge: '🥇',
        streak: 45,
        change: '+2'
      },
      {
        rank: 2,
        name: 'Sarah Johnson',
        avatar: '👩‍🔬',
        points: 2380,
        earnings: 4890.25,
        sessions: 76,
        rating: 4.8,
        subjects: ['Data Science', 'Python', 'ML'],
        badge: '🥈',
        streak: 32,
        change: '0'
      },
      {
        rank: 3,
        name: 'Mike Rodriguez',
        avatar: '👨‍🎓',
        points: 2210,
        earnings: 4320.75,
        sessions: 68,
        rating: 4.7,
        subjects: ['System Design', 'AWS', 'DevOps'],
        badge: '🥉',
        streak: 28,
        change: '+1'
      },
      {
        rank: 4,
        name: 'You (pred)',
        avatar: '👤',
        points: 1890,
        earnings: 3240.00,
        sessions: 45,
        rating: 4.6,
        subjects: ['JavaScript', 'React', 'CSS'],
        badge: '🏆',
        streak: 7,
        change: '-1',
        isCurrentUser: true
      },
      {
        rank: 5,
        name: 'Emma Wilson',
        avatar: '👩‍💼',
        points: 1750,
        earnings: 2980.50,
        sessions: 52,
        rating: 4.5,
        subjects: ['UI/UX', 'Design', 'Figma'],
        badge: '⭐',
        streak: 15,
        change: '+3'
      }
    ]
  }

  const achievements = [
    {
      title: 'Top Mentor',
      description: 'Ranked #4 this month',
      icon: '🏆',
      earned: true,
      progress: 100
    },
    {
      title: 'Streak Master',
      description: '7 day teaching streak',
      icon: '🔥',
      earned: true,
      progress: 100
    },
    {
      title: 'Problem Solver',
      description: 'Solved 50+ doubts',
      icon: '🎯',
      earned: false,
      progress: 76
    },
    {
      title: 'Community Helper',
      description: 'Helped 100+ students',
      icon: '🤝',
      earned: false,
      progress: 45
    }
  ]

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return '🏆'
    }
  }

  const getChangeColor = (change) => {
    if (change.startsWith('+')) return 'text-green-400'
    if (change.startsWith('-')) return 'text-red-400'
    return 'text-gray-400'
  }

  const getChangeIcon = (change) => {
    if (change.startsWith('+')) return '↗'
    if (change.startsWith('-')) return '↘'
    return '→'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
          🏆 Leaderboard
        </h2>
        <div className="flex items-center space-x-3">
          {/* Timeframe Filter */}
          <div className="flex space-x-1">
            {['week', 'month', 'year', 'all-time'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                  timeframe === period
                    ? darkMode
                      ? 'bg-white/20 text-white'
                      : 'bg-[#00001a]/20 text-[#00001a]'
                    : darkMode
                      ? 'bg-[#00001a]/20 text-white/70 hover:bg-[#00001a]/30'
                      : 'bg-white/20 text-[#00001a]/70 hover:bg-white/30'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
          
          {/* Category Filter */}
          <div className="flex space-x-1">
            {[
              { key: 'overall', label: 'Overall', icon: '🏆' },
              { key: 'earnings', label: 'Earnings', icon: '💰' },
              { key: 'sessions', label: 'Sessions', icon: '📚' },
              { key: 'ratings', label: 'Ratings', icon: '⭐' }
            ].map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1 ${
                  category === cat.key
                    ? darkMode
                      ? 'bg-white/20 text-white'
                      : 'bg-[#00001a]/20 text-[#00001a]'
                    : darkMode
                      ? 'bg-[#00001a]/20 text-white/70 hover:bg-[#00001a]/30'
                      : 'bg-white/20 text-[#00001a]/70 hover:bg-white/30'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
        darkMode
          ? 'bg-[#00001a]/40 border-white/10'
          : 'bg-white/40 border-white/20'
      }`}>
        <div className="p-6">
          <h3 className={`text-xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            🏆 Top Performers
          </h3>
          <div className="flex items-end justify-center space-x-8">
            {/* 2nd Place */}
            <div className="text-center">
              <div className={`w-20 h-16 rounded-t-lg flex items-center justify-center mb-3 ${
                darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'
              }`}>
                <span className="text-3xl">🥈</span>
              </div>
              <div className="text-4xl mb-2">{leaderboardData.overall[1].avatar}</div>
              <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {leaderboardData.overall[1].name}
              </h4>
              <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                {leaderboardData.overall[1].points} pts
              </p>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <div className={`w-24 h-20 rounded-t-lg flex items-center justify-center mb-3 ${
                darkMode ? 'bg-white/30' : 'bg-[#00001a]/30'
              }`}>
                <span className="text-4xl">🥇</span>
              </div>
              <div className="text-5xl mb-2">{leaderboardData.overall[0].avatar}</div>
              <h4 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {leaderboardData.overall[0].name}
              </h4>
              <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                {leaderboardData.overall[0].points} pts
              </p>
              <div className="text-2xl mt-2">👑</div>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className={`w-20 h-12 rounded-t-lg flex items-center justify-center mb-3 ${
                darkMode ? 'bg-white/15' : 'bg-[#00001a]/15'
              }`}>
                <span className="text-3xl">🥉</span>
              </div>
              <div className="text-4xl mb-2">{leaderboardData.overall[2].avatar}</div>
              <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {leaderboardData.overall[2].name}
              </h4>
              <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                {leaderboardData.overall[2].points} pts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
        darkMode
          ? 'bg-[#00001a]/40 border-white/10'
          : 'bg-white/40 border-white/20'
      }`}>
        <div className="p-6">
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            📊 Full Rankings
          </h3>
          <div className="space-y-3">
            {leaderboardData.overall.map((mentor) => (
              <div
                key={mentor.rank}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  mentor.isCurrentUser
                    ? darkMode
                      ? 'bg-white/20 border-white/30 ring-2 ring-white/50'
                      : 'bg-[#00001a]/20 border-[#00001a]/30 ring-2 ring-[#00001a]/50'
                    : darkMode
                      ? 'bg-[#00001a]/20 border-white/10'
                      : 'bg-white/20 border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      mentor.rank <= 3
                        ? darkMode ? 'bg-white/30' : 'bg-[#00001a]/30'
                        : darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'
                    }`}>
                      <span className="text-xl">{getRankIcon(mentor.rank)}</span>
                    </div>
                    
                    {/* Avatar & Info */}
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{mentor.avatar}</div>
                      <div>
                        <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {mentor.name}
                          {mentor.isCurrentUser && (
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${
                              darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                            }`}>
                              You
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center space-x-3 text-sm">
                          <span className={`${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                            {mentor.points} points
                          </span>
                          <span className={`${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                            ⭐ {mentor.rating}
                          </span>
                          <span className={`${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                            🔥 {mentor.streak} days
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {mentor.subjects.slice(0, 3).map((subject, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded text-xs ${
                                darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                              }`}
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="text-right">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="text-center">
                        <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          ${mentor.earnings.toLocaleString()}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                          Earnings
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {mentor.sessions}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                          Sessions
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center justify-end space-x-1 text-sm ${getChangeColor(mentor.change)}`}>
                      <span>{getChangeIcon(mentor.change)}</span>
                      <span>{mentor.change}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your Achievements */}
      <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
        darkMode
          ? 'bg-[#00001a]/40 border-white/10'
          : 'bg-white/40 border-white/20'
      }`}>
        <div className="p-6">
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            🏅 Your Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  achievement.earned
                    ? darkMode
                      ? 'bg-green-500/20 border-green-500/30'
                      : 'bg-green-500/20 border-green-500/30'
                    : darkMode
                      ? 'bg-[#00001a]/20 border-white/10'
                      : 'bg-white/20 border-white/20'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${
                    achievement.earned
                      ? 'bg-green-500/30'
                      : darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'
                  }`}>
                    <span className="text-2xl">{achievement.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      {achievement.description}
                    </p>
                    {!achievement.earned && (
                      <div className="mt-2">
                        <div className={`w-full h-2 rounded-full ${
                          darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'
                        }`}>
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                        <p className={`text-xs mt-1 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                          {achievement.progress}% complete
                        </p>
                      </div>
                    )}
                  </div>
                  {achievement.earned && (
                    <div className="text-green-400 text-xl">✅</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
